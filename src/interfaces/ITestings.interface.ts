interface ITest {
  id: string;
  distance: number;
  landing: number;
}

export interface ITestings {
  id: string;
  govId: string;
  up: ITest[];
  down: ITest[];
  createdAt: Date;
  updatedAt: Date;
}
