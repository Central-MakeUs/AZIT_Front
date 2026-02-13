import { bridge } from '@/shared/lib/bridge';

/**
 * 외부 URL 열기
 * - WebView(앱) 내: 브릿지로 Native에 요청 → expo-linking으로 OS 기본 브라우저에서 열기
 * - standalone 웹: window.open으로 새 탭에서 열기
 */
export async function openExternalUrl(url: string): Promise<void> {
  const trimmedURL = url.trim();
  if (!trimmedURL) return;

  try {
    await bridge.openExternalBrowser(trimmedURL);
  } catch {
    window.open(trimmedURL, '_blank');
  }
}
