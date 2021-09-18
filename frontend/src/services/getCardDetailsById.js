import axiosInstance from "./axiosInstance";

export const getCardDetailsById = async (id) => {
  try {
    const res = await axiosInstance.get(`/card/${id}`, {
      data: null,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { getCardDetailsById };
