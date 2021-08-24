import './App.css';
import { useEffect } from 'react'
import Home from './components/home/home'

function App() {
  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      alert("Please use Landscape!");
    }
  }, [])

  return (
    window.innerHeight < window.innerWidth ?
      <Home />
      : '');
}

export default App;
