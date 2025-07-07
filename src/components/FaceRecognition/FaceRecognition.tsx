import { useFaceDetection } from '../../hooks/useFaceDetection'
import styles from './FaceRecognition.module.scss'

interface FaceRecognitionProps {
  imageUrl: string
}

function FaceRecognition({imageUrl}: FaceRecognitionProps) {

  const faceData = useFaceDetection(imageUrl);

  if (!faceData.success) {
    return (
      <div className={styles.error}>
        <p>Failed to detect faces. Please try again.</p>
      </div>
    )
  }

  return (
    <div className={styles.faceRecognition}>
      <img src={faceData.imageUrl} alt="face detection" />
    </div>
  )
}
export default FaceRecognition