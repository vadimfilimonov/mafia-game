import cn from 'classnames';
import { ROLE_RED, ROLE_BLACK, ROLE_SHERIFF, ROLE_DON, ROLES_EMOJI } from '../../consts';
import './Card.css'

const Card = ({ role, number, isActive, handleClick }) => {
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
      data-emoji={ROLES_EMOJI[role]}
      onClick={handleClick}
    />
  );
};

export default Card;
