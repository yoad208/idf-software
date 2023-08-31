import { FormControl, TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';

export type TInput = {
  updateTest: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => void;
  tests: any[];
  name: string;
  label: string;
  index?: number;
};

// eslint-disable-next-line import/prefer-default-export
export const TestInput: FC<TInput> = ({
  updateTest,
  index,
  label,
  name,
  tests,
}) => {
  const value: number = tests[index || 0][name] || 0;

  return (
    <FormControl>
      <TextField
        type="number"
        size="small"
        variant="standard"
        label={label}
        name={name}
        value={value}
        onChange={(e) => updateTest(e, index || 0)}
      />
    </FormControl>
  );
};
