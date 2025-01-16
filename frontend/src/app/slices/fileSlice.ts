import { createSlice } from "@reduxjs/toolkit";
import { IFile } from "../../types";
import { RootState } from "../store";
import { createFile, getFavoritesFiles, getFiles, getOneFile, removeFile, updateFile } from "../thunks/fileThunk";

interface FilesState {
  files: IFile[],
  favoritesFile: IFile[],
  file: IFile | null,
  getOneFileLoading: boolean,
  getFilesLoading: boolean,
  createFileLoading: boolean,
  showSidebar: boolean,
  showCreateFileModal: boolean,
  removeFileLoading: boolean,
  updateFileLoading: boolean,
  loadingFavoritesFile: boolean,
  error: string | null,
  fileView: string;
}

const initialState: FilesState = {
  files: [],
  favoritesFile: [],
  file: null,
  getOneFileLoading: false,
  getFilesLoading: false,
  createFileLoading: false,
  showSidebar: true,
  showCreateFileModal: false,
  removeFileLoading: false,
  updateFileLoading: false,
  loadingFavoritesFile: false,
  error: null,
  fileView: 'plate',
}

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    showFormFileModal: (state) => {
      state.showCreateFileModal = !state.showCreateFileModal;
    },
    resetErrors: (state) => {
      state.error = null;
    },
    showSidebarMenu: (state) => {
      state.showSidebar = !state.showSidebar;
    }, 
    setFileView: (state, action) => {
      state.fileView = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getFiles.pending, (state) => {
      state.getFilesLoading = true;
    });

    builder.addCase(getFiles.fulfilled, (state, {payload: files}) => {
      state.getFilesLoading = false;
      state.files = files;
     });
    
    builder.addCase(getFiles.rejected, (state) => {
      state.getFilesLoading = false;
    });

    builder.addCase(getOneFile.pending, (state) => { 
      state.getOneFileLoading = true;
    });

    builder.addCase(getOneFile.fulfilled, (state, { payload: file }) => { 
      state.getOneFileLoading = false;
      state.file = file;
    });

    builder.addCase(getOneFile.rejected, (state) => { 
      state.getOneFileLoading = false;
    });

    builder.addCase(createFile.pending, (state) => {
      state.createFileLoading = true;
    });

     builder.addCase(createFile.fulfilled, (state) => {
       state.createFileLoading = false;
     });
    
     builder.addCase(createFile.rejected, (state, action) => {
       state.createFileLoading = false;
       state.error = action.payload as string;
     });
    
    builder.addCase(removeFile.pending, (state) => {
      state.removeFileLoading = true;
    });

    builder.addCase(removeFile.fulfilled, (state) => { 
      state.removeFileLoading = false;
    });

    builder.addCase(removeFile.rejected, (state) => { 
      state.removeFileLoading = false;
    });

    builder.addCase(updateFile.pending, (state) => { 
      state.updateFileLoading = true;
    });

    builder.addCase(updateFile.fulfilled, (state) => { 
      state.updateFileLoading = false;
    });
    
    builder.addCase(updateFile.rejected, (state,action) => { 
      state.updateFileLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getFavoritesFiles.pending, (state) => { 
      state.loadingFavoritesFile = true;
    });

    builder.addCase(getFavoritesFiles.fulfilled, (state, action) => { 
      state.loadingFavoritesFile = false;
      state.favoritesFile = action.payload;
    });

    builder.addCase(getFavoritesFiles.rejected, (state) => { 
      state.loadingFavoritesFile = false;
    });
  }
});

export const { showFormFileModal, resetErrors, showSidebarMenu, setFileView } = filesSlice.actions;
export const filesReducers = filesSlice.reducer;
export const selectFiles = (state: RootState) => state.files.files;
export const getFilesLoading = (state: RootState) => state.files.getFilesLoading;
export const selectFile = (state: RootState) => state.files.file;
export const getOneLoading = (state: RootState) => state.files.getOneFileLoading;
export const createFileLoading = (state: RootState) => state.files.createFileLoading;
export const showCreateFileModal = (state: RootState) => state.files.showCreateFileModal;
export const removeFileLoading = (state: RootState) => state.files.removeFileLoading;
export const selectError = (state: RootState) => state.files.error;
export const showSidebar = (state: RootState) => state.files.showSidebar;
export const fileView = (state: RootState) => state.files.fileView;
export const loadingFavoritesFile = (state: RootState) => state.files.loadingFavoritesFile;
export const selectFavoritesFiles = (state: RootState) => state.files.favoritesFile;