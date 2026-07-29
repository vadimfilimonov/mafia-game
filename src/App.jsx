import { useEffect, useState } from 'react';
import _ from 'lodash';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import Control from './Components/Control/Control';
import { GAMES_ROLES } from './consts';
import './App.css'

const getInitialRoles = () => {
  const storedRoles = localStorage.getItem('roles');

  if (!storedRoles) {
    return _.shuffle([...GAMES_ROLES]);
  }

  try {
    return JSON.parse(storedRoles);
  } catch {
    return [...GAMES_ROLES];
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
    const shuffledRoles = _.shuffle(roles);
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
