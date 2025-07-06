import styles from './FaceRecognition.module.scss'

function FaceRecognition({url}: {url: string}) {
  return (
    <div className={styles.faceRecognition}>
      <img src={url} alt="user input image" />
    </div>
  )
}
export default FaceRecognition