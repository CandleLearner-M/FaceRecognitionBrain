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
          <span><GoGoal /></span>
          <span>Detection Results</span>
        </h2>
      </div>
      <img src={faceData.imageUrl} alt="face detection" />
    </div>
  )
}
export default FaceRecognition