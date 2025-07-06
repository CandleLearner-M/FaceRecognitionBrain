import { Suspense, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import { convertClarifaiResponse } from './utils/clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


 const PAT = '5851bf812aee43c7b596e389ae7a999a';
 const USER_ID = 'clarifai';       
 const APP_ID = 'main';
 const MODEL_ID = 'face-detection';


 const generateClarifaiRequest = function (url: string) {
   
  const IMAGE_URL = url;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;
}


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
        <Suspense fallback={}>
          <FaceRecognition url={imageUrl} />
        </Suspense>
        }
      </div>
    </main>
  )
}

export default App
