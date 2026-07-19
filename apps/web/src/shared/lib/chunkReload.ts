const RELOAD_COOLDOWN_MS = 10_000;
const STORAGE_KEY = 'azit:chunk-reload-at';

/**
 * https://vite.dev/guide/build#load-error-handling
 */
export function setupChunkReloadOnPreloadError() {
  window.addEventListener('vite:preloadError', (event) => {
    const lastReloadAt = Number(sessionStorage.getItem(STORAGE_KEY) ?? 0);
    const now = Date.now();

    if (now - lastReloadAt < RELOAD_COOLDOWN_MS) {
      return;
    }

    event.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, String(now));
    window.location.reload();
  });
}
