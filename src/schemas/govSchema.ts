import * as Yup from 'yup';

export const coordinateSchema = Yup.object().shape({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

export const tubeSchema = Yup.object().shape({
  _id: Yup.string().required(),
  color: Yup.string().required(),
  tube_No: Yup.number().required(),
  OTDR: Yup.number().required(),
});

export const govSchema = Yup.object().shape({
  _id: Yup.string().required(),
  title: Yup.string().required(),
  identity_No: Yup.number().required(),
  fiber_No: Yup.number().required(),
  location: coordinateSchema,
  tubes: Yup.object().shape({
    left: Yup.array().of(tubeSchema),
    right: Yup.array().of(tubeSchema),
  }),
  OTDR: Yup.number().required(),
});
