import { useEffect, useState } from 'react';
import _ from 'lodash';
import Button from './Components/Button/Button';
import Card from './Components/Card/Card';
import { GAMES_ROLES, ROLES_EMOJI } from './consts';
import './App.css'

function App() {
  const [roles, setRoles] = useState([]);

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
    const shuffledRoles = _.shuffle(roles);
    setRoles(shuffledRoles);
    localStorage.setItem('roles', JSON.stringify(shuffledRoles));
  };

  return (
    <div className='container'>
      <ol className='roles container__roles'>
        {roles.map((role, index) => <li key={index}>{ROLES_EMOJI[role]}</li>)}
      </ol>
      <div className="cards container__cards">
        {roles.map((role, index) => 
          <Card
          key={index}
          role={role} 
          number={index + 1}
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
