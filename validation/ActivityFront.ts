import * as Yup from 'yup';

const ActivitySchema = Yup.object().shape({
  title: Yup.string().min(3, 'Faut plus long cousin'),
  location: Yup.string(),
  type: Yup.string(),
  date: Yup.date().min(new Date(), 'PLus long cousin'),
});

export default ActivitySchema;
