const baseGetHeaders = new Headers();
baseGetHeaders.set("Content-Type", "application/json");

const baseGetOptions: RequestInit = {
  headers: baseGetHeaders,
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
  options: RequestInit
) {
  const response = await fetch(url, Object.assign({}, baseGetOptions, options));

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
