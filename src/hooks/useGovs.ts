import { useEffect, useState } from 'react';
import { IGov } from '../interfaces/IGov.interface';
import OSApi from '../renderer/os-api';

export const useGovs = () => {
  const [govsLength, setGovsLength] = useState<number>(0);
  const [govs, setGovs] = useState<IGov[]>([]);

  const fetch = async () => {
    const res = await OSApi.prisma().govs.findMany({});
    setGovs(JSON.parse(JSON.stringify(res)));
  };

  useEffect(() => {
    fetch();
  }, [govsLength]);

  const createGov = async (gov: IGov) => {
    await OSApi.prisma()
      .govs.create({
        data: JSON.parse(JSON.stringify(gov)),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setGovsLength((prev) => prev + 1);
  };

  return {
    govsLength,
    govs,
    createGov,
  };
};
