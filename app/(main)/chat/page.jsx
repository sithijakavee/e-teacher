"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Environment, OrbitControls } from '@react-three/drei';
// import { Model } from './Explorer';
import { ConvaiClient } from 'convai-web-sdk';
import { SETTINGS } from '@/app/constants';
import { useSession } from 'next-auth/react';
// import Navbar from './components/navbar';
// import Footer from './components/Footer';


const convaiClient = new ConvaiClient({
  apiKey: SETTINGS['CONVAI-API-KEY'],
  characterId: SETTINGS['CHARACTER-ID'],
  enableAudio: true,
});

const humanEmotions = ['😊', '🤔', '😄', '😯', '🙂', '😌'];

const MODES = {
  INTERVIEW: 'Interview Mode',
  FRIENDS: 'Friends Mode',
  FAMILY: 'Family Mode',
  TEACHER: 'Teacher Mode',
  FREE_CHAT: 'Free Chat Mode',
};

export default function App() {
  const [userText, setUserText] = useState('');
  const [npcText, setNpcText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isTalking, setIsTalking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chathumaduEmotion, setChathumaduEmotion] = useState('😊');
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const [selectedMode, setSelectedMode] = useState(MODES.FREE_CHAT);
  const orbitRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    convaiClient.setResponseCallback((response) => {
      setLoading(false);
      try {
        if (response.hasUserQuery()) {
          const transcript = response.getUserQuery();
          if (transcript.getIsFinal()) {
            const userMessage = transcript.getTextData();
            setUserText(userMessage);
            addToConversation('user', userMessage);
          }
        }
        if (response.hasAudioResponse()) {
          const aiMessage = response.getAudioResponse().getTextData();
          setNpcText(aiMessage);
          addToConversation('ai', aiMessage);
          setChathumaduEmotion(humanEmotions[Math.floor(Math.random() * humanEmotions.length)]);
        }
      } catch (error) {
        console.log('An error occurred while processing the response. Please try again.');
      }
    });

    convaiClient.onAudioPlay(() => {
      setIsTalking(true);
      setLoading(true);
    });
    convaiClient.onAudioStop(() => setIsTalking(false));

    return () => {
      convaiClient.setResponseCallback(null);
      convaiClient.onAudioPlay(null);
      convaiClient.onAudioStop(null);
    };
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [conversation]);

  const addToConversation = (sender, message) => {
    setConversation((prev) => [
      ...prev,
      { sender, message, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const startAIAutoConversation = useCallback(() => {
    let startingMessage = '';

    switch (selectedMode) {
      case MODES.INTERVIEW:
        startingMessage = 'Hello, let’s practice for an interview! What kind of job are you applying for?';
        break;
      case MODES.FRIENDS:
        startingMessage = 'Hey! What’s been going on lately? How’s everything with you?';
        break;
      case MODES.FAMILY:
        startingMessage = 'Hi! How’s the family? What’s new with everyone?';
        break;
      case MODES.TEACHER:
        startingMessage = 'Hello! Let’s start our lesson for today. What would you like to learn?';
        break;
      case MODES.FREE_CHAT:
        startingMessage = 'Hello! Feel free to chat about anything on your mind.';
        break;
      default:
        startingMessage = 'Hello! How can I assist you today?';
    }

    convaiClient.sendTextChunk(startingMessage);
    addToConversation('ai', startingMessage);
  }, [selectedMode]);

  useEffect(() => {
    if (selectedMode) {
      startAIAutoConversation();
    }
  }, [selectedMode, startAIAutoConversation]);

  const handleVoiceInput = useCallback(() => {
    setIsListening(true);
    convaiClient.startAudioChunk();
  }, []);

  const handleVoiceInputEnd = useCallback(() => {
    setIsListening(false);
    convaiClient.endAudioChunk();
  }, []);

  const handleTextInput = useCallback(() => {
    if (userText.trim()) {
      addToConversation('user', userText);
      convaiClient.sendTextChunk(userText);
      setUserText('');
    }
  }, [userText]);

  const resetError = () => {
    setError(null);
  };

  // const toggle3D = () => {
  //   setIs3DEnabled((prev) => !prev);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const session = useSession()
console.log(session)
  return (
    <>
    <div className="flex flex-col min-h-screen">
      {/* <Navbar onToggle3D={toggle3D} is3DEnabled={is3DEnabled} onLogout={handleLogout} /> */}
      <div className={`flex-grow app-container ${isLandscape ? 'landscape' : 'portrait'}`} ref={containerRef}>
        {/* {is3DEnabled && (
          <div className="canvas-container">
            <Canvas shadows camera={{ position: [0, 0, 15], fov: 30 }}>
              <Environment
                files="/snowy_forest_path_01_4k.hdr"
                ground={{ height: 5, radius: 30, scale: 20 }}
              />
              <Model
                position={[0, -1, 3]}
                scale={1.8}
                animationName={isTalking ? 'talk' : 'idle'}
              />
              <OrbitControls
                ref={orbitRef}
                enableZoom={true}
                minDistance={5}
                maxDistance={20}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.25}
              />
            </Canvas>
          </div>
        )} */}

        <div className="ui-overlay">
          <div className="conversation-history" ref={chatHistoryRef}>
            {conversation.map((entry, index) => (
              <div key={index} className={`message ${entry.sender}`}>
                <div className="message-header">
                  <strong>{entry.sender === 'user' ? 'You' : 'Chathumadu'} {entry.sender === 'ai' && chathumaduEmotion}</strong>
                  <span className="timestamp">{entry.timestamp}</span>
                </div>
                <div className="message-content">{entry.message}</div>
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextInput()}
            />
            <button onClick={handleTextInput} className="send-button" aria-label="Send message">Send</button>
            <button
              onClick={isListening ? handleVoiceInputEnd : handleVoiceInput}
              className={`voice-button ${isListening ? 'listening' : ''}`}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            >
              {isListening ? 'Listening...' : 'Voice'}
            </button>
          </div>

          <div className="mode-selection">
            <label htmlFor="mode-select">Choose Conversation Mode: </label>
            <select id="mode-select" value={selectedMode} onChange={handleModeChange}>
              <option value={MODES.INTERVIEW}>Interview Mode</option>
              <option value={MODES.FRIENDS}>Friends Mode</option>
              <option value={MODES.FAMILY}>Family Mode</option>
              <option value={MODES.TEACHER}>Teacher Mode</option>
              <option value={MODES.FREE_CHAT}>Free Chat Mode</option>
            </select>
          </div>

          {loading && <div className="loading-spinner">AI is thinking...</div>}
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={resetError}>Try again</button>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
    </>
  );
}
