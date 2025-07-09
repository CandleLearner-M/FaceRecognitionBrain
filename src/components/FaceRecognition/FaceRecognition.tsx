import { TbFaceIdError } from 'react-icons/tb';
import { useFaceDetection } from '../../hooks/useFaceDetection';
import styles from './FaceRecognition.module.scss';
import { GoGoal } from 'react-icons/go';

interface FaceRecognitionProps {
  imageUrl: string
}

function FaceRecognition({imageUrl}: FaceRecognitionProps) {

  const faceData = useFaceDetection(imageUrl);

  if (!faceData.success) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}><TbFaceIdError /></div>
        <h3>Detection Failed</h3>
        <p>Unable to analyze this image. Please try again with a different image URL.</p>
        <div className={styles.errorDetails}>
          <small>Make sure the image URL is accessible and contains faces</small>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.resultsHeader}>
        <h2>
          Detection Results
        </h2>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{faceData.faces.length}</span>
            <span className={styles.statLabel}>Face{faceData.faces.length !== 1 ? 's': ''} Found</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {faceData.faces.length > 0
                ? Math.round(faceData.faces.reduce((acc, face) => acc + face.confidence, 0) / faceData.faces.length * 100)
                : 0
              }%
            </span>
            <span className={styles.statLabel}>Avg Confidence</span>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img src={faceData.imageUrl} alt="face detection analysis" className={styles.image} />
        </div>
      </div>
    </div>
  )
}
export default FaceRecognition