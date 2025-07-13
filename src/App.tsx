import { Suspense, useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageSkeleton from './components/ImageSkeleton/ImageSkeleton';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Signin from './components/Signin/Signin';
import LogoutModal from './components/LogoutModal/LogoutModal';

const EMAIL = 'TATA@gmail.com';
const PASSWORD = '1';

function App() {

  const [imageUrl, setImageUrl] = useState('');
  const [route, setRoute] = useState('signin');

  const handleDetectFaces =  (url: string) => {
   setImageUrl(url);
  }

  
  const onLogin = async (email: string, password: string) => {
    if(email === EMAIL && password === PASSWORD) {
      setRoute('home')
    } else {
      throw new Error('Invalid credentials');
    }
  }

  const onLogOut = () => setRoute('signin');

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation onLogout={onLogOut} />
        {
          route === 'signin'?<>
          <Signin onLogin={onLogin} />
          <LogoutModal userName='Mostafa' />
          </>
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
