// eslint-disable-next-line import/prefer-default-export
import { GoPlusCircle } from 'react-icons/go';

// eslint-disable-next-line import/prefer-default-export
export const DynamicInputButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <GoPlusCircle
      size="25px"
      title="הוסף עוד בדיקה"
      style={{
        position: 'absolute',
        bottom: 0,
        left: -50,
      }}
      onClick={onClick}
    />
  );
};
