import { Button, Stack } from '@mui/material';
import { TestingList } from './TestingList';
// import {useGovTestings} from "../../../../hooks/useGovTestings.ts";

// eslint-disable-next-line import/prefer-default-export
export const AllTestingSection = () => {
  // const {govTestings} = useGovTestings()

  return (
    <Stack p={2}>
      <TestingList />

      <Button variant="contained">getTestings</Button>
    </Stack>
  );
};
