import * as styles from '@/widgets/skeleton/styles/ScheduleDetailSkeleton.css';

export function ScheduleDetailSkeleton() {
  return (
    <>
      <div className={styles.mainContainer}>
        {/* Header Section: chips + title + leader */}
        <div className={styles.headerSection}>
          <div className={styles.tagRow}>
            <div className={styles.tagLine} />
            <div className={styles.tagLine} />
            <div className={styles.tagLine} />
          </div>
          <div className={styles.titleLine} />
          <div className={styles.leaderRow}>
            <div className={styles.avatar} />
            <div className={styles.leaderNicknameLine} />
          </div>
        </div>

        {/* Info Section: date/time + location + map */}
        <div className={styles.infoSection}>
          <div className={styles.dateTimeRow}>
            <div className={styles.dateTimeLine} />
            <div className={styles.dateTimeLine} />
          </div>
          <div className={styles.locationBlock}>
            <div className={styles.locationLine} />
            <div className={styles.addressLine} />
            <div className={styles.mapBlock} />
          </div>
        </div>

        {/* Description Section */}
        <div className={styles.descriptionSection}>
          <div className={styles.descriptionLine} />
          <div className={styles.descriptionLine} />
          <div className={styles.descriptionLine} />
        </div>

        {/* Preparation Section */}
        <div className={styles.preparationSection}>
          <div className={styles.preparationTitleLine} />
          <div className={styles.preparationItemLine} />
          <div className={styles.preparationItemLine} />
        </div>

        {/* Participant Section */}
        <div className={styles.participantSection}>
          <div className={styles.participantHeaderRow}>
            <div className={styles.participantTitleLine} />
            <div className={styles.moreLinkLine} />
          </div>
          <div className={styles.participantListRow}>
            <div className={styles.participantAvatar} />
            <div className={styles.participantAvatar} />
            <div className={styles.participantAvatar} />
          </div>
        </div>
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.buttonBlock} />
      </div>
    </>
  );
}
