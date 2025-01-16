import { configureStore } from "@reduxjs/toolkit";
import { filesReducers } from "./slices/fileSlice";
import { folderReducers } from "./slices/folderSlice";
import { modalReducer } from "./slices/modalSlice";
import { breadcrumbsReducer } from "./slices/breadcrumbsSlice";


export const store = configureStore({
  reducer: {
    folders: folderReducers,
    files: filesReducers,
    modal: modalReducer,
    breadcrumbs: breadcrumbsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;