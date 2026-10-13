import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormValues } from '../../../providers/UserContext/@types';
import { UserContext } from '../../../providers/UserContext/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { useLanguage } from '../../../i18n';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>();
  const { userLogin } = useContext(UserContext);
  const { t } = useLanguage();

  const submit: SubmitHandler<ILoginFormValues> = (formData) => {
    userLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label='Seu e-mail'
        type='email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        label='Sua senha'
        type='password'
        register={register('password')}
        error={errors.password}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        {t('Entrar')}
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
