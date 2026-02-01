'use client';

import Popover from '@/components/ui/Popover';
import { useDemoCredentials } from './useDemoCredentials';
import styles from './page.module.scss';

type DemoCredentialsPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DemoCredentialsPopover({
  isOpen,
  onClose,
}: DemoCredentialsPopoverProps) {
  const { demoUsers, handleCopy, lastCopied } = useDemoCredentials();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      className={styles.popover}
      id="demo-credentials"
    >
      <div className={styles.popoverHeader}>
        <span>Dummyjson users</span>
      </div>

      <div className={styles.popoverList}>
        {demoUsers.map((user) => (
          <div key={user.username} className={styles.popoverItem}>
            <div className={styles.credRow}>
              <span className={styles.credLabel}>Username</span>
              <span className={styles.credValue}>{user.username}</span>
              <button
                type="button"
                className={
                  lastCopied === user.username
                    ? styles.copyButtonCopied
                    : styles.copyButton
                }
                onClick={() => handleCopy(user.username)}
              >
                {lastCopied === user.username ? 'copied' : 'copy'}
              </button>
            </div>
            <div className={styles.credRow}>
              <span className={styles.credLabel}>Password</span>
              <span className={styles.credValue}>{user.password}</span>
              <button
                type="button"
                className={
                  lastCopied === user.password
                    ? styles.copyButtonCopied
                    : styles.copyButton
                }
                onClick={() => handleCopy(user.password)}
              >
                {lastCopied === user.password ? 'copied' : 'copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Popover>
  );
}
