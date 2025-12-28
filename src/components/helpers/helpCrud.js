const helpCrud = () => {
  const customFetch = (endpoint, options = {}) => {
  const defaultHeader = { accept: "application/json" };
  const controller = new AbortController();
  options.signal = controller.signal;
  options.method = options.method || "GET";
  options.headers = options.headers
    ? { ...defaultHeader, ...options.headers }
    : defaultHeader;

  if (options.body) options.body = JSON.stringify(options.body);
  else delete options.body;

  setTimeout(() => controller.abort(), 3000);

  return fetch(endpoint, options)
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrió un error",
          })
    )
    .catch((err) => {
      if (err.name === "AbortError") {
        return { err: true, message: "Request timeout" };
      }
      return { err: true, message: err.message || "Network error" };
    });
};


  const get = (url, options = {}) => customFetch(url, options);
  const post = (url, options = {}) => customFetch(url, { ...options, method: "POST" });
  const put = (url, options = {}) => customFetch(url, { ...options, method: "PUT" });
  const del = (url, options = {}) => customFetch(url, { ...options, method: "DELETE" });

  return { get, post, put, del };
};

export default helpCrud;
