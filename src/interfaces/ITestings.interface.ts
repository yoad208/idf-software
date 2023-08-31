export interface ITest {
  id: string;
  distance: number;
  landing: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFiberColors {
  blue: ITest[];
  orange: ITest[];
  green: ITest[];
  brown: ITest[];
  grey: ITest[];
  white: ITest[];
}

export interface ITestings {
  id: string;
  govId: string;
  up: IFiberColors;
  down: IFiberColors;
}
