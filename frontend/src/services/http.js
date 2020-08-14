const httpService = {
  get: async (url) => {
    try {
      const response = await fetch(url);
      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (err) {
      console.log(err);
    }
  },
  post: (url, data, options = {}) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...options,
      body: JSON.stringify(data),
    });
  },
};

export default Object.freeze(httpService);
