import { configureStore } from "@reduxjs/toolkit";

import datareducers from "../components/Slice/Slice";

const store = configureStore({
  reducer: {
    data: datareducers,
  },
});
export default store;
