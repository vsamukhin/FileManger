import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { ICreateFileMutation, IEditName, IFile } from "../../types";

export const getFiles = createAsyncThunk(
  'files/getFiles',
  async () => {
    const response = await axiosApi.get<IFile[]>('file');
    return response.data;
  }
);

export const getOneFile = createAsyncThunk<IFile, string>(
  'files/getOneFiles',
  async (id: string) => {
    const response = await axiosApi.get(`file/${id}`);
    return response.data;
  }
);

export const createFile = createAsyncThunk<void, ICreateFileMutation>(
  'files/createFile',
  async (file, {rejectWithValue}) => {
    const formData = new FormData();

    const keys = Object.keys(file) as (keyof ICreateFileMutation)[];

    keys.forEach((key) => {
      const value = file[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axiosApi.post('/file', formData);
      return response.data; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка сервера';
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeFile = createAsyncThunk(
  'files/removeFile',
  async (id: string) => {
    await axiosApi.delete(`file/${id}`);
  }
);

interface IUpdateFile {
  id: string,
  data: IEditName,
}

export const updateFile = createAsyncThunk<void, IUpdateFile>(
  'files/updateFile',
  async (file, {rejectWithValue}) => {
    try {
     const response = await axiosApi.patch(`/file/${file.id}`, file.data);
      return response.data;
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ошибка сервера';
      return rejectWithValue(errorMessage)
    }
  }
);