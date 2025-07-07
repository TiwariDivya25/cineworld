import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./css/App.css";
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Liked from './pages/Liked'
import Navbar from './components/Navbar'
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return(
    <div>
      <Navbar/>
    <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favorites" element={<Liked/>} />
      </Routes>
    </main>
    </div>
  )
}

export default App