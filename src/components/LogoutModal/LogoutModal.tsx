import { useEffect, useRef } from 'react';
import styles from './LogoutModal.module.scss';
import { LuLogOut } from 'react-icons/lu';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

function LogoutModal({isOpen, onClose, onConfirm, userName}: LogoutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleEscape = (e:KeyboardEvent) => {
      if(e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // Prevent scrolling
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose])

  if(!isOpen) return null;
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
          </div>
            <h2 id='logout-modal-title'>Sign Out confirmation</h2>
        </div>

        <div className={styles.modalBody}>
          <p>Are you sure to sign out, <span className={styles.userName}>{userName}</span>?</p>
          <p className={styles.sessionNote}>
            Your current session will be terminated and you'll need to sign in again to continue.
          </p>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn}
            aria-label="Cancel sign out"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className={styles.confirmBtn}
            onClick={onConfirm}
            aria-label="Confirm sign out">
              <span>Sign Out</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
        </div>
      </div>
    </div>
  )
}
export default LogoutModal