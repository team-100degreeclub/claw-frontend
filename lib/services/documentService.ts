
import apiClient from "@/lib/apiClient";

export interface DocumentType {
  id: string;
  document_type_code: string;
  document_name: string;
}

export const getDocumentTypes = async (): Promise<DocumentType[]> => {
  const response = await apiClient.get("/document-types");
  return response.data;
};
