import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import { GAMES_ROLES, ROLES_EMOJI } from './consts';
import './App.css'

function App() {
  const [roles, setRoles] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const storedRoles = localStorage.getItem('roles');
    if (!storedRoles) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoles([...GAMES_ROLES]);
      return;
    }

    try {      
      setRoles(JSON.parse(storedRoles));
    } catch {
      setRoles([...GAMES_ROLES]);
    }
  }, []);

  const handleReset = () => {
    setActiveCardIndex(0);
    const shuffledRoles = _.shuffle(roles);
    setRoles(shuffledRoles);
    localStorage.setItem('roles', JSON.stringify(shuffledRoles));
  };

  const handleNextCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % roles.length);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex - 1 + roles.length) % roles.length);
  };

  const handleCardClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      handleNextCard();
      clickTimeoutRef.current = null;
    }, 200);
  };

  const handleCardDoubleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    handlePrevCard();
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className='container'>
      <div className="cards container__cards" style={{ '--active-card-index': activeCardIndex }}>
        {roles.map((role, index) => 
          <Card
          key={index}
          role={role}
          number={index + 1}
          handleClick={handleCardClick}
          handleDoubleClick={handleCardDoubleClick}
        />
        )}
      </div>
      <div className='toolbar container__toolbar'>
        <Button handleClick={handleReset}>Shuffle</Button>
      </div>
    </div>
  )
}

export default App
