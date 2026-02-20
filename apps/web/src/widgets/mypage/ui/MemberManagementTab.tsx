import * as styles from '@/widgets/mypage/styles/MemberManagementTab.css';

export type MemberManagementTabType = 'member' | 'request';

interface MemberManagementTabProps {
  activeTab: MemberManagementTabType;
  onTabChange: (tab: MemberManagementTabType) => void;
  requestCount: number;
}

export function MemberManagementTab({
  activeTab,
  onTabChange,
  requestCount,
}: MemberManagementTabProps) {
  return (
    <>
      <div className={styles.tabRow}>
        <div className={styles.tabWrapper}>
          <button
            type="button"
            className={styles.tab}
            onClick={() => onTabChange('member')}
            aria-pressed={activeTab === 'member'}
          >
            <span
              className={
                activeTab === 'member'
                  ? styles.tabLabel
                  : styles.tabLabelInactive
              }
            >
              멤버
            </span>
          </button>
        </div>
        <div className={styles.tabWrapper}>
          <button
            type="button"
            className={styles.tab}
            onClick={() => onTabChange('request')}
            aria-pressed={activeTab === 'request'}
          >
            <span
              className={
                activeTab === 'request'
                  ? styles.tabLabel
                  : styles.tabLabelInactive
              }
            >
              요청 ({requestCount})
            </span>
          </button>
        </div>
        <div className={styles.tabUnderlineTrack}>
          <div
            className={
              activeTab === 'member'
                ? styles.tabUnderlineBarMember
                : styles.tabUnderlineBarRequest
            }
            aria-hidden
          />
        </div>
      </div>
      <div className={styles.tabDivider} aria-hidden />
    </>
  );
}
