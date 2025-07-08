import { Suspense, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Skeleton from 'react-loading-skeleton';
import ImageSkeleton from './components/ImageSkeleton/ImageSkeleton';




function App() {

  const [imageUrl, setImageUrl] = useState('');
  
  const handleDetectFaces =  (url: string) => {
   setImageUrl(url);
  }

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onSubmit={handleDetectFaces} />

        <ImageSkeleton />
        {imageUrl &&
        <Suspense fallback={<Skeleton />}>
          <FaceRecognition imageUrl={imageUrl} />
        </Suspense>
        }
      </div>
    </main>
  )
}

export default App
