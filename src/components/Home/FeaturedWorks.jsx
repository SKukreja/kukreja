import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { InView, useInView } from 'react-intersection-observer';
import use from '../../hooks/use';
import { Icons } from '../Common/Icons';

const desktopContainerWidth = '70vw';

const Featured = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 10rem;
`;

const ProjectImageBorder = styled.div`
  z-index: 0;
  aspect-ratio: 16/9;
  width: 100%;
  border: 5px solid var(--accent-colour);
  @media (max-width: 1440px) {
    display: none;   
  }
`;

const ProjectName = styled(Link)`
  text-transform: uppercase;
  font-family: 'Satoshi';
  font-weight: 600;
  font-size: 2rem;
  color: var(--accent-colour);
  text-shadow: 0 0 2px var(--accent-colour);
  text-decoration: none;
  letter-spacing: 1px;
  margin: 2rem 0;
  & > svg {
    font-size: 3rem;
    margin-bottom: -0.75rem;
  }
  &:hover {
    color: white;
  }
  @media (max-width: 2560px) {
    font-size: 1.5rem;
    & > svg {
      font-size: 2.3rem;
      margin-bottom: -0.6rem;
    }
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    & > svg {
      font-size: 1.8rem;
      margin-bottom: -0.5rem;
    }
  }
