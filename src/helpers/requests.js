export const post = (url, data) => ({
  method: "POST",
  url,
  data
});

export const get = url => ({
  method: "GET",
  url
});
