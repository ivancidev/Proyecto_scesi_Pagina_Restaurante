import { useState } from 'react';

export const useErrorHandling = () => {
  const [showError, setShowError] = useState(false);

  const handleButtonErrorClick = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  return {
    showError,
    handleButtonErrorClick,
  };
};
