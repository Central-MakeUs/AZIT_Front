import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import type { ReactNode } from 'react';
import * as styles from './AlertDialog.css';

export interface AlertDialogProps {
  trigger: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  cancelText?: string;
}

export function AlertDialog({
  trigger,
  title,
  description,
  actionText = '확인',
  cancelText = '취소',
  onAction,
}: AlertDialogProps) {
  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className={styles.overlay} />
        <RadixAlertDialog.Content className={styles.content}>
          <div className={styles.textContainer}>
            <RadixAlertDialog.Title className={styles.title}>
              {title}
            </RadixAlertDialog.Title>
            <RadixAlertDialog.Description className={styles.description}>
              {description}
            </RadixAlertDialog.Description>
          </div>

          <div className={styles.buttonContainer}>
            <RadixAlertDialog.Cancel asChild>
              <button className={styles.cancelButton}>{cancelText}</button>
            </RadixAlertDialog.Cancel>

            <RadixAlertDialog.Action asChild>
              <button className={styles.actionButton} onClick={onAction}>
                {actionText}
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
}
