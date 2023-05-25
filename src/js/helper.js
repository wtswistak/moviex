export const getJSON = async function (url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmY1NGRkN2QxMDE1NmUyNWIyNDliMzAzZWQ0OTUyMyIsInN1YiI6IjY0NjUyZGVmZThkMDI4MDExYmU4ZjM3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q_3z-nY50EMg9fe2e218LYQn6GN-f5783CZKcVIJvlo",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data}`);
    return data;
  } catch (err) {
    throw err;
  }
};
