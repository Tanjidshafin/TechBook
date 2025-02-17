import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Private from './auth/Private';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './components/Dashboard';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './context/AppContext';
import MyProfile from './dashboard/MyProfile';
import MyProducts from './dashboard/MyProducts';
import AddProduct from './dashboard/AddProduct';
import PendingProducts from './dashboard/PendingProducts';
import ReportedProducts from './dashboard/ReportedProducts';
import Statistics from './dashboard/Statistics';
import ManageUsers from './dashboard/ManageUsers';
import UpdateProduct from './pages/UpdateProduct';
import AllProducts from './pages/AllProducts';
import Error404 from './pages/Error404';
import Subscription from './components/Subscription';
import ManageCoupons from './dashboard/ManageCoupons';

import Lenis from '@studio-freight/lenis';

function App() {
  const [showCursor, setShowCursor] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      smooth: true,
    });

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setShowCursor(isLargeScreen);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <div className='max-w-screen-2xl mx-auto'>
     
      {location.pathname.startsWith("/dashboard") ? "" : (<Navbar />)}
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
        <Route path="/product/:id" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <Private>
            <ProductDetails />
          </Private>
        </motion.div>
        } />
        <Route path="/products" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >

          <AllProducts />

        </motion.div>
        } />
        <Route path="*" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >

          <Error404 />

        </motion.div>
        } />
        <Route path="/subscription" element={<motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
        >

          <Subscription />

        </motion.div>
        } />
        <Route path="/updateUser/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <UpdateProduct />
          </motion.div>
        } />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index path="my-profile" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <MyProfile />
            </motion.div>
          } />
          <Route path="add-product" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <AddProduct />
            </motion.div>
          } />
          <Route path="my-products" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <MyProducts />
            </motion.div>
          } />
          <Route path="reported-products" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <ReportedProducts />
            </motion.div>
          } />
          <Route path="pending-products" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <PendingProducts />
            </motion.div>
          } />
          <Route path="statistics" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <Statistics />
            </motion.div>
          } />
          <Route path="manage-users" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <ManageUsers />
            </motion.div>
          } />
          <Route path="manage-coupons" element={
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
              <ManageCoupons />
            </motion.div>
          } />
        </Route>


      </Routes>

      {location.pathname.startsWith("/dashboard") ? "" : (<Footer />)}
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
