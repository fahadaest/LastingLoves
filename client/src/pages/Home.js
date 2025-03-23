import React, { useRef, useEffect, useState } from 'react';
import MessagesOfLove from '../components/homePageSections/MessagesOfLove';
import CherishYourLove from '../components/homePageSections/CherishYourLove';
import PersonalVideoMessage from '../components/homePageSections/PersonalVideoMessage';
import GetInTouch from '../components/homePageSections/GetInTouch';
import RegisterNow from '../components/homePageSections/RegisterNow';
import { useSelector } from 'react-redux';

function Home({ url }) {
  const messagesOfLoveRef = useRef(null);
  const cherishYourLoveRef = useRef(null);
  const personalVideoMessageRef = useRef(null);
  const getInTouchRef = useRef(null);


  useEffect(() => {
    if (url === 'home' && messagesOfLoveRef.current) {
      messagesOfLoveRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (url === 'about' && cherishYourLoveRef.current) {
      cherishYourLoveRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (url === 'services' && personalVideoMessageRef.current) {
      personalVideoMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (url === 'contact' && getInTouchRef.current) {
      getInTouchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [url]);

  return (
    <div className="hero-background-img" >
      <div ref={messagesOfLoveRef}>
        <MessagesOfLove />
      </div>
      <div ref={cherishYourLoveRef}>
        <CherishYourLove />
      </div>
      <div ref={personalVideoMessageRef}>
        <PersonalVideoMessage />
      </div>
      <div ref={getInTouchRef}>
        {/* <GetInTouch /> */}
        <RegisterNow />
      </div>
    </div >
  );
}

export default Home;