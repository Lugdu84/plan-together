import * as Yup from 'yup';

const ActivitySchema = Yup.object().shape({
  title: Yup.string(),
  location: Yup.string(),
  type: Yup.string(),
  date: Yup.date(),
  picture: Yup.string(),
  description: Yup.string(),
  status: Yup.string(),
});

export default ActivitySchema;