`;

const ProjectContent = styled.div`
  position: relative;
  display: flex;
  width: 33%;
  flex-direction: column;
  z-index: 10;
  margin: -0.3rem 4rem 0 4rem;
  &.odd {
    text-align: right;
  }
  &.even {
    text-align: left;
  }
  &.odd .summary {
    padding-left: 25%;
  }
  &.even .summary {
    padding-right: 25%;
  }
  @media (max-width: 1920px) {
    width: 40%;
  }
  @media (max-width: 1440px) {
    width: 50%;
    &.odd .summary {
      padding-left: 0;
    }
    &.even .summary {
      padding-right: 0;
    }
  }
  @media (max-width: 1440px) {
    width: calc(100% - 4rem);
    margin: 0;
    padding: 2rem;
    background: rgba(8,7,8,0.9);
    justify-content: center;
    &.odd .summary {
      padding-left: 0;
    }
    &.even .summary {
      padding-right: 0;
    }
    &.even, &.odd {
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const ProjectImage = styled.div`
  position: relative;
  width: 75%;
  overflow: hidden;
  margin-top: 0;
  margin-left: 0rem;
  margin-right: 0rem;
  margin-bottom: 5rem;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1920px) {
    width: 60%;
  }
  @media (max-width: 1440px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 0;
    filter: blur(15px) saturation(180%);
  }
  @media (max-width: 768px) {

  }
`;

const Project = styled.div`
    display: flex;
    filter: grayscale(1);
    transition: all 2s ease;
    position: relative;
    opacity: 1;
    width: ${desktopContainerWidth};
    margin-bottom: 2rem;
    &.active {
      filter: grayscale(0);
    }
    &.active.odd, &.active.even {
      opacity: 1;
    }
    @media (max-width: 1920px) {
      width: 90%;
    }
    @media (max-width: 1440px) {
      width: 70%;
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 60vh;
      flex-direction: column;      
    }
    @media (max-width: 600px) {      
      height: 75vh;  
    }
`;

const ProjectCover = styled.div`
  position: absolute;
  left: 5px;
  right: 5px;
  top: 5px;
  bottom: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);  
  background-position: bottom;
  background-size: 105%;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    background-size: cover;
  }
`;

const ProjectSummary = styled.div`
  font-family: 'Satoshi';
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  color: var(--offwhite);
  font-size: 1rem;
  text-shadow: 0 0 1px var(--offwhite);
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProjectNumber = styled.h1`
  font-family: 'Satoshi';
  font-size: 10rem;
  font-weight: 200;
  line-height: 0.8;
  text-shadow: 0 0 2px var(--offwhite);
  margin: 0;
  filter: drop-shadow(2px 2px 2px black);
  @media (max-width: 1600px) {
    font-size: 6rem;
  }
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ProjectActions = styled.div`
  margin: 2rem -0.5rem;
`;

const ProjectLink = styled(Link)`
  color: white;
  display: inline-flex;
  font-size: 1.5rem;
  padding: 0.5rem;
  line-height: 1;
  border-radius: 5px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: var(--accent-colour);
  align-items: center;
  overflow: hidden;
  text-decoration: none;
  &:hover {
    color: #080708;
    background: var(--offwhite);
    text-decoration: none;
  }
  &:hover .btn-label {
    max-width: 300px;
    opacity: 1;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-family: 'Hind';
  font-size: 6rem;
  text-transform: uppercase;
  color: var(--accent-colour);
  letter-spacing: 0.1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 4rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 0.03rem;
  }
`;

const ButtonLabel = styled.span`
  display: inline-flex;
  max-width: 0;  
  opacity: 0;
  font-family: 'Satoshi';
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  -webkit-transition: all 0.5s linear;
    -moz-transition: all 0.5s linear;
    -o-transition: all 0.5s linear;
    transition: all 0.5s linear;
`;

const LabelContainer = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const padNum = (num, targetLength) => {
  return num.toString().padStart(targetLength, "0");
}

const ProjectInfo = (props) => {
  return (
    <ProjectContent className={props.className}>
      <ProjectHeader>
        <ProjectNumber>{padNum(props.number + 1, 2)}</ProjectNumber>
        <ProjectName to={"/project/" + props.project.attributes.slug}>{props.project.attributes.title}{Icons['Up Right']()}</ProjectName>
      </ProjectHeader>
      <ProjectSummary className='summary'>{props.project.attributes.summary}</ProjectSummary>
      <ProjectActions>
      {props.project.attributes.links?.map((link) => (
        <ProjectLink key={link.id} to={link.url}>{Icons[link.icon]()}
          <ButtonLabel className='btn-label'><LabelContainer>{link.name}</LabelContainer></ButtonLabel>
        </ProjectLink>
      ))}        
      </ProjectActions>
    </ProjectContent>
  );
}

const ProjectItem = ({ project, number }) => {
  const [viewRef, inView, entry] = useInView({
    threshold: 0.1,
  });
  const ref = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [elementTop, setElementTop] = useState(0);
  const [bgY, setBgY] = useState(50);

  // Update window height on resize
  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update elementTop and bgY on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setElementTop(rect.top);

        const newBgY = (rect.top / windowHeight) * 100;
        setBgY(newBgY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowHeight]);


  return (
    <Project
      ref={viewRef}
      className={`${inView ? 'active' : ''} ${
        number % 2 == 0 ? 'odd' : 'even'
      }`}
    >
      {number % 2 == 0 ? (
        <ProjectInfo className="odd" number={number} project={project} />
      ) : (
        ''
      )}
      <ProjectImage>
        <ProjectImageBorder></ProjectImageBorder>
        <ProjectCover
          ref={ref}
          style={{
            backgroundImage:
              'url(' +
              import.meta.env.VITE_APP_UPLOAD_URL +
              project.attributes.cover.data.attributes.url +
              ')',
              backgroundPositionY: `${bgY}%`  // change background position Y as a percentage
          }}
        />
      </ProjectImage>
      {number % 2 != 0 ? (
        <ProjectInfo className="even" number={number} project={project} />
      ) : (
        ''
      )}
    </Project>
  );
};

const FeaturedWorks = () => {
  const { data, loading, error } = use(
    `/home?populate=deep`
  );

  const [animated, setAnimated] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setAnimated(true);
    }
  }, [inView]);

  if (error) return (
    <>{error}</>
  )

  return (
    <Featured>
      <Header>Featured Works</Header>
      {/* Loop through featured projects */}
      {data?.attributes.featured.works.data.map((project, number) => (
        <ProjectItem key={project.id} project={project} number={number} />
      ))}
    </Featured>
  )
}

export default FeaturedWorks