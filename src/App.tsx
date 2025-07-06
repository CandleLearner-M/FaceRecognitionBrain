import { Suspense, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import { convertClarifaiResponse } from './utils/clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Skeleton from 'react-loading-skeleton';




function App() {

  const [imageUrl, setImageUrl] = useState('');
  
  const handleDetectFaces = async (url: string) => {

    try {
      const response = await fetch("/api/v2/models/" + MODEL_ID + "/outputs", generateClarifaiRequest(url));
      const clarifaiObj = await response.json();
      const data = convertClarifaiResponse(clarifaiObj);

      console.log(data);
      setImageUrl(data.imageUrl);


    } catch (error) {
      console.error(error);
    }
   
  }

  return (

    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onSubmit={handleDetectFaces} />

        {imageUrl &&
        <Suspense fallback={<Skeleton />}>
          <FaceRecognition url={imageUrl} />
        </Suspense>
        }
      </div>
    </main>
  )
}

export default App
