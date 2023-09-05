import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';
import { IFiberColors, ITestings } from '../interfaces/ITestings.interface';

type TProvider = {
  tests: ITestings;
  setTests: Dispatch<SetStateAction<ITestings>>;
  upTestComplete: boolean;
  setUpTestComplete: Dispatch<SetStateAction<boolean>>;
  downTestComplete: boolean;
  setDownTestComplete: Dispatch<SetStateAction<boolean>>;
};

export const testsProvider = createContext({} as TProvider);

export const TestProvider = ({ children }: { children: ReactNode }) => {
  const [upTestComplete, setUpTestComplete] = useState(false);
  const [downTestComplete, setDownTestComplete] = useState(false);
  const [tests, setTests] = useState<ITestings>({
    id: uuidV4(),
    govId: '',
    up: {
      blue: [],
      orange: [],
      green: [],
      brown: [],
      grey: [],
      white: [],
    } as IFiberColors,
    down: {
      blue: [],
      orange: [],
      green: [],
      brown: [],
      grey: [],
      white: [],
    } as IFiberColors,
  });

  return (
    <testsProvider.Provider
      value={{
        tests,
        setTests,
        upTestComplete,
        setUpTestComplete,
        downTestComplete,
        setDownTestComplete,
      }}
    >
      {children}
    </testsProvider.Provider>
  );
};
