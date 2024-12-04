import { configureStore } from "@reduxjs/toolkit";
import { filesReducers } from "./slices/fileSlice";
import { folderReducers } from "./slices/folderSlice";


export const store = configureStore({
  reducer: {
    folders: folderReducers,
    files: filesReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;