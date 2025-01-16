
export interface IFolder {
  id: string;
  createdAT: string;
  updatedAt: string;
  name: string;
  parentId: string | null;
  favorites: boolean;
}

export interface IFile {
  id: string;
  createdAT: string;
  updatedAt: string;
  name: string;
  path: string;
  folderId: string | null;
  extension: string;
  favorites: boolean;
}

export interface IFoelderWithFile extends IFolder {
  files: IFile[];
  subfolders: IFoleder[];
}

export interface ICreateFolder {
  name: string;
  parentId: string | null;
}

export interface ICreateFile {
  name: string;
  folderId: string | null;
  file: File | null;
}
  
export interface IUpdateFileFields{
  name?: string
  folderId?: string;
  favorites?: boolean;
};

export interface IUpdateFolderFields{
  name?: string
  parentId?: string;
  favorites?: boolean;
};


interface IUpdateFolder {
  id: string,
  data: IUpdateFolderFields,
}

export interface IUpdateFile {
  id: string,
  data: IUpdateFileFields,
}