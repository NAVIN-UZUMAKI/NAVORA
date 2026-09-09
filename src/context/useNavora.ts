import { useContext } from 'react';
import { NavoraContext } from './navora-context-def';

export const useNavora = () => {
  const context = useContext(NavoraContext);
  if (!context) {
    throw new Error('useNavora must be used within a NavoraProvider');
  }
  return context;
};
