const httpService = {
  get: async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  },
  post: async (url, data, options = {}) => {
    try {
      return await fetch(url, {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        ...options,
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default Object.freeze(httpService);
