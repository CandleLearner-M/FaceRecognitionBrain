import styles from './ImageSkeleton.module.scss';

function ImageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.imageSkeleton}>
          <div className={styles.shimmer}></div>
        </div>

        <div className={styles.loadingInfo}>
          <div className={styles.spinner}></div>
          <div className={styles.textContent}>
            <h3>Analyzing Image...</h3>
            <p>Detecting faces with AI magic</p>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ImageSkeleton