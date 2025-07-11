import { Suspense, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageSkeleton from './components/ImageSkeleton/ImageSkeleton';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Signin from './components/Signin/Signin';

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [route, setRoute] = useState('signin');

  const handleDetectFaces =  (url: string) => {
   setImageUrl(url);
  }

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        {
          route === 'signin'?
          <Signin />
          :
        <>
          <Hero userName="Mostafa" userRank={5} />
          <ImageLinkForm onSubmit={handleDetectFaces} />

          {/* <ImageSkeleton /> */}
          {imageUrl &&
            <Suspense fallback={<ImageSkeleton />}>
            <FaceRecognition imageUrl={imageUrl} />
            </Suspense>
          }
        </>
      }
        <Footer />
      </div>
    </main>
  )
}

export default App
