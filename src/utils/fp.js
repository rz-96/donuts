const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);

/**
 * Request
 */

const liftedFetch = async ({
  body,
  includeCredentials = false,
  method = 'GET',
  route,
  token,
}) =>
  /* istanbul ignore next */
  await fetch(route, {
    ...(method !== 'GET' && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `${token}` }),
    },
    method,
    ...(includeCredentials && { credentials: 'include' }),
  });

const toJson = async response => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const request = asyncPipe(liftedFetch, toJson);

export { asyncPipe, request, toJson };
