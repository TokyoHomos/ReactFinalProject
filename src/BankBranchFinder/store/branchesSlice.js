import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  branches: [], // for save branches
  loading: false, // data get state
  error: null, // if make any mistake
};

export const fetchBranches = createAsyncThunk("fetchBranchesApi", async () => {
  const response = await axios.get(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=1c5bc716-8210-4ec7-85be-92e6271955c2&limit=5000"
  );
  console.log(response);
  return response.data.result.records;
});

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    clearBranches: (state) => {
      state.branches = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBranches } = branchesSlice.actions;
export default branchesSlice.reducer;
