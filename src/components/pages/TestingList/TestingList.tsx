import { IconButton, InputBase, Stack } from '@mui/material';
import { ITestings } from 'interfaces/ITestings.interface';
import { useSearchParams } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useGovTestings } from '../../../hooks/useGovTestings';
import { GovTestCard } from './govTestCard';
import { DataNotFound } from '../../utils/DataNotFound';
import { useGovs } from '../../../hooks/useGovs';

export const TestingList = () => {
  const { govTestings } = useGovTestings();
  const { govs } = useGovs();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currTestings, setCurrTestings] = useState<ITestings[]>([]);

  useEffect(() => {
    if (searchParams.get('q') === '') {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
    setCurrTestings(
      !searchParams.has('q')
        ? govTestings
        : govTestings.filter((govTest) => {
            return govTest.govId === searchParams.get('q');
          })
    );
  }, [govTestings, searchParams, setSearchParams]);

  const handleSearch = () => {
    if (!searchParams.has('q')) return;
    const govId = govs.find((gov) => {
      return (
        gov.gov_name === searchParams.get('q') ||
        gov.place_description === searchParams.get('q')
      );
    });

    setCurrTestings(() =>
      govTestings.filter((govTest) => {
        return govTest.govId === govId?.id;
      })
    );
  };

  return (
    <Stack
      spacing={1}
      sx={{
        overflow: 'auto',
        overflowY: '-moz-hidden-unscrollable',
        '&::-webkit-scrollbar': { display: 'none' },
        height: '100%',
        maxHeight: '100vh',
        width: '100%',
      }}
    >
      <Stack
        direction="row-reverse"
        alignItems="center"
        spacing={2}
        p={1}
        bgcolor="white"
        borderRadius={2}
      >
        <IconButton onClick={handleSearch}>
          <BiSearchAlt />
        </IconButton>
        <InputBase
          sx={{ borderBottom: '1px solid grey' }}
          placeholder="חפש לפי שם / פירוט מיקום"
          onChange={(e) => {
            if (!searchParams.has('q')) {
              searchParams.append('q', e.target.value);
              setSearchParams(searchParams);
            } else {
              searchParams.set('q', e.target.value);
              setSearchParams(searchParams);
            }
          }}
        />
      </Stack>
      {currTestings.length > 0 ? (
        currTestings.map((govTest: ITestings) => {
          return <GovTestCard govTest={govTest} key={govTest.id} />;
        })
      ) : (
        <DataNotFound />
      )}
    </Stack>
  );
};
