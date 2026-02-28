import { useState } from 'react';
import Card from './Card';
import _ from 'lodash';
import { GAMES_ROLES } from './consts';
import './App.css'

function App() {
  const [roles, setRoles] = useState(GAMES_ROLES);

  const handleShuffle = () => {
    const shuffledRoles = _.shuffle(roles);
    setRoles(shuffledRoles);
  };

  return (
    <>
    <div className="cards">
      {roles.map((role, index) => <Card role={role} number={index + 1} />)}
    </div>
    <div className='toolbar'>
      <button type="button" onClick={handleShuffle}>Перемешать</button>
    </div>
    </>
  )
}

export default App
