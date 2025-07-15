import { Suspense, useState, type JSX } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageSkeleton from './components/ImageSkeleton/ImageSkeleton';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import Signin from './components/Signin/Signin';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';

const EMAIL = 'tata@gmail.com';
const PASSWORD = '1';

// Create protected Route component
const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
const ProtectedRoute = ({children}: {children: JSX.Element}) => {

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent () {
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleDetectFaces =  (url: string) => {
   setImageUrl(url);
  }

  
  const onLogin = async (email: string, password: string) => {
    if(email === EMAIL && password === PASSWORD) {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/')
    } else {
      throw new Error('Invalid credentials');
    }
  }

  const onLogOut = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('signin')
  }

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation onLogout={onLogOut} />

          <Routes>
            <Route path='/signin' element={<Signin onLogin={onLogin} />} /> 

            <Route path='/' element={
              <ProtectedRoute>
                <div>
                  <Hero userName="Mostafa" userRank={5} />
                  <ImageLinkForm onSubmit={handleDetectFaces} />

                  {/* <ImageSkeleton /> */}
                  {imageUrl &&
                    <Suspense fallback={<ImageSkeleton />}>
                    <FaceRecognition imageUrl={imageUrl} />
                    </Suspense>
                  }
                </div>
              </ProtectedRoute>
            } />   

            <Route path='/signup' element={
              isAuthenticated ? 
              <Navigate to='/' replace /> :
              <SignUp />
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />  
          </Routes>
        <Footer />
      </div>
    </main>
  )
}


export default App
