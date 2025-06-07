import axiosConnection from "./BaseConnection";

// General data fetch
const fetchData = async (method, endpoint, data = null) => {
  try {
    const res = await axiosConnection({
      method,
      url: endpoint,
      data,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // toast.error("Error fetching data.");
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
