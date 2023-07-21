import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from "framer-motion";
import GlobalStyle from './globalStyles';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home/Home';
import Work from './pages/Work/Work';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Project from './pages/Project/Project';
import { ModalProvider } from './components/Common/ModalContext';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import use from './hooks/use';
import ModalContext from './components/Common/ModalContext.jsx';

const Blur = styled.div`
  ${({ isModalOpen }) =>
    isModalOpen
      ? `
    filter: blur(10px);
    transition: filter 0.3s ease-in-out;
  `
      : ''};
`;

const Layout = ({ children }) => {
  const { data, loading, error } = use('/social?populate=deep');  
  const { isModalOpen } = useContext(ModalContext);
  const location = useLocation(); 

  return (
    <div className="app">
      <GlobalStyle />
      <Navbar socialData={data} />
      <Helmet>      
        <title>Sumit Kukreja</title>                
        <link rel="icon" type="image/png" href="/favicon.ico" />         
      </Helmet>
      <Blur isModalOpen={isModalOpen}>
          <AnimatePresence mode='wait' onExitComplete={() => {
              if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "instant" });
              }
          }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer socialData={data} />
      </Blur>
    </div>
  );
};

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <ModalProvider>
        <Router>
          <Layout />
        </Router>
      </ModalProvider>
    </MotionConfig>
  );
}

export default App;
