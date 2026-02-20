import { UsersIcon } from '@azit/design-system/icon';

import * as styles from '@/widgets/my/styles/RequestListEmpty.css';

export function RequestListEmpty() {
  return (
    <div className={styles.wrapper}>
      <UsersIcon size={64} color="inherit" className={styles.icon} />
      <p className={styles.message}>가입 요청을 기다려보세요!</p>
    </div>
  );
}
