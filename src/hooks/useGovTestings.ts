import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { ITestings } from '../interfaces/ITestings.interface';

export const useGovTestings = () => {
  const [govTestingsUpdated, setGovTestingsUpdated] = useState<number>(0);
  const [govTestings, setGovTestings] = useState<ITestings[]>([]);

  useEffect(() => {
    ipcRenderer.invoke('get-gov-testings').then(() => {
      ipcRenderer.on('all-gov-testings', (_, testings) => {
        console.log(testings);
        setGovTestings(testings);
      });
    });
  }, [govTestingsUpdated]);

  const createTestings = () => {
    setGovTestingsUpdated((prev) => prev + 1);
  };

  return {
    govTestings,
    createTestings,
  };
};
