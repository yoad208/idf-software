import { Stack } from '@mui/material';
import { Children, cloneElement, FC, isValidElement } from 'react';
import { DynamicInputProps } from './DynamicInput';

type DynamicInputFieldProps = Omit<DynamicInputProps, 'arr'>;

// eslint-disable-next-line import/prefer-default-export
export const DynamicInputField: FC<DynamicInputFieldProps> = ({
  children,
  index,
  ...rest
}) => {
  return (
    <Stack id="testElement" {...rest}>
      {Children.map(children, (child) => {
        return (
          isValidElement(child) &&
          cloneElement(child, {
            ...child.props,
            index,
          })
        );
      })}
    </Stack>
  );
};
