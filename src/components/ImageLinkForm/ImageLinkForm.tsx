import { useEffect, useState, type FormEvent } from 'react';
import styles from './ImageLinkForm.module.scss';
import { IoSearch } from 'react-icons/io5';
import { isUrlLoading } from '../../hooks/useFaceDetection';

interface ImageLinkFormProps {
  onSubmit: (url : string) => void;
}

function ImageLinkForm({ onSubmit}: ImageLinkFormProps) {

  const [imageUrl, setImageUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null)

  const isSubmitting = submittedUrl ? isUrlLoading(submittedUrl) : false;

  useEffect(() => {
    if (!submittedUrl) return;

    const interval = setInterval(() => {
      if (!isUrlLoading(submittedUrl)) {
        setSubmittedUrl(null);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [submittedUrl])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl.trim() && onSubmit) {
      setSubmittedUrl(imageUrl)
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
      </div>
    </section>
  );
}

export default ImageLinkForm;