import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';


function App() {
  

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/* 
        <FaceRecognition /> */}
      </div>
    </main>
  )
}

export default App
