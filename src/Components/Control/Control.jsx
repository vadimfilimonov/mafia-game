import Button from '../Button/Button';
import './Control.css';

const Control = ({ handleClose, handleReset }) => {
  return (
    <div className='control-modal' role='dialog' aria-modal='true' aria-label='Управление'>
      <button
        className='control-modal__backdrop'
        type='button'
        aria-label='Закрыть панель управления'
        onClick={handleClose}
      />
      <div className='control-modal__content'>
        <button
          className='control-modal__close'
          type='button'
          aria-label='Закрыть панель управления'
          onClick={handleClose}
        >
          ×
        </button>
        <Button handleClick={handleReset}>Перемешать</Button>
      </div>
    </div>
  );
};

export default Control;
