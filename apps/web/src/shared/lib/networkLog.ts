export type NetworkLogState = 'pending' | 'success' | 'error';

export type NetworkLogEntry = {
  id: string;
  method: string;
  url: string;
  status?: number;
  duration?: number;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  requestBody?: unknown;
  responseBody?: unknown;
  errorMessage?: string;
  state: NetworkLogState;
  timestamp: Date;
};

type Listener = () => void;

const MAX_LOGS = 100;

let logs: NetworkLogEntry[] = [];
const listeners = new Set<Listener>();
let isPatched = false;

// ky beforeRequest 훅에서 등록한 json body를 Request 객체 기준으로 저장.
// patchFetch에서 수신하는 input(= this.#originalRequest)은
// beforeRequest에서 받는 request(= this.request)와 동일 참조이므로 WeakMap 조회가 성공한다.
const kyJsonBodyMap = new WeakMap<Request, unknown>();

function notify() {
  listeners.forEach((l) => l());
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const networkLog = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSnapshot(): NetworkLogEntry[] {
    return logs;
  },

  clear() {
    logs = [];
    notify();
  },

  /** ky beforeRequest 훅에서 호출 — json body를 미리 저장해둔다 */
  storeKyBody(request: Request, json: unknown) {
    if (json !== undefined) {
      kyJsonBodyMap.set(request, json);
    }
  },
};

export function patchFetch() {
  if (isPatched) return;
  isPatched = true;

  const originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async function patchedFetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    const id = generateId();
    const startTime = Date.now();

    const rawUrl = input instanceof Request ? input.url : String(input);
    const method = (
      input instanceof Request ? input.method : (init?.method ?? 'GET')
    ).toUpperCase();
    const pathname = (() => {
      try {
        return new URL(rawUrl).pathname;
      } catch {
        return rawUrl;
      }
    })();

    // Request headers — user-agent은 forbidden header라 navigator에서 직접 주입
    const requestHeaders: Record<string, string> = {
      'user-agent': navigator.userAgent,
    };
    const mergedHeaders = new Headers(
      input instanceof Request ? input.headers : undefined
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((v, k) => mergedHeaders.set(k, v));
    }
    mergedHeaders.forEach((v, k) => {
      requestHeaders[k] = v;
    });

    // Request body
    // 1순위: ky beforeRequest 훅에서 미리 저장한 json (body stream 소비 문제 없음)
    // 2순위: init.body 문자열 (non-ky fetch)
    let requestBody: unknown;
    if (input instanceof Request && kyJsonBodyMap.has(input)) {
      requestBody = kyJsonBodyMap.get(input);
      kyJsonBodyMap.delete(input);
    } else if (typeof init?.body === 'string' && init.body) {
      try {
        requestBody = JSON.parse(init.body);
      } catch {
        requestBody = init.body;
      }
    }

    const entry: NetworkLogEntry = {
      id,
      method,
      url: pathname,
      requestHeaders,
      requestBody,
      state: 'pending',
      timestamp: new Date(),
    };
    logs = [entry, ...logs].slice(0, MAX_LOGS);
    notify();

    try {
      const response = await originalFetch(input, init);

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((v, k) => {
        responseHeaders[k] = v;
      });

      let responseBody: unknown;
      try {
        const ct = response.headers.get('content-type') ?? '';
        if (ct.includes('application/json')) {
          responseBody = await response.clone().json();
        }
      } catch {
        // ignore
      }

      const duration = Date.now() - startTime;
      const isSuccess = response.status >= 200 && response.status < 400;

      logs = logs.map((log) =>
        log.id === id
          ? {
              ...log,
              status: response.status,
              duration,
              responseHeaders,
              responseBody,
              state: isSuccess ? 'success' : 'error',
            }
          : log
      );
      notify();

      return response;
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorMessage = err instanceof Error ? err.message : String(err);

      logs = logs.map((log) =>
        log.id === id ? { ...log, duration, errorMessage, state: 'error' } : log
      );
      notify();

      throw err;
    }
  };
}
