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

export class ResponseTypeError extends FetchError {
  constructor(response: Response) {
    super(`Response content type was not application/json`, response);
  }
}

export class JSONParsingError extends FetchError {
  constructor(response: Response) {
    super(`ResponseBody could not be JSON parsed`, response);
  }
}

interface ControllerStorage {
  [key: string]: AbortController;
}

const controllerStorage: ControllerStorage = {};

export async function getRequest<ResponseBody>(
  url: string,
  additionalOptions: RequestInit = {}
) {
  const startUrl = url.split("?")[0];
  const abortController = controllerStorage[startUrl];

  // If we've already created a control we'll abort the previous request
  if (abortController) {
    abortController.abort();
  }

  // Create a new controller for the next request
  controllerStorage[startUrl] = new AbortController();

  const jwtToken = store.state.authentication.token;
  const authenticationHeaders = new Headers();

  if (jwtToken) {
    authenticationHeaders.set("Authorization", `Bearer ${jwtToken}`);
  }

  const requestOptions = {
    ...baseGetOptions,
    ...additionalOptions,
    headers: authenticationHeaders,
    signal: controllerStorage[startUrl]?.signal,
  };

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
  additionalOptions: RequestInit = {}
) {
  const jwtToken = store.state.authentication.token;
  const authenticationHeaders = new Headers();

  if (jwtToken) {
    authenticationHeaders.set("Authorization", `Bearer ${jwtToken}`);
  }

  authenticationHeaders.set("Content-Type", "application/json");

  const requestOptions = {
    ...basePostOptions,
    ...additionalOptions,
    headers: authenticationHeaders,
  };

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
