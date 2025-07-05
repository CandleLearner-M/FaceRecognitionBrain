import styles from './ImageLinkForm.module.scss';

interface ImageLinkFormProps {
  imageUrl: string,
  setImageUrl: (url : string) => void;
  onSubmit: (url : string) => void;
}

function ImageLinkForm({imageUrl, setImageUrl}: ImageLinkFormProps) {
  return (
    <form className={styles.form}>
      <p className={styles.title}>
        This Magic Brain will detect faces in your pictures. Give it a try!
      </p>
      <div className={styles.inputForm}>
        <input 
          type="url" 
          className={styles.input} 
          placeholder="Enter image URL here..."
          aria-label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button className={styles.btn} type='submit'>Detect</button>
      </div>
    </form>
  );
}

export default ImageLinkForm;