import './App.css';
import Navigation from './components/Navigation/Navigation';


function App() {
  

  return (
    <main>
      <div className='pattern-particle-wave'></div>
      <div className='content-wrapper'>
        <Navigation />
        <ImageLinkForm />
        {/* <Logo />
        <FaceRecognition /> */}
      </div>
    </main>
  )
}

export default App
