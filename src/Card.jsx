import React, { useState } from 'react';
import cn from 'classnames';
import { ROLE_RED, ROLE_BLACK, ROLE_SHERIFF, ROLE_DON } from './consts';
import './Card.css'

const Card = ({ role, number }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const classNamesList = cn(
    'card', 
    { 
      'card--active': isActive,
      'card--closed': !isActive,
      'card--red': role === ROLE_RED,
      'card--black': role === ROLE_BLACK,
      'card--sheriff': role === ROLE_SHERIFF,
      'card--don': role === ROLE_DON,
    }
  );

  return (
    <div
      className={classNamesList}
      data-number={number}
      onClick={handleClick}
    />
  );
};

export default Card;
