import { useEffect, useState } from 'react';
import { ITestings } from '../interfaces/ITestings.interface';
import OSApi from '../renderer/os-api';

export const useGovTestings = () => {
  const [govTestingsUpdated, setGovTestingsUpdated] = useState<number>(0);
  const [govTestings, setGovTestings] = useState<ITestings[]>([]);

  const fetch = async () => {
    const res = await OSApi.prisma().testings.findMany({});
    setGovTestings(JSON.parse(JSON.stringify(res)));
  };

  useEffect(() => {
    fetch();
  }, [govTestingsUpdated]);

  const createTestings = (test: ITestings) => {
    OSApi.prisma()
      .testings.create({
        data: JSON.parse(JSON.stringify(test)),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setGovTestingsUpdated((prev) => prev + 1);
  };

  return {
    govTestings,
    createTestings,
  };
};
