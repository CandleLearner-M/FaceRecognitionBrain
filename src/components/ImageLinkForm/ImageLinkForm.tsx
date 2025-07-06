import { useState, type FormEvent } from 'react';
import styles from './ImageLinkForm.module.scss';

interface ImageLinkFormProps {
  onSubmit: (url : string) => void;
}

function ImageLinkForm({ onSubmit}: ImageLinkFormProps) {

  const [imageUrl, setImageUrl] = useState('');


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl.trim() && onSubmit) {
      onSubmit(imageUrl)
    }
  }
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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