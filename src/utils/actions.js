"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
const url = "http://localhost:3000/api/users";
export const POST = async (formData) => {
  try {
    const response = await axios.post(url, formData);
    // Return the response data if the request is successful
    return {
      success: true,
      data: response,
    };
  } catch ({ response }) {
    return {
      success: false,
      data: response ? response?.data?.error : "Something went wrong",
    };
  }
};
export const GET = async () => {
  try {
    const response = await axios.get(url);
    // Return the response data if the request is successful
    return {
      success: true,
      data: response,
    };
  } catch ({ response }) {
    return {
      success: false,
      data: response ? response?.data?.error : "Something went wrong",
    };
  }
};

export const Update = async (id, formData) => {
  try {
    const response = await axios.put(`${url}/update/${id}`, formData);
    // Return the response data if the request is successful
    return {
      success: true,
      data: response,
    };
  } catch ({ response }) {
    return {
      success: false,
      data: response ? response?.data?.error : "Something went wrong",
    };
  }
};

export const GetById = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    // Return the response data if the request is successful
    return {
      success: true,
      data: response,
    };
  } catch ({ response }) {
    return {
      success: false,
      data: response ? response?.data?.error : "Something went wrong",
    };
  }
};
export const DELETE = async (id) => {
  try {
    const response = await axios.delete(`${url}/delete/${id}`);
    // Return the response data if the request is successful
    return {
      success: true,
      data: response,
    };
  } catch ({ response }) {
    return {
      success: false,
      data: response ? response?.data?.error : "Something went wrong",
    };
  }
};

export const useRedirect = () => {
  const router = useRouter();

  const redirectToUrl = (url) => {
    router.push(url);
  };

  return redirectToUrl;
};