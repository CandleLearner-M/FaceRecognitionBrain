import { TbFaceIdError } from 'react-icons/tb';
import { useFaceDetection } from '../../hooks/useFaceDetection';
import styles from './FaceRecognition.module.scss';

interface FaceRecognitionProps {
  imageUrl: string;
  setIsLoading: (isLoading: boolean) => void;
}

function FaceRecognition({imageUrl, setIsLoading}: FaceRecognitionProps) {

  const faceData = useFaceDetection(imageUrl, setIsLoading);

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
          Detection Results:
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

          {/* Bouding boxs */}
          {faceData.faces.map((face, index) => (
            <div
              key={face.id}
              className={styles.faceBox}
              style={{
                left: `${face.boundingBox.left * 100}%`,
                top: `${face.boundingBox.top * 100}%`,
                width: `${face.boundingBox.width * 100}%`,
                height: `${face.boundingBox.height * 100}%`
              }}
            >
              <div className={styles.faceLabel}>
                <span className={styles.faceNumber}>#{index + 1}</span>
                <span className={styles.confidence}>{(face.confidence * 100).toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Face details */}
        {faceData.faces.length > 0 && (
          <div className={styles.faceDetails}>
            <h3>Detected Faces</h3>
            <div className={styles.faceList}>
              {faceData.faces.map((face, index) => (
                <div key={face.id} className={styles.faceItem}>
                  <div className={styles.faceItemHeader}>
                    <span className={styles.faceItemNumber}>#{index + 1}</span>
                    <span className={styles.faceItemConfidence}>{(face.confidence * 100).toFixed(2)}% Confidence</span>
                  </div>
                  <div className={styles.faceItemCoords}>
                    Position: ({Math.round(face.boundingBox.left * 100)}%, {Math.round(face.boundingBox.top * 100)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.metadata}>
        <small>
          Processed at: {new Date(faceData.processedAt).toLocaleString()}
        </small>
      </div>
    </div>
  )
}
export default FaceRecognition