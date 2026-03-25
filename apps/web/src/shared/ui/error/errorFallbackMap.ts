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
  FORBIDDEN_ERROR: {
    message: '접근 권한이 없어요',
    label: '홈으로 가기',
    action: 'replace',
    navigateTo: 'HomePage',
  },
  PRODUCT_NOT_FOUND: {
    message: '존재하지 않는 상품이에요',
    label: '다른 상품 보러가기',
    action: 'replace',
    navigateTo: 'StorePage',
  },
};

export const DEFAULT_FALLBACK: FallbackConfig = {
  message: '페이지를 찾을 수 없어요',
  label: '홈으로 가기',
  action: 'replace',
  navigateTo: 'HomePage',
};
