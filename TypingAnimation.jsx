import React, { useState, useEffect } from 'react';

const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const typingDelay = 100; // Delay in milliseconds between each character
  const pauseDelay = 2000; // Pause duration in milliseconds between phrases

  useEffect(() => {
    
    const phrases = [
      'Welcome to the Discussion Forum!',
      'Join the conversation.',
      'Share your thoughts and ideas.'
    ];

    let index = 0;
    let charIndex = 0;
    let timerId = null;

    const type = () => {
      if (index < phrases.length) {
        const phrase = phrases[index];
        if (charIndex <= phrase.length) { // Adjusted condition to include the entire phrase
          setText(prevText => phrase.slice(0, charIndex));
          charIndex++;
          timerId = setTimeout(type, typingDelay);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setText('');
            charIndex = 0;
            index = (index + 1) % phrases.length;
            timerId = setTimeout(type, typingDelay);
          }, pauseDelay);
        } 
      }
    };

    type();

    return () => {
      clearTimeout(timerId);
    };
  }, []);
 
  return (
    <div className="typing-animation-text" style={{color:'#3f0f5db7'}}>
     
      <p>{text}{isTyping ? '|' : ''}</p>
    </div>
  );
};

export default TypingAnimation;
