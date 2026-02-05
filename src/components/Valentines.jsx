import "../styles/App.css";
import "../styles/hearts.css";
import "../styles/cards.css";
import "../styles/glow.css";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function App() {
  // Get the name from the route params
  const { name } = useParams();
  
  // Get the URL to the place from env variables
  const firstMessage = import.meta.env.VITE_REACT_APP_FIRST_MESSAGE;
  const secondMessage = import.meta.env.VITE_REACT_APP_SECOND_MESSAGE;
  const thirdMessage = import.meta.env.VITE_REACT_APP_THIRD_MESSAGE;
  const fourthMessage = import.meta.env.VITE_REACT_APP_FOURTH_MESSAGE;
  const dateDay = import.meta.env.VITE_REACT_APP_DATE_DAY;
  const dateTime = import.meta.env.VITE_REACT_APP_DATE_TIME;
  const placeURL = import.meta.env.VITE_REACT_APP_PLACE_URL;

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

  // Heart animation
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, { id: Date.now(), left: Math.random() * 100 }]);
      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 4000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Controls for showing the card list
  const [showCards, setShowCards] = useState(false);
  const audioRef = useRef(null);

  // Function to start music & reveal cards
  const handleButtonClick = () => {
    setShowCards(true); // Reveal card list

    if (!audioRef.current) {
      audioRef.current = new Audio("/assets/ocarina-of-time-fairy-fountain-ost.mp3");
      audioRef.current.loop = true;
      audioRef.current.play().catch(error => {
        console.log("Autoplay blocked:", error);
      });
    }
  };

  return (
    <div className="app-container">
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
      
      <div className="text-cloud-container">
        <img
          src="/assets/text-cloud-pixel-art.png"
          alt="text-cloud"
          className="text-cloud"
          style={{ width: "350px" }}
        />
        <h1 className="text-cloud-text" style={{ bottom: 137 }}>keloke {name},</h1>
        <h1 className="text-cloud-text" style={{ bottom: 135 }}>:)</h1>
      </div>

      <img
        src="/assets/snoopy-heart-transp.png"
        alt="snoopy"
        className="snoopy-img"
      />

      {!showCards && (
        <button 
          className="glow-on-hover" 
          style={{ fontSize: "1.3rem", marginBottom: 50 }}
          onClick={handleButtonClick}
        >
          dame cli
        </button>
      )}

      <motion.div 
        className="card-list"
        initial={{ opacity: 0 }}
        animate={{ opacity: showCards ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        style={{ display: showCards ? "flex" : "none" }}
      >
        {/* Card 1 */}
        <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
          <div className="splash pink-bg" />
          <motion.div className="card" style={{ flexDirection: 'column' }} variants={cardVariants}>
            <p style={{ position: "absolute", top: 10, fontSize: "1.5rem" }}>
              quieres cenar conmigo este san valentín?
            </p>
            <p style={{ position: "absolute", top: 85, fontSize: "1.5rem" }}>
              {firstMessage}
            </p>
            <img src="/assets/snoopy-asleep-gif.gif" alt="heart" style={{ width: '90%', position: "absolute", bottom: 0 }} />
          </motion.div>
        </motion.div>

        {/* Card 2 */}
        <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
          <div className="splash orange-bg" />
          <motion.div className="card" variants={cardVariants}>
            <p style={{ position: "absolute", top: 10, fontSize: "1.5rem" }}>
              {secondMessage}
            </p>
            <p style={{ position: "absolute", top: 85, fontSize: "1.5rem" }}>
              {thirdMessage}
            </p>
            <img src="/assets/snoopy-yawning.webp" alt="heart" style={{ width: '90%', position: "absolute", bottom: 0 }} />
          </motion.div>
        </motion.div>

        {/* Card 3 */}
        <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
          <div className="splash purple-bg" />
          <motion.div className="card" variants={cardVariants}>
            <p style={{ position: "absolute", top: 25, fontSize: "1.5rem" }}>
              sería el {dateDay}
            </p>
            <p style={{ position: "absolute", top: 60, fontSize: "1.5rem" }}>
              a las {dateTime}
            </p>
            <img src="/assets/snoopy-in-love.webp" alt="heart" style={{ width: '90%', position: "absolute", bottom: 0 }} />
          </motion.div>
        </motion.div>

        {/* Card 4 */}
        <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
          <div className="splash magenta-bg" />
          <motion.div className="card" variants={cardVariants}>
            <p style={{ position: "absolute", top: 15, fontSize: "1.5rem" }}>
              así hacemos una zapata antes de beber {">"}:)
            </p>
            <p style={{ position: "absolute", top: 85, fontSize: "1.5rem" }}>
              {fourthMessage}
            </p>
            <img src="/assets/snoopy-flying.gif" alt="heart" style={{ width: '90%', position: "absolute", bottom: 0 }} />
          </motion.div>
        </motion.div>

        {/* Card 5 */}
        <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
          <div className="splash green-bg" />
          <motion.div className="card" variants={cardVariants}>
            <button 
              className="glow-on-hover" 
              style={{ position: "absolute", top: 20, fontSize: "1.3rem" }}
              onClick={() => window.open(placeURL, "_blank")}
            >
              en este sitio
            </button>
            <p style={{ position: "absolute", top: 85, fontSize: "1.3rem" }}>
              looks pretty cool imo
            </p>
            <img src="/assets/italianissimo-chef.png" alt="heart" style={{ width: '90%', position: "absolute", bottom: 0 }} />
          </motion.div>
        </motion.div>

        {/* Card 6 */}
        <motion.div className="card-container pixel-card" initial="offscreen" whileInView="onscreen" viewport={{ amount: 0.6, once: false }}>
          <div className="splash light-blue-bg" />
          <motion.div className="card" variants={cardVariants}>
          {[...Array(5)].map((_, index) => (
            <p 
              key={index} 
              style={{ position: "absolute", top: 20 + index * 15, fontSize: "1.3rem" }}
            >
              si o qué {">"}:))
            </p>
          ))}
            <img src="/assets/snoopy-kiss.webp" alt="heart" style={{ width: '90%', position: "absolute", bottom: 0 }} />
          </motion.div>
        </motion.div>
      </motion.div>
      <audio autoPlay loop>
        <source src="/assets/ocarina-of-time-fairy-fountain-ost.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;
