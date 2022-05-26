import store from "./index";

const baseGetOptions: RequestInit = {
  method: "GET",
};

const basePostOptions: RequestInit = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

class FetchError extends Error {
  public response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

class ResponseTypeError extends FetchError {
  constructor(response: Response) {
    super(`Response content type was not application/json`, response);
  }
}

class JSONParsingError extends FetchError {
  constructor(response: Response) {
    super(`ResponseBody could not be JSON parsed`, response);
  }
}

export async function getRequest<ResponseBody>(
  url: string,
  additionalOptions: RequestInit
) {
  const jwtToken = store.state.authentication.token;
  const authenticationHeaders = new Headers();

  if (jwtToken)
    authenticationHeaders.set("Authorization", `Bearer ${jwtToken}`);

  const requestOptions = Object.assign(
    {},
    baseGetOptions,
    { headers: authenticationHeaders },
    additionalOptions
  );

  const response = await fetch(url, requestOptions);

  if (
    !response.ok ||
    response.headers.get("Content-Type") === "application/json"
  )
    throw new ResponseTypeError(response);

  const body = (await response.json().catch(() => {
    throw new JSONParsingError(response);
  })) as ResponseBody;

  return body;
}

export async function postRequest<ResponseBody>(
  url: string,
  additionalOptions: RequestInit
) {
  const jwtToken = store.state.authentication.token;
  const authenticationHeaders = new Headers();

  if (jwtToken)
    authenticationHeaders.set("Authorization", `Bearer ${jwtToken}`);

  const requestOptions = Object.assign(
    {},
    basePostOptions,
    { headers: authenticationHeaders },
    additionalOptions
  );

  const response = await fetch(url, requestOptions);

  if (
    !response.ok ||
    response.headers.get("Content-Type") === "application/json"
  )
    throw new ResponseTypeError(response);

  const body = (await response.json().catch(() => {
    throw new JSONParsingError(response);
  })) as ResponseBody;

  return body;
}
