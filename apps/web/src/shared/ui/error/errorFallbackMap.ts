export interface FallbackConfig {
  message: string;
  label: string;
  action: 'reset' | 'replace';
  navigateTo?: string;
}

export const ERROR_FALLBACK_MAP: Record<string, FallbackConfig> = {
  SCHEDULE_NOT_FOUND: {
    message: '일정을 찾을 수 없어요',
    label: '다른 일정 확인하기',
    action: 'replace',
    navigateTo: 'SchedulePage',
  },
};

export const DEFAULT_FALLBACK: FallbackConfig = {
  message: '페이지를 찾을 수 없어요',
  label: '홈으로 가기',
  action: 'replace',
  navigateTo: 'HomePage',
};
