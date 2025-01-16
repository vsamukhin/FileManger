import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { path: "/", name: "Все файлы" }
];

const breadcrumbsSlice = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    addBreadcrumb: (state, action) => {
      const { path, name } = action.payload;
      state.push({ path: '/' + path, name });
    },
    goBack: (state, action) => {
      const stepsBack = action.payload;
      return state.slice(0, -stepsBack);
    },
    resetBreadcrumbs: () => {
      return initialState;
    }
  }
});

export const { addBreadcrumb, goBack, resetBreadcrumbs } = breadcrumbsSlice.actions;
export const breadcrumbsReducer = breadcrumbsSlice.reducer;
