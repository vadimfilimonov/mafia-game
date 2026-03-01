import './Button.css';

const Button = ({ children, handleClick }) => {
  return (
    <button 
      className="button" 
      type="button" 
      onClick={handleClick}>
        {children}
    </button>
  );
};

export default Button;
