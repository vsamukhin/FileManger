import { createSlice } from "@reduxjs/toolkit";
import { IFoelderWithFile, IFolder } from "../../types";
import { RootState } from "../store";
import { createFolder, getFolders, getOneFolder, removeFolder } from "../thunks/folderThunk";


interface FolderState {
  folders: IFolder[],
  folder: IFoelderWithFile |null,
  getFoldersLoading: boolean,
  getOneFolderLoading: boolean,
  createFolderLoading: boolean,
  showFolderModal: boolean,
  removeFolderLoading: boolean,
}

const initialState:FolderState = {
  folders: [],
  folder: null,
  getFoldersLoading: false,
  getOneFolderLoading: false,
  createFolderLoading: false,
  showFolderModal: false,
  removeFolderLoading: false,
};

export const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    showFormFolderModal: (state) => {
      state.showFolderModal = !state.showFolderModal;
    }
  },
  extraReducers: builder => {
    builder.addCase(getFolders.pending, (state) => {
      state.getFoldersLoading = true
    });
    
    builder.addCase(getFolders.fulfilled, (state, {payload: folders}) => {
      state.getFoldersLoading = false;
      state.folders = folders;
    });

    builder.addCase(getFolders.rejected, (state) => {
      state.getFoldersLoading = false;
    });

    builder.addCase(getOneFolder.pending, (state) => { 
      state.getOneFolderLoading = true;
    });

    builder.addCase(getOneFolder.fulfilled, (state, { payload: folder }) => {
      state.getOneFolderLoading = false;
      state.folder = folder;
    });

    builder.addCase(getOneFolder.rejected, (state) => { 
      state.getOneFolderLoading = false;
    });

    builder.addCase(createFolder.pending, (state) => {
      state.createFolderLoading = true;
    });

    builder.addCase(createFolder.fulfilled, (state) => { 
      state.createFolderLoading = false;
    });

     builder.addCase(createFolder.rejected, (state) => { 
      state.createFolderLoading = false;
     });
    
    builder.addCase(removeFolder.pending, (state) => { 
      state.removeFolderLoading = true;
    });

    builder.addCase(removeFolder.fulfilled, (state) => {
      state.removeFolderLoading = false;
    })
    
    builder.addCase(removeFolder.rejected, (state) => { 
      state.removeFolderLoading = false;
    });
  }
});

export const { showFormFolderModal } = folderSlice.actions;
export const folderReducers = folderSlice.reducer;
export const selectFolders = (state: RootState) => state.folders.folders;
export const foldersLoading = (state: RootState) => state.folders.getFoldersLoading;
export const selectFolder = (state: RootState) => state.folders.folder;
export const oneFolderLoading = (state: RootState) => state.folders.getOneFolderLoading;
export const showFolderModal = (state: RootState) => state.folders.showFolderModal;
export const removeFolderLoading = (state: RootState) => state.folders.removeFolderLoading;
