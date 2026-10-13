import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';
import { useLanguage } from '../../../i18n';

interface IInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
}

const Input = ({ label, type, register, error }: IInputProps) => {
  const { t } = useLanguage();
  return <fieldset>
    <StyledTextField label={t(label)} type={type} {...register} />
    {error ? (
      <StyledParagraph fontColor='red'>{t(error?.message ?? '')}</StyledParagraph>
    ) : null}
  </fieldset>;
};

export default Input;
