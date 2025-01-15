import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';



function App() {
  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Navbar />

      <Routes>
        <Route path="/" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <Home />
        </motion.div>
        } />
        <Route path="/login" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <Login />
        </motion.div>
        } />
        <Route path="/signup" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <Signup />
        </motion.div>
        } />
      </Routes>
      <Footer />


    </div>
  )
}

export default App
