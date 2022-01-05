import { Box, Modal } from "@mui/material";
import '../styles/modal.scss';

interface CodyModalProps {
  isOpen: boolean;
  onClose: () => void;
};

export const CodyModal: React.FC<CodyModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className='modal'>
        {children}
      </Box>
    </Modal>
  );
};
