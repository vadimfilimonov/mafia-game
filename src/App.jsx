import { useState } from 'react';
import _ from 'lodash';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import { GAMES_ROLES, ROLES_EMOJI } from './consts';
import './App.css'

const DEFAULT_CARDS_VITISILITY_STATE = {
  "1": false,
  "2": false,
  "3": false,
  "4": false,
  "5": false,
  "6": false,
  "7": false,
  "8": false,
  "9": false,
  "10": false,
};

function App() {
  const [roles, setRoles] = useState([...GAMES_ROLES]);
  const [visibilityCards, setVisibilityCards] = useState({ ...DEFAULT_CARDS_VITISILITY_STATE });

  const handleReset = () => {
    const shuffledRoles = _.shuffle(roles);
    setRoles(shuffledRoles);
  };

  const handleShowCard = (number) => () => {
    const isCardVisible = visibilityCards[number];
    setVisibilityCards({
      ...visibilityCards,
      [number]: !isCardVisible
    });    
  };

  const handleShowCards = () => {
    const cards = _.mapValues(visibilityCards, () => true);
    setVisibilityCards({ ...cards });
  };

  const handleHideCards = () => {
    const cards = _.mapValues(visibilityCards, () => false);
    setVisibilityCards({ ...cards });
  };

  const isAllCardsVisible = _.every(visibilityCards, value => value)

  return (
    <div className='container'>
      <ol className='roles container__roles'>
        {roles.map((role, index) => <li>{isAllCardsVisible || visibilityCards[index + 1] ? ROLES_EMOJI[role] : "❓"}</li>)}
      </ol>
      <div className="cards container__cards">
        {roles.map((role, index) => 
          <Card
          key={index}
          role={role} 
          number={index + 1} 
          isActive={visibilityCards[index + 1]} 
          handleClick={handleShowCard(index + 1)}
        />
        )}
      </div>
      <div className='toolbar container__toolbar'>
        <Button handleClick={handleReset}>Shuffle</Button>
        <Button handleClick={handleShowCards}>Open</Button>
        <Button handleClick={handleHideCards}>Hide</Button>
      </div>
    </div>
  )
}

export default App
