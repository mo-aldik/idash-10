import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useIsLoggedIn } from 'hooks/use-is-logged-in';
import { TParam, usePageParams } from 'hooks/use-page-params';
import http from './config/http-service';
import { useQueryWrapper } from './config/use-api-wrapper';

const endpoint = 'api/Dashboard/GetMissionCountsForDashboard';
export const getMissionCountsEndpointIdentifier = endpoint;

type TData = Record<string, any>;
type TError = AxiosError;

type TQueryKey = [
  typeof endpoint,
  {
    from: TParam;
    to: TParam;
  },
];
type Options = Omit<UseQueryOptions<unknown, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;
type ReturnType = UseQueryResult<TData, TError>;

export function useGetMissionCountsApi(options?: Options): ReturnType {
  const isLoggedIn = useIsLoggedIn();

  const { getPageParams } = usePageParams();
  const { from, to } = getPageParams();

  const fullEndpoint = `${endpoint}?from=${from}&to=${to}`;

  const queryFn = async () => {
    try {
      const { data } = await http.get(fullEndpoint);

      return data;
    } catch (error: any) {
      if (!error.response.status || !error.response.data.Message) throw error;

      // Important to not show the toast in unauthorized case.
      if (error.response?.status === 401) throw error;

      throw error;
    }
  };

  return useQueryWrapper(
    [
      endpoint,
      {
        from,
        to,
      },
    ],
    queryFn,
    {
      enabled: isLoggedIn,
      ...options,
    },
  );
}
