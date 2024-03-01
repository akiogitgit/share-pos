import {Cookies} from 'react-cookie';
import {type Res} from 'types/response';
import {decrypted} from './encrypt';
import {isEmptyObj} from './isEmptyObj';
import {toCamelCaseObj} from './toCamelCaseObj';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// Export const BASE_URL = 'http://localhost:3001/api/v1'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class HttpError extends Error {
  url: string;
  status: number;
  message: string;
  constructor(response: Response, resJson?: Res<any>) {
    super();
    this.name = 'HttpError';
    this.url = response.url;
    this.status = response.status;
    this.message = resJson?.message || '';
  }
}

export const fetchApi = async <T>(
  url: string,
  method: Method,
  parameters?: Record<string, any>,
  headers?: Record<string, string>,
): Promise<T> => {
  let requestUrl = url;
  let requestParameters = {...parameters};
  const requestHeaders = headers || {};
  const cookie = new Cookies();

  // 暗号化されたtokenをCookieから取得して複合化してheaderに格納
  // 以前はtokenをRailsがCookieにセットしていたが、端末がスマホだとセットされない。
  // 代わりにfetchApiを使うたびに、headerにtokenを手動で入れた
  if (cookie.get('token')) {
    const token = decrypted(cookie.get('token'));
    requestHeaders.Authorization = `Token ${token}`;
  }

  if (
    method === 'GET' // /example/1 -> /example/1?searchWord="あああ"
    && !isEmptyObj(requestParameters)
  ) {
    requestUrl += `?${Object.entries(requestParameters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`;
    requestParameters = {};
  }

  if (!isEmptyObj(requestParameters)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  let result: Res<Record<string, unknown>> | undefined;
  try {
    const res = await fetch(encodeURI(`${BASE_URL}${requestUrl}`), {
      method,
      body: isEmptyObj(requestParameters)
        ? undefined
        : JSON.stringify(requestParameters),
      headers: {...requestHeaders},
    });

    if (!res.ok) {
      const json = (await res.json()) as Res<any>;
      throw new HttpError(res, json);
    }

    result = await res.json();
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    console.error(error);
  }

  return (result ? toCamelCaseObj(result).data : result) as unknown as T;
};

export const getApi = async <Data>(
  url: string,
  parameters?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'GET', parameters, headers);

export const postApi = async <Data>(
  url: string,
  parameters?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'POST', parameters, headers);

export const putApi = async <Data>(
  url: string,
  parameters?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'PUT', parameters, headers);

export const deleteApi = async <Data>(
  url: string,
  parameters?: any,
  headers?: Record<string, string>,
) => fetchApi<Data>(url, 'DELETE', parameters, headers);
