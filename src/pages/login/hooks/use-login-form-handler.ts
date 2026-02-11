import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginApi } from 'apis/auth/use-login-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys, URL } from 'utils/constants';
import * as yup from 'yup';

type FormValues = {
  username: string;
  password: string;
};

// Validation Schema
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const useLoginFormHandler = () => {
  const { isPending: isLoadingSendLogin, mutate: sendLogin } = useLoginApi();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const variables = {
      body: {
        userName: data?.username,
        password: data?.password,
        deviceId: 'web',
      },
    };

    sendLogin(variables, {
      onSuccess: (data) => {
        localStorage.setItem(LocalStorageKeys.access_token, data?.token);
        navigate(URL.HOME);
      },
    });
  };

  return {
    errors,
    handleSubmit,
    register,
    onSubmit,
    isLoadingSendLogin,
    control,
  };
};
