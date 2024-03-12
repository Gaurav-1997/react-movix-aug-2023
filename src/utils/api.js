import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

// const TMBD_TOKEN = import.meta.env.VITE_APP_TMBD_API_TOKEN;
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTg1OGRiYTU3NTI4OWMyYWIyZmVjM2I0YTBiZWU3YSIsInN1YiI6IjY0Y2U5M2JmNTQ5ZGRhMDEzOTMyODgxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YCFlMbpwWM8BXEMBpwIk_Tm9VRzyM3cbtOGk3sE5x3g";
const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const getDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers,
      params: params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
