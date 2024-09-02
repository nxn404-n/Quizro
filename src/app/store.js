import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepageSlice";
import quizReducer from "../features/quizSlice";

const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    quiz: quizReducer,
  }
})

export default store;