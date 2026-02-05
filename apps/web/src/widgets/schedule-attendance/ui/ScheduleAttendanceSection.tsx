import { MarkerPinIcon } from '@azit/design-system';
import { motion } from 'motion/react';
import type { ActivityActivation } from '@/shared/mock/home';
import * as styles from '../styles/ScheduleAttendanceSection.css';

interface ScheduleAttendanceSectionProps {
  activity: ActivityActivation;
}

export function ScheduleAttendanceSection({
  activity,
}: ScheduleAttendanceSectionProps) {
  const isLightningRun = activity.isLightningRun ?? false;

  return (
    <div className={styles.sectionContainer}>
      <div
        className={
          isLightningRun ? styles.cardContainerLightning : styles.cardContainer
        }
      >
        <h2 className={styles.title}>{activity.title}</h2>
        <div className={styles.buttonWrapper}>
          <div className={styles.rippleContainer}>
            <motion.div
              className={
                isLightningRun
                  ? styles.rippleCircleOuterLightning
                  : styles.rippleCircleOuter
              }
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.05, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className={
                isLightningRun
                  ? styles.rippleCircleMiddleLightning
                  : styles.rippleCircleMiddle
              }
              animate={{
                scale: [0.9, 1.0, 0.9],
                opacity: [0.3, 0.15, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.3,
                ease: 'easeInOut',
              }}
            />
            <div
              className={
                isLightningRun
                  ? styles.buttonOuterLightning
                  : styles.buttonOuter
              }
            >
              <button
                className={
                  isLightningRun ? styles.buttonLightning : styles.button
                }
                type="button"
              >
                <div className={styles.buttonContent}>
                  <div className={styles.iconWrapper}>
                    <MarkerPinIcon size={48} style={{ color: 'white' }} />
                  </div>
                  <span className={styles.buttonText}>
                    {activity.activationText}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <p className={styles.distanceText}>{activity.distanceText}</p>
      </div>
    </div>
  );
}
