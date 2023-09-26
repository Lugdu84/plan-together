import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

type PasswordCriteriaProps = {
  password: string;
};

export default function PasswordCriteria({ password }: PasswordCriteriaProps) {
  const criteria = [
    {
      text: 'Au moins une lettre majuscule',
      regex: /[A-Z]/,
    },
    {
      text: 'Au moins un chiffre',
      regex: /\d/,
    },
    {
      text: 'Au moins un caractère spécial (@$!%*?&)',
      regex: /[@$!%*?&]/,
    },
    {
      text: 'Au moins 8 caractères',
      regex: /^.{8,}$/,
    },
  ];

  return (
    <ul>
      {criteria.map((criterion) => (
        <li
          key={criterion.text}
          className={
            criterion.regex.test(password) ? 'text-green-500' : 'text-red-500'
          }
        >
          {' '}
          <FontAwesomeIcon
            icon={criterion.regex.test(password) ? faCheck : faTimes}
            className="mr-2"
          />
          {criterion.text}
        </li>
      ))}
    </ul>
  );
}
