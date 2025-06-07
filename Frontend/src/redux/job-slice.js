import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singlejob: null,
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.alljobs = action.payload;
    },

    setSingleJob :(state, action) =>{
        state.singlejob = action.payload;
    }
  },
});

export const { setAllJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
