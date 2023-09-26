export interface IOtdr {
  id: string;
  distance: number;
  landing: number;
}

export interface ITest {
  FiberNumber: number;
  OTDR: IOtdr[];
  CumulativeLanding: number;
  AverageLanding: number;
  end: number;
}

export interface IFiberColors {
  blue?: ITest;
  orange?: ITest;
  green?: ITest;
  brown?: ITest;
  grey?: ITest;
  white?: ITest;
}

export interface ITestings {
  id: string;
  govId: string;
  up: IFiberColors;
  down: IFiberColors;
  createdAt: Date;
  updatedAt: Date;
}
