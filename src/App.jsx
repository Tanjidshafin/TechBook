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
      <div className="fixed bottom-4 right-4">
        <a


          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
          </svg>
          Made by Shafin
        </a>
      </div>

    </div>
  )
}

export default App
