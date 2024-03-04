import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Cookies from "js-cookie";

import { useSelector } from "react-redux";

const initialState = {
  data: [],

  doneScreens: 0,

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

        url: "https://sheets-njt7.onrender.com/validation/day-wise",

        headers: {
          Accept: "*/*",

          Authorization: `Bearer ${jwt}`,

          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(options);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const updateData = createAsyncThunk(
  "packsData/updateData",
  async ({ Ids, stat }, thunkApi) => {
    try {
      var options = {
        method: "PUT",
        url: `https://sheets-njt7.onrender.com/validation/day-wise/${Ids.itemID}/${Ids.userId}/${Ids.templateId}`,
        // "/day-wise/:dayId/:userId/:templateId",
        headers: {
          Accept: "*/*",

          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: stat,
      };

      const response = await axios.request(options);
      return response.data;
    } catch (error) {
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
        url: `https://sheets-njt7.onrender.com/validation/day-wise`,
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
        state.status = "Loading";
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(action);
        state.status = "Error";
        state.errorMessage = "err";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload.data;
        state.doneScreens = action.payload.DoneScreens;
        state.status = "Success";
      })

      .addCase(updateData.fulfilled, (state, action) => {
        const updatedItem = action.payload.data;

        state.data = state.data.map((item) => {
          if (item._id === updatedItem._id) {
            return updatedItem;
          }
          if (item.template_id === updatedItem.template_id) {
            return {
              ...item,
              template_data: {
                ...item.template_data,
                status: updatedItem.template_data.status,
              },
            };
          }
          return item;
        });

        state.modifyStatus = "Success";

        state.doneScreens = action.payload.DoneScreens;
      })
      .addCase(updateData.pending, (state) => {
        state.modifyStatus = "Updating";
      })
      .addCase(updateData.rejected, (state, action) => {
        state.modifyStatus = "Error";
      })
      .addCase(addData.fulfilled, (state, action) => {
        console.log(action);
        const { created_data, user_data, template_data } = action.payload.data;
        state.data = [
          ...state.data,
          { ...created_data, user_data, template_data },
        ];
        state.modifyStatus = "Success";
      })
      .addCase(addData.pending, (state) => {
        state.modifyStatus = "Adding";
      })
      .addCase(addData.rejected, (state, action) => {
        console.log(action);
        // state.status = "Error";
        state.errorMessage = action.payload;
        state.modifyStatus = "Error";
      });
  },
});

export default dataSlice.reducer;
