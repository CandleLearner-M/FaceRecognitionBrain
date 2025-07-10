import { Suspense, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageSkeleton from './components/ImageSkeleton/ImageSkeleton';
import Hero from './components/Hero/Hero';

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDetectFaces =  (url: string) => {
   setImageUrl(url);
  }

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        <Hero userName="Mostafa" userRank={5} />
        <ImageLinkForm onSubmit={handleDetectFaces} isLoading={isLoading} />

        {/* <ImageSkeleton /> */}
        {imageUrl &&
        <Suspense fallback={<ImageSkeleton />}>
          <FaceRecognition imageUrl={imageUrl} setIsLoading={setIsLoading} />
        </Suspense>
        }
      </div>
    </main>
  )
}

export default App
