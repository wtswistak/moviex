import "dotenv/config";

export const getJSON = async function (url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.AUTH_KEY,
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
