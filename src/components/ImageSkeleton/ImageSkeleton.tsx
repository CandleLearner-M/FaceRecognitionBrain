import styles from './ImageSkeleton.module.scss';

function ImageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.imageSkeleton}>
          <div className={styles.shimmer}></div>
        </div>
      </div>
    </div>
  )
}
export default ImageSkeleton