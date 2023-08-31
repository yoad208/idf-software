import { Children, cloneElement, FC, isValidElement, ReactNode } from "react";
import { Stack, StackProps, Typography } from '@mui/material';

export interface DynamicInputProps extends StackProps {
  arr: unknown[];
  index?: number;
  children: ReactNode;
}

// eslint-disable-next-line import/prefer-default-export
export const DynamicInput: FC<DynamicInputProps> = ({
  arr,
  children,
  ...rest
}) => {
  return (
    <>
      {arr.map((_, i) => {
        return (
          <Stack {...rest} key={i}>
            <Typography>{i + 1}</Typography>
            {Children.map(children, (child) => {
              return (
                isValidElement(child) &&
                cloneElement(child, {
                  ...child.props,
                  index: i,
                })
              );
            })}
          </Stack>
        );
      })}
    </>
  );
};
