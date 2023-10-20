export function decodeParamsWithSpaces(params) {
  const decodedParams = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      decodedParams[key] = decodeURIComponent(params[key].replace(/\+/g, " "));
    }
  }

  return decodedParams;
}
