import React, { useRef } from 'react'
import Landing from '../../components/Home/Landing'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import Project from '../../components/Project/Project'
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { Helmet } from 'react-helmet'
import styled, { keyframes } from 'styled-components'

const Content = styled(motion.div)`
  display: flex;  
  height: 100vh;
  height: 100svh;
  width: 300vw; 
  background: var(--offwhite);
  filter: url(#wavy2);
  position: sticky;
  overflow: hidden;
  top: 0;
`;

const HorizontalScrollContainer = styled(motion.div)`
  position: relative;
  height: 300vh;  
`;

const Filter = styled.svg`
  display: none;
`;

const Noise = styled.div`
  background: url("Noise.png");
  background-repeat: repeat;
  opacity: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 3;
`;

const BoxShadow = styled.div`
  box-shadow: 2px 3px 20px black, 0 0 125px #8f5922 inset;
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
`;

const Home = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // How do I make this linear interpolate so it smooth scrolls?

  const x = useSmoothScroll(scrollYProgress, 0, -200); 
  const projectScroll = useSmoothScroll(scrollYProgress, 0, 50); 

  return (
    <motion.div
    initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 1 }}
    >
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
      <Filter>
        <filter id="wavy">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </Filter>
      <HorizontalScrollContainer ref={targetRef}>
        <Content style={{ x: x + 'vw' }}>
          <Noise />
          <BoxShadow />
          <Landing />
          <Splash customScroll={{ x: projectScroll + 'vw'}} />
          <FeaturedWorks />
        </Content>
      </HorizontalScrollContainer>
    </motion.div>
  )
} 

export default Home