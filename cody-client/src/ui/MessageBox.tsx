import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { Message, MessageContext } from '../providers/MessageProvider';
import { CountDownCloseButton } from './CountDownCloseButton';
import { useTranslation } from 'react-i18next';

interface MessageBoxProps { }

export const MessageBox: React.FC<MessageBoxProps> = () => {

  const { messages, addMessage, removeMessage } = useContext(MessageContext);
  const { t } = useTranslation();

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={!!messages.length}>
      <div>
        {messages.map((message: Message) => (
          <Alert
            severity={message.severity.toLowerCase() as AlertColor}
            action={<CountDownCloseButton onClick={() => removeMessage(message)} />}
            key={message.message}
          >
            {t(message.message)}
          </Alert>
        ))}
      </div>
    </Snackbar>
  );
};