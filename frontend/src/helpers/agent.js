const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export const agent = {
  getPlantLastReading: () => {
    return fetch(`${apiUrl}/plants/last`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
