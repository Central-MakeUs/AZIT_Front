import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './apiClient';
import { useAuthStore } from '../store/auth';

describe('shared/lib/ky', () => {
  beforeEach(() => {
    // 각 테스트 전에 store 초기화
    useAuthStore.setState({ accessToken: undefined });
  });

  it('accessToken이 있으면 Authorization 헤더를 추가한다 (beforeRequest)', async () => {
    useAuthStore.setState({ accessToken: 'ACCESS_TOKEN' });

    global.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 })
      ) as any;

    await api.get('test').json();

    const request = (global.fetch as any).mock.calls[0][0] as Request;
    expect(request.headers.get('Authorization')).toBe('Bearer ACCESS_TOKEN');
  });

  it('401 발생 시 토큰을 재발급하고 원 요청을 재시도한다 (afterResponse)', async () => {
    useAuthStore.setState({ accessToken: 'OLD_TOKEN' });

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      // 새 토큰 발급
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            result: { accessToken: 'NEW_TOKEN' },
          }),
          { status: 200 }
        )
      )
      // 재시도 요청 → 성공
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 })
      );

    global.fetch = fetchMock as any;

    const result = await api.get('retry-test').json();

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    // reissue 호출 확인
    const reissueRequest = fetchMock.mock.calls[1][0] as Request;
    expect(reissueRequest.url).toContain('/auth/reissue');

    // 재시도 요청에 새 토큰이 들어갔는지
    const retryRequest = fetchMock.mock.calls[2][0] as Request;
    expect(retryRequest.headers.get('Authorization')).toBe('Bearer NEW_TOKEN');

    // 스토어에 새 토큰이 저장되었는지 확인
    expect(useAuthStore.getState().accessToken).toBe('NEW_TOKEN');
  });

  it('에러 응답 body를 error.message에 포함한다 (beforeError)', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(new Response('Invalid token', { status: 400 })) as any;

    await expect(api.get('error-test').json()).rejects.toThrow(/Invalid token/);
  });
});
