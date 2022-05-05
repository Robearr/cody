import { useContext, useState } from 'react';
import { useTypedSelector } from './useTypedSelector';
import { MessageContext } from '../providers/MessageProvider';
import { useTranslation } from 'react-i18next';

export const useAjax = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { addMessage } = useContext(MessageContext);
  const { token } = useTypedSelector((state) => state.keycloak);

  const { t } = useTranslation();

  const request = (url: string, options?: RequestInit): Promise<any> => {
    setLoading(true);
    const tempOptions = Object.assign({}, options);
    const additionalHeaders = tempOptions?.headers;
    delete tempOptions.headers;

    return fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${token ?? ''}`,
        'Content-Type': 'application/json',
        'Accept-Language': 'hu',
        ...additionalHeaders
      },
      ...tempOptions
    }).then(
      (res) => {
        return res.json().then((json: any) => {
          // TODO messages
          return Promise.resolve(json);
        });
      }
    ).catch(
      (err: Error) => {
        addMessage({ severity: 'ERROR', message: t('exceptions.unexpectedSaveException') });
        return Promise.reject(null);
      }
    ).finally(
      () => {
        setLoading(false);
      }
    );
  };

  const ajax = {
    get: (url: string, options?: RequestInit): Promise<any> => {
      return request(url, options);
    },
    post: (url: string, body: Record<string, any>, options?: RequestInit): Promise<any> => {
      return request(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body)
      });
    },
  };

  return {
    ajax,
    isLoading
  };

}