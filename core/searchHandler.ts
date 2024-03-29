import { LoadingState } from "~/types";
import crc from "~/util/crc";

interface SearchHandlerResponse {
  loadingState: LoadingState;
  data?: any;
  errors?: string[];
  bulk?: SearchHandlerResponse[];
}

interface SearchAPIRequest {
  path?: string;
  args?: any;
  cache?: boolean;
  bulk?: SearchAPIRequest[];
}

let cache = {};

export default async function searchHandler(
  body: SearchAPIRequest
): Promise<SearchHandlerResponse> {
  const hash = body.cache ? crc(body) : null;

  if (hash && cache[hash]) return cache[hash];

  try {
    const res = await fetch(`${process.env.SEARCH_API_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    if (data.errors && data.errors.length) {
      console.log(data);
      throw new Error();
    }

    if (data.bulk) {
      for (const _data of data.bulk) {
        if (_data.errors && _data.errors.length) {
          console.log(_data);
          throw new Error();
        }
      }
    }

    const r = {
      ...data,
      loadingState: LoadingState.ready,
    };

    if (hash) cache[hash] = r;

    return r;
  } catch (e) {
    return {
      loadingState: LoadingState.error,
    };
  }
}
