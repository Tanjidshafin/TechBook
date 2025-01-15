
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'



function App() {


  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Navbar />
      <div className='px-4 sm:px-6 lg:px-8'>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
