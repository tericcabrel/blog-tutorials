export type DocumentEntity = {
  id: string;
  description: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
  authorId: string;
  folderId: string | null;
  path: string | null;
  size: number | null;
  mimeType: string | null;
};
