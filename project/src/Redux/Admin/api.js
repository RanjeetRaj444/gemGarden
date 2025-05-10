import axios from "axios";
// import { NewDataType } from '../../Pages/Admin';
const baseUrl = "https://gem-garden-backenddata.onrender.com/arrival";

export const getProducts = async (data) => {
  const response = await axios
    .get(`${baseUrl}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });

  return response;
};

export const addProduct = (newData) => {
  console.log("adding called");
  console.log(newData, "heres the data");
  axios
    .post(`${baseUrl}`, newData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProducts = (newData, id) => {
  console.log("editing called", newData);
  const response = axios.patch(`${baseUrl}/${id}`, newData).then((res) => {
    console.log(res.data);
  });
  return response;
};
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete product: ${error}`);
  }
};
