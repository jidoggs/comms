import { useSWRConfig } from 'swr';

function useCache() {
  const cache = useSWRConfig().cache;
  const cachedData = cache as any;

  const mappedData = Object.fromEntries(cachedData?.entries());

  function extractData(): Record<string, any> {
    const vals: Record<string, any> = {};

    for (const key in mappedData) {
      vals[key] = mappedData[key]?.data?.data;
    }

    return vals;
  }

  const data = extractData();

  return {
    cachedData: data,
  };
}
export default useCache;
