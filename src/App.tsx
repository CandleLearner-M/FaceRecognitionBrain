import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';


function App() {
  const [imageUrl, setImageUrl] = useState('');

  const handleDetectFaces = (url: string) => {
    console.log('detecting face for the url:', url)
  }

  return (

    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm imageUrl={imageUrl} setImageUrl={setImageUrl} onSubmit={handleDetectFaces} />
        {/* 
        <FaceRecognition /> */}
      </div>
    </main>
  )
}

export default App
