import React, { useState } from 'react';
import LoadingContext from './LoadingContext';

type LoadingProviderProps = {
  children: React.ReactNode;
};

export type ProviderValues = {
  isLoadingName: boolean,
  changeIsloadingName : (value: boolean) => void,
};

function IsLoadingProvider({ children }: LoadingProviderProps) {
  const [isLoadingName, setIsLoading] = useState(false);

  const changeIsloadingName = (value: boolean) => {
    setIsLoading(value);
  };

  const values: ProviderValues = {
    isLoadingName,
    changeIsloadingName,
  };
  return (
    <LoadingContext.Provider value={ values }>
      {children}
    </LoadingContext.Provider>
  );
}

export default IsLoadingProvider;
