import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import Control from './Components/Control/Control';
import { GAMES_ROLES } from './consts';
import './App.css'

const expectedRoles = [...GAMES_ROLES].sort();
const mobileMediaQuery = '(max-width: 768px), (max-width: 1024px) and (max-height: 500px)';

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
  const [deckVersion, setDeckVersion] = useState(0);
  const [isControlModalOpen, setIsControlModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    active: false,
    breakpoints: {
      [mobileMediaQuery]: { active: true },
    },
  });

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

  const handleReset = () => {
    setIsControlModalOpen(false);
    setRoles(shuffleRoles(roles));
    setDeckVersion((version) => version + 1);
  };

  const handleCardClick = (event) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const method = event.clientX < left + width / 2 ? 'scrollPrev' : 'scrollNext';

    emblaApi?.[method]();
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
      <div className="container__cards" key={deckVersion} ref={emblaRef} onClick={handleCardClick}>
        <div className="cards">
          {roles.map((role, index) =>
            <Card
              key={index}
              role={role}
              number={index + 1}
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
