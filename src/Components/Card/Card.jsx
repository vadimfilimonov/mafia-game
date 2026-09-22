import { ROLES_EMOJI } from '../../consts';
import './Card.css'

const Card = ({ role, number }) => {
  return (
    <div
      className={`card card--${role}`}
      data-number={number}
      data-emoji={ROLES_EMOJI[role]}
    >
      <div className='card__left-part' />
      <div className='card__right-part' />
    </div>
  );
};

export default Card;
