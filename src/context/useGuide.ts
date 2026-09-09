import { useContext } from 'react';
import { GuideContext } from './guide-context-def';

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};
