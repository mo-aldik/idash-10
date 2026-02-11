import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import auth from '../config/auth-service';
import { useMutationWrapper } from '../config/use-api-wrapper';

const endpoint = 'api/Authenticate/Login';
export const loginEndpointIdentifier = endpoint;

type TData = Record<string, any>;
type TError = AxiosError;

type BodyType = {
  userName: string;
  password: string;
  deviceId: string;
};

type TVariables = {
  body: BodyType;
};

type Options = Omit<UseMutationOptions<TData, TError, TVariables, unknown>, 'mutationFn'>;
type ReturnType = UseMutationResult<TData, TError, TVariables>;

export function useLoginApi(options?: Options): ReturnType {
  const mutationFn = async ({ body }: TVariables) => {
    try {
      const { data } = await auth.post(endpoint, body);

      return data;
    } catch (error: any) {
      if (!error.response.status || !error.response.data.message) throw error;

      throw error;
    }
  };

  return useMutationWrapper(mutationFn, { mutationKey: [endpoint], ...options });
}
