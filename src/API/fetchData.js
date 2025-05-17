import axiosConnection from "./BaseConnection";

const fetchData = async (method, endpoint) => {
  try {
    const res = await axiosConnection({
      method,
      url: endpoint,
    });
    return res.data;
  } catch (error) {
    // toast.error("Error fetching data.");
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
