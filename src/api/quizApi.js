import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async ({ url, category }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}${category}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong!");
  }
})