
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Body from './pages/Body'

function App() {  
  const [currentPage, setCurrentPage] = useState('home')
  
  const handleLoginSuccess = () => {
    setCurrentPage('home');
  };

  return ( 
    <div style={{ height: '100dvh', width: '100%' }}>
    <Header onPageChange={setCurrentPage} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body currentPage={currentPage} onReset={handleLoginSuccess} />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
