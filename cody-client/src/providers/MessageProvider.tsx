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
    setMessages([...messages, message]);
  };

  const removeMessage = (message: Message) => {
    setMessages(messages.filter(m => m !== message));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>{children}</MessageContext.Provider>
  );
};