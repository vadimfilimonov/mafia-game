import cn from 'classnames';
import { ROLE_RED, ROLE_BLACK, ROLE_SHERIFF, ROLE_DON, ROLES_EMOJI } from '../../consts';
import './Card.css'

const Card = ({ role, number, handleRightPartClick, handleLeftPartClick }) => {
  const classNamesList = cn(
    'card',
    {
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
    >
      <div className='card__left-part' onClick={handleLeftPartClick} />
      <div className='card__right-part' onClick={handleRightPartClick} />
    </div>
  );
};

export default Card;
