import { createContext, useState } from 'react';

export interface Message {
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
};

interface MessageContextProps {
  messages: Message[];
  addMessage: (message: Message) => void;
  removeMessage: (message: Message) => void;
};

export const MessageContext = createContext<MessageContextProps>({ messages: [], addMessage: () => {}, removeMessage: () => {} });

interface MessageProviderProps {};

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    const shouldAdd: boolean = messages.findIndex((m: Message) => m.message === message.message) === -1;
    if (shouldAdd) {
      setMessages((prevMessages) => [...prevMessages, message]);

      const timeout = setTimeout(() => {
        removeMessage(message);
        clearTimeout(timeout);
      }, 5_000);
    }
  };

  const removeMessage = (message: Message) => {
    setMessages(messages.filter((m: Message) => m !== message));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>{children}</MessageContext.Provider>
  );
};