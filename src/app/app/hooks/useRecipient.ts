import { ENDPOINTS } from '@/service/config/endpoint';
import { queryHandler } from '@/service/request';
import { fetchOptions, useAuthGetRequest } from '@/service/swrHooks';
import { RecipientData } from '@/types';
import { RecipientParams } from './types';

const { GET_RECIPIENTS } = ENDPOINTS.CORRESPONDENCE;

function useRecipient(props: RecipientParams) {
  const query = queryHandler({
    recipient: props.recipient,
  });
  const getRecipientsSwr = useAuthGetRequest<RecipientData>(
    query && props.recipient ? GET_RECIPIENTS(query) : '',
    fetchOptions
  );
  return {
    getRecipientsSwr: {
      ...getRecipientsSwr,
      data: getRecipientsSwr.data?.data || ({} as RecipientData),
    },
  };
}

export default useRecipient;
