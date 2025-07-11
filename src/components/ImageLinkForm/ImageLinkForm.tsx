import { useState, type FormEvent } from 'react';
import styles from './ImageLinkForm.module.scss';

interface ImageLinkFormProps {
  onSubmit: (url : string) => void;
}

function ImageLinkForm({ onSubmit}: ImageLinkFormProps) {

  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl.trim() && onSubmit) {
      if (submittedUrl !== imageUrl) setIsSubmitting(true);
      setSubmittedUrl(imageUrl)
      onSubmit(imageUrl);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 1550);
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
          <h2 className={styles.title}>
            Face Detection Engine
          </h2>
          <p className={styles.description}>
            Upload an image URL and watch our AI instantly detect and analyze faces with precision
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
              <input 
                type="url" 
                className={styles.input} 
                placeholder="Enter image URL here..."
                aria-label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                />
                 <button className={`${styles.btn} ${isSubmitting ? styles.loading : ''}`} type='submit' disabled={isSubmitting}>
                {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  Analyzing...
                </>
              ) : (
                <>
                  Detect Faces
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </>
              )}
              </button>
          </div>
        </form>

        <div className={styles.examples}>
          <p className={styles.exampleText}>Try these examples</p>
          <div className={styles.exampleImages}>
            {exampleImages.map(( url, index) => (
              <button key={index} className={styles.exampleImage}onClick={() => setImageUrl(url)} type='button'>
                <img src={url} alt={`Example ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageLinkForm;