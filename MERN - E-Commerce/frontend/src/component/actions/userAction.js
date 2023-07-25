import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  // FORGOT_PASSWORD_SUCCESS,
  // FORGOT_PASSWORD_REQUEST,
  // FORGOT_PASSWORD_FAIL,
} from "../constant/userConstant";
import axiosInstance from "../axiosInstance";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axiosInstance.post(
      "/login",
      { email, password },
      config
    );
    // const { data } = await axios.post(
    //   `/api/v1/login`,
    //   { email, password },
    //   config
    // );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.message,
        });
    } else {
        // Handle error when server is unreachable
        console.log(error);
        dispatch({
          type: LOGIN_FAIL,
          payload: "Server is unreachable",
        });
    }
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axiosInstance.post("/register", userData, config);
    // const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);
        dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message,
        });
    } else {
        // Handle error when server is unreachable
        console.log(error);
        dispatch({
          type: REGISTER_USER_FAIL,
          payload: "Server is unreachable",
        });
    }
  }
};

export const userLoad = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axiosInstance.get("/me");
    // const { data } = await axios.get(`/api/v1/me`);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: CLEAR_ERRORS,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/logout");
    // await axios.get(`/api/v1/logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const profileUpdate = (userData) => async (dispatch) => {
  const config = { headers: { "Content-type": "application/json" } };
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });
    const { data } = await axiosInstance.put("/me/update", userData, config);
    // const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatePassword = (userData) => async (dispatch) => {
  const config = { headers: { "Content-type": "application/json" } };
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });
    const { data } = await axiosInstance.put("/password/update", userData, config);
    // const { data } = await axios.put(
    //   `/api/v1/password/update`,
    //   passwords,
    //   config
    // );
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ...

