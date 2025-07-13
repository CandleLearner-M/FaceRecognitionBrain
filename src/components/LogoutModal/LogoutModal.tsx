import { useRef } from 'react';
import styles from './LogoutModal.module.scss';
import { LuLogOut } from 'react-icons/lu';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

function LogoutModal({isOpen, onClose, onConfirm, userName}: LogoutModalProps) {
  const modalRef = useRef(null);
  
  return (
    <div className={styles.modalOverlay}>
      <div
      className={styles.modalContainer}
      ref={modalRef}
      aria-modal="true"
      role='dialog'
      aria-labelledby='logout-modal-title'
      >
        <div className={styles.modalHeader}>
          <div className={styles.iconContainer}>
            <LuLogOut className={styles.logoutIcon} />
            <h2 id='logout-modal-title'>Sign Out confirmation</h2>
          </div>

          <div className={styles.modalBody}>
            <p>Are you sure to sign out, <span className={styles.userName}>{userName}</span>?</p>
            <p className={styles.sessionNote}>
              Your current session will be terminated and you'll need to sign in again to continue.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
export default LogoutModal