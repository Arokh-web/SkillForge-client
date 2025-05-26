import axiosConnection from "./BaseConnection";

// General data fetch
const fetchData = async (method, endpoint, data) => {
  try {
    const res = await axiosConnection({
      method,
      url: endpoint,
      data,
    });
    return res.data;
  } catch (error) {
    // toast.error("Error fetching data.");
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
