import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import '../styles/svg-animations.scss';

interface CountDownCloseButtonProps {
  onClick: () => void;
};

export const CountDownCloseButton: React.FC<CountDownCloseButtonProps> = ({ onClick }) => {
  return (
    <Button size='small' onClick={onClick}>
      <FontAwesomeIcon icon={faTimes} />
      <svg className='countdown-circle' viewBox='0 0 100 100'>
        <circle r="18" cx="20" cy="20"></circle>
      </svg>
    </Button>
  );
};