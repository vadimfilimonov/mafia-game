import { useState } from 'react';
import Card from './Card';
import _ from 'lodash';
import { GAMES_ROLES, ROLES_EMOJI } from './consts';
import './App.css'

function App() {
  const [roles, setRoles] = useState(GAMES_ROLES);
  const [visibilityCards, setVisibilityCards] = useState({
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
  });

  const handleReset = () => {
    const shuffledRoles = _.shuffle(roles);
    setRoles(shuffledRoles);
    const hiddenCards = _.mapValues(visibilityCards, () => false);
    setVisibilityCards({ ...hiddenCards });
  };

  const handleShowCard = (number) => () => {
    const isCardVisible = visibilityCards[number];
    setVisibilityCards({
      ...visibilityCards,
      [number]: !isCardVisible
    });    
  };

  const handleShowCards = () => {
    const isAllCardsVisible = _.every(visibilityCards, value => value)
    if (!isAllCardsVisible) {
      const showedCards = _.mapValues(visibilityCards, () => true);
      setVisibilityCards({ ...showedCards });
      return;
    }

    const hiddenCards = _.mapValues(visibilityCards, () => false);
    setVisibilityCards({ ...hiddenCards });
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
        <button className="button" type="button" onClick={handleReset}>Reset</button>
        <button className="button" type="button" onClick={handleShowCards}>
          {_.every(visibilityCards, value => value) ? 'Спрятать все карты' : 'Раскрыть все карты'}
        </button>
      </div>
    </div>
  )
}

export default App
