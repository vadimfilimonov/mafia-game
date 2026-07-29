import { useEffect, useState } from 'react';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import Control from './Components/Control/Control';
import { GAMES_ROLES } from './consts';
import './App.css'

const expectedRoles = [...GAMES_ROLES].sort();

const shuffleRoles = (roles) => {
  const shuffledRoles = [...roles];

  for (let index = shuffledRoles.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledRoles[index], shuffledRoles[randomIndex]] = [shuffledRoles[randomIndex], shuffledRoles[index]];
  }

  return shuffledRoles;
};

const hasValidRoles = (roles) => {
  if (!Array.isArray(roles) || roles.length !== expectedRoles.length) {
    return false;
  }

  return [...roles].sort().every((role, index) => role === expectedRoles[index]);
};

const getInitialRoles = () => {
  const storedRoles = localStorage.getItem('roles');

  if (!storedRoles) {
    return shuffleRoles(GAMES_ROLES);
  }

  try {
    const roles = JSON.parse(storedRoles);

    return hasValidRoles(roles) ? roles : shuffleRoles(GAMES_ROLES);
  } catch {
    return shuffleRoles(GAMES_ROLES);
  }
};

function App() {
  const [roles, setRoles] = useState(getInitialRoles);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

  const handleReset = () => {
    setActiveCardIndex(0);
    setIsControlModalOpen(false);
    const shuffledRoles = shuffleRoles(roles);
    setRoles(shuffledRoles);
  };

  const handleNextCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % roles.length);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex - 1 + roles.length) % roles.length);
  };

  return (
    <div className='container'>
      {!isControlModalOpen && (
        <button
          className='control-trigger'
          type='button'
          aria-label='Открыть панель управления'
          onClick={() => setIsControlModalOpen(true)}
        >
          ⚙️
        </button>
      )}
      <div className="container__cards">
        <div className="cards" style={{ '--active-card-index': activeCardIndex }}>
          {roles.map((role, index) =>
            <Card
              key={index}
              role={role}
              number={index + 1}
              handleRightPartClick={handleNextCard}
              handleLeftPartClick={handlePrevCard}
            />
          )}
        </div>
      </div>
      <div className='toolbar container__toolbar'>
        <Button handleClick={handleReset}>Перемешать</Button>
      </div>
      {isControlModalOpen && (
        <Control
          handleClose={() => setIsControlModalOpen(false)}
          handleReset={handleReset}
        />
      )}
    </div>
  )
}

export default App
