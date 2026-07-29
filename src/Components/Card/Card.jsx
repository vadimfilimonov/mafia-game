import { ROLES_EMOJI } from '../../consts';
import './Card.css'

const Card = ({ role, number, handleRightPartClick, handleLeftPartClick }) => {
  return (
    <div
      className={`card card--${role}`}
      data-number={number}
      data-emoji={ROLES_EMOJI[role]}
    >
      <div className='card__left-part' onClick={handleLeftPartClick} />
      <div className='card__right-part' onClick={handleRightPartClick} />
    </div>
  );
};

export default Card;
