import styles from './ImageLinkForm.module.scss';

function ImageLinkForm() {
  return (
    <div className={styles.form}>
      <p className={styles.title}>
        This Magic Brain will detect faces in your pictures. Give it a try!
      </p>
      <div className={styles.inputForm}>
        <input 
          type="text" 
          className={styles.input} 
          placeholder="Enter image URL here..."
          aria-label="Image URL"
        />
        <button className={styles.btn}>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;