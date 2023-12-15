import axios from "axios";

const BASE_URL_LOCAL = "http://localhost:8085/api/v1";
const BASE_URL_DEV = "http://agritech.psiborg.io:4002/";

const client = axios.create({ baseURL: BASE_URL_DEV });
const BEARER_TOKEN =
  `Bearer ${JSON.parse(localStorage.getItem("userData"))?.accessToken}` || "";
const TEMP_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZlZjM4NTU0NTdhMjk1OThkNGJlNGYiLCJ1aWQiOiJVU1ItMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTc3MDE5MCwiZXhwIjoxNzAzMDY2MTkwfQ.QEte3mIUZkvqUIzS5VwShWonjGHwDEjnNbDi60Ta7ag"

export const apiRequest = async ({ ...options }) => {
  client.defaults.headers.Authorization = TEMP_TOKEN;

  const onSuccess = (response) => response;
  const onError = (error) => error;

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};




