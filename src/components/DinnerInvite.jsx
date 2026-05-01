import "../styles/App.css";
import "../styles/hearts.css";
import "../styles/cards.css";
import "../styles/glow.css";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function DinnerInvite() {
  const { name } = useParams();

  // Get environment variables
  const placeLocation = import.meta.env.VITE_REACT_APP_PLACE;
  const pickupTime = import.meta.env.VITE_REACT_APP_PICKUP_TIME;

  // Heart animation
  const [hearts, setHearts] = useState([]);
  const audioContextRef = useRef(null);
  const audioRef = useRef(null);
  const [yesClicked, setYesClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, { id: Date.now(), left: Math.random() * 100 }]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 4000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Generate and play typing sound
  const playTypingSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const context = audioContextRef.current;
      
      // Resume audio context if suspended
      if (context.state === "suspended") {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.value = 800; // Frequency in Hz
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.05);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.05);
    } catch (error) {
      console.log("Audio generation error:", error);
    }
  };

  // Message flow state
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const messages = [
    `hola ${name}...`,
    "has recibido una invitación...",
    "¿deseas abrirla?"
  ];

  // Typewriter effect
  useEffect(() => {
    if (messageIndex < messages.length) {
      const currentMessage = messages[messageIndex];
      setDisplayedText("");
      setIsTypingComplete(false);

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < currentMessage.length) {
          setDisplayedText(currentMessage.slice(0, currentIndex + 1));
          playTypingSound();
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
        }
      }, 80); // Adjust speed here

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [messageIndex]);

  const handleMessageClick = () => {
    if (isTypingComplete && messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1);
    }
  };

  // NO button state
  const [noClickCount, setNoClickCount] = useState(0);
  const [isTypewritingNoMessage, setIsTypewritingNoMessage] = useState(false);
  const noMessages = [
    "wey...",
    ":(",
    "de vdd no quieres?",
    "segura?",
    "dime que si pli",
    "dale al otro botón",
    "no seas así :c",
    "e obligao conio"
  ];

  // Typewriter effect for NO messages
  useEffect(() => {
    if (isTypewritingNoMessage && noClickCount > 0 && noClickCount <= noMessages.length) {
      const currentMessage = noMessages[noClickCount - 1];
      setDisplayedText("");
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < currentMessage.length) {
          setDisplayedText(currentMessage.slice(0, currentIndex + 1));
          playTypingSound();
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          setIsTypewritingNoMessage(false);
          clearInterval(typingInterval);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [isTypewritingNoMessage, noClickCount]);

  // Screen shake animation
  const screenShakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -10, 0],
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const [triggerShake, setTriggerShake] = useState(false);

  const handleNoClick = () => {
    if (noClickCount < noMessages.length) {
      setTriggerShake(true);
      setTimeout(() => setTriggerShake(false), 300);
      setNoClickCount(noClickCount + 1);
      setIsTypewritingNoMessage(true);
    }
  };

  const handleYesClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (!audioRef.current) {
      audioRef.current = new Audio("/assets/happy_song.mp3");
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => {
        console.log("Autoplay blocked:", error);
      });
    }
    
    setYesClicked(true);
  };

  // Floating envelope animation
  const envelopeVariants = {
    float: {
      y: [-15, 15, -15],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Card pop-out animation
  const cardVariants = {
    offscreen: {
      y: 200,
      scale: 0.9,
      opacity: 0.8,
    },
    onscreen: {
      y: 0,
      scale: 1,
      rotate: -10,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  // Button container animation
  const buttonContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div 
      className="app-container"
      animate={triggerShake ? "shake" : ""}
      variants={screenShakeVariants}
    >
      {/* Floating Hearts */}
      <div className="heart-container">
        {hearts.map((heart) => (
          <img
            key={heart.id}
            src="/assets/red-pixel-heart.png"
            className="floating-heart"
            style={{ left: `${heart.left}%` }}
            alt="heart"
          />
        ))}
      </div>

      {!yesClicked ? (
        <>
          {/* Original flow */}
          <div className="text-cloud-container" onClick={handleMessageClick} style={{ cursor: isTypingComplete ? "pointer" : "default" }}>
            <img
              src="/assets/text-cloud-pixel-art.png"
              alt="text-cloud"
              className="text-cloud"
              style={{ width: "420px" }}
            />
            <h1 className="text-cloud-text" style={{ bottom: displayedText.length > 21 ? 148 : 137 }}>
              {displayedText}
              {!isTypingComplete && messageIndex < messages.length && <span className="typing-cursor">|</span>}
            </h1>
          </div>

          {/* Snoopy reactions */}
          {messageIndex === messages.length - 1 && (
            <motion.img
              src={
                noClickCount >= noMessages.length 
                  ? "/assets/angry_snoopy.png"
                  : noClickCount > 0
                  ? "/assets/sad_snoopy.png"
                  : "/assets/happy_snoopy.png"
              }
              alt="snoopy"
              className="snoopy-reaction"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}

          <motion.div 
            className="envelope-container"
            variants={envelopeVariants}
            animate="float"
          >
            <img
              src="/assets/pixel-letter-envelope.png"
              alt="envelope"
              className="floating-envelope"
            />
          </motion.div>
          
          {messageIndex === messages.length - 1 && isTypingComplete && (
            <motion.div 
              className="button-container"
              initial="hidden"
              animate="visible"
              variants={buttonContainerVariants}
            >
              <motion.button 
                className="yes-button"
                onClick={handleYesClick}
                animate={{ scale: 1 + noClickCount * 0.15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                SI
              </motion.button>
              {noClickCount < noMessages.length && (
                <motion.button 
                  className="no-button"
                  onClick={handleNoClick}
                  animate={{ 
                    scale: Math.max(0.1, 1 - noClickCount * 0.15),
                    x: [0, -5, 5, -5, 0]
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  NO
                </motion.button>
              )}
            </motion.div>
          )}
        </>
      ) : (
        <motion.div 
          className="card-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
            <div className="splash pink-bg" />
            <motion.div className="card" style={{ flexDirection: 'column' }} variants={cardVariants}>
                <p style={{ position: "absolute", top: 10, fontSize: "1.5rem" }}>
                    que bueno que dijiste que sí :)
                </p>
              <img src="/assets/snoopy-in-love.webp" alt="snoopy-in-love" style={{ width: '90%', position: "absolute", bottom: 0 }} />
            </motion.div>
          </motion.div>

          <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
            <div className="splash magenta-bg" />
            <motion.div className="card" variants={cardVariants}>
                <p style={{ position: "absolute", top: 10, fontSize: "1.5rem" }}>
                    te paso a buscar hoy a las 8pm puntual
                </p>
                <img src="/assets/snoopy-kiss.webp" alt="snoopy-in-love" style={{ width: '90%', position: "absolute", bottom: 0 }} />
                {[...Array(3)].map((_, index) => (
                    <p 
                    key={index} 
                    style={{ position: "absolute", top: 80 + index * 15, fontSize: "1.3rem" }}
                    >
                    teamo :)
                    </p>
                ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default DinnerInvite;
