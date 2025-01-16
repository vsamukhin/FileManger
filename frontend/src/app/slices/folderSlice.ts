import { createSlice } from "@reduxjs/toolkit";
import { IFoelderWithFile, IFolder } from "../../types";
import { RootState } from "../store";
import { createFolder, getFavoritesFolder, getFolders, getOneFolder, removeFolder } from "../thunks/folderThunk";


interface FolderState {
  currentDir: null | string;
  folders: IFolder[],
  favoritesFolders: IFolder[],
  folder: IFoelderWithFile |null,
  getFoldersLoading: boolean,
  getOneFolderLoading: boolean,
  createFolderLoading: boolean,
  showFolderModal: boolean,
  removeFolderLoading: boolean,
  loadingFavoritesFolder: boolean,
}

const initialState: FolderState = {
  currentDir: null,
  folders: [],
  favoritesFolders: [],
  folder: null,
  getFoldersLoading: false,
  getOneFolderLoading: false,
  createFolderLoading: false,
  showFolderModal: false,
  removeFolderLoading: false,
  loadingFavoritesFolder: false,
};

export const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    showFormFolderModal: (state) => {
      state.showFolderModal = !state.showFolderModal;
    },
    setCurrentDir: (state, actions) => {
      state.currentDir = actions.payload;
    },
    resetCurrentDir: (state) => {
      state.currentDir = null;
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

    builder.addCase(getFavoritesFolder.pending, (state) => { 
      state.loadingFavoritesFolder = true;
    });

    builder.addCase(getFavoritesFolder.fulfilled, (state, action) => { 
      state.loadingFavoritesFolder = false;
      state.favoritesFolders = action.payload;
    });
    
    builder.addCase(getFavoritesFolder.rejected, (state) => { 
      state.loadingFavoritesFolder = false;
    });
  }
});

export const { showFormFolderModal, setCurrentDir, resetCurrentDir } = folderSlice.actions;
export const folderReducers = folderSlice.reducer;
export const selectFolders = (state: RootState) => state.folders.folders;
export const foldersLoading = (state: RootState) => state.folders.getFoldersLoading;
export const selectFolder = (state: RootState) => state.folders.folder;
export const oneFolderLoading = (state: RootState) => state.folders.getOneFolderLoading;
export const showFolderModal = (state: RootState) => state.folders.showFolderModal;
export const removeFolderLoading = (state: RootState) => state.folders.removeFolderLoading;
export const currentDir = (state: RootState) => state.folders.currentDir;
export const loadingFavoritesFolder = (state: RootState) => state.folders.loadingFavoritesFolder;
export const selectFavoritesFolders = (state: RootState) => state.folders.favoritesFolders;

