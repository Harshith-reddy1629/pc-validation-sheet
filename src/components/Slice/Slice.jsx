import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  data: [],
  status: "initial",
  modifyStatus: "initial",
  errorMessage: "",
};

const jwt = Cookies.get("jwt_token");

export const fetchData = createAsyncThunk(
  "packsData/fetchData",
  async (_, thunkApi) => {
    try {
      var options = {
        method: "GET",
        url: "https://sheets-njt7.onrender.com/validation",
        headers: {
          Accept: "*/*",

          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateData = createAsyncThunk(
  "packsData/updateData",
  async ({ itemId, newStat }, thunkApi) => {
    try {
      var options = {
        method: "PUT",
        url: `https://sheets-njt7.onrender.com/validation/${itemId}`,
        headers: {
          Accept: "*/*",

          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: newStat,
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);
export const addData = createAsyncThunk(
  "packsData/addData",
  async (data, thunkApi) => {
    try {
      var options = {
        method: "POST",
        url: `https://sheets-njt7.onrender.com/validation/`,
        headers: {
          Accept: "*/*",

          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data,
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

const dataSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        console.log("load");
        state.status = "Loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "Success";
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(updateData.fulfilled, (state, action) => {
        console.log(state);

        state.data = state.data.map((item) => {
          if (item._id === action.meta.arg.itemId) {
            return { ...item, ...action.meta.arg.newStat };
          }
          return item;
        });

        state.modifyStatus = "Success";
        console.log(state);
      })
      .addCase(updateData.pending, (state) => {
        state.modifyStatus = "Updating";
      })
      .addCase(updateData.rejected, (state) => {
        state.modifyStatus = "Error";
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
        state.modifyStatus = "Success";
      })
      .addCase(addData.pending, (state) => {
        state.modifyStatus = "Adding";
      })
      .addCase(addData.rejected, (state, action) => {
        console.log("aaa", action.payload);
        state.modifyStatus = "Error";
      });
  },
});

export const getAllData = (state) => state.data;
export const status = (state) => state.status;

export default dataSlice.reducer;
