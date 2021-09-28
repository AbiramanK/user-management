import axios from 'axios';
import { API } from "./../constants";
import { ResponseBodyInterface } from "./../types";

export const getUserFetch = async () => {
  try {
    const response = await axios.get<ResponseBodyInterface>(`${API}/user`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const addUserFetch = async (user: {
  name: string,
  mobileNumber: number | string,
  email: string,
  address: string,
  region: string,
  country: string,
  message: string
}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const data = JSON.stringify({
      name: user.name,
      mobileNumber: user.mobileNumber,
      email: user.email,
      address: user.address,
      region: user.region,
      country: user.country,
      message: user.message
    })

    const response = await axios.post<ResponseBodyInterface>(`${API}/user`, data, { headers: headers });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const updateUserFetch = async (user: {
  _id: string,
  name: string,
  mobileNumber: number | string,
  email: string,
  address: string,
  region: string,
  country: string,
  message: string
}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const data = JSON.stringify({
      _id: user._id,
      name: user.name,
      mobileNumber: user.mobileNumber,
      email: user.email,
      address: user.address,
      region: user.region,
      country: user.country,
      message: user.message
    })

    const response = await axios.put<ResponseBodyInterface>(`${API}/user`, data, { headers: headers });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const removeUserFetch = async (id: any) => {
  try {
    const response = await axios.delete<ResponseBodyInterface>(`${API}/user?id=${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}