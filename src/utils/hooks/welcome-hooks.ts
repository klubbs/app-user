import { useEffect, useState } from 'react';
import { AsyncStorageUtils } from '../async-storage';

export function useWelcomeEnable() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    (async function handleFirstInstall() {
      const first = await AsyncStorageUtils.getHasFirstInstall();

      setWaiting(false);
      setShowWelcome(!first);
    })();
  }, []);

  return {
    isWaitingWelcome: waiting && showWelcome,
    showWelcome: showWelcome && !waiting,
    setShowWelcome,
  };
}
