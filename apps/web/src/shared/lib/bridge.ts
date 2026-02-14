import type { AppBridge, AppPostMessageSchema } from '@azit/bridge';
import { linkBridge, type BridgeStore } from '@webview-bridge/web';

/**
 * Web -> Native 및 Native -> Web 브릿지 설정
 * - 첫 번째 제네릭: Web -> Native 통신 (AppBridge)
 * - 두 번째 제네릭: Native -> Web 통신 (AppPostMessageSchema)
 */
export const bridge = linkBridge<BridgeStore<AppBridge>, AppPostMessageSchema>({
  throwOnError: true,
  timeout: 2000,
  initialBridge: {},
});
