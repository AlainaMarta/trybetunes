import { createContext } from 'react';

type LoadingContextType = {
  isLoadingName : boolean,
  changeIsloadingName : (value: boolean) => void,
};

const LoadingContext = createContext({} as LoadingContextType);

export default LoadingContext;
