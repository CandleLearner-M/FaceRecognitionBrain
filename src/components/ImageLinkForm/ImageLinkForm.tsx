import { useState, type FormEvent } from 'react';
import styles from './ImageLinkForm.module.scss';
import { IoSearch } from 'react-icons/io5';

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

  const exampleImages = [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400'
  ];
  
  return (
    <section className={styles.formSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}><IoSearch size={24}/> Face Detection Engine</h2>
        </div>

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
      </div>
    </section>
  );
}

export default ImageLinkForm;