
import apiClient from "@/lib/apiClient";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

interface InitUploadResponse {
  upload_session_id: string;
  chunk_size: number;
}

export const initUpload = async (
  campId: string
): Promise<InitUploadResponse> => {
  const response = await apiClient.post("/videos/init-upload", {
    camp_id: campId,
  });
  return response.data;
};

export const uploadChunk = async (
  sessionId: string,
  chunk: Blob,
  start: number,
  totalSize: number
): Promise<any> => {
  const end = start + chunk.size - 1;
  const contentRange = `bytes ${start}-${end}/${totalSize}`;

  const response = await apiClient.post("/videos/upload-chunk", chunk, {
    headers: {
      "Upload-Session-Id": sessionId,
      "Content-Range": contentRange,
      "Content-Type": "application/octet-stream",
    },
  });

  return response.data;
};

interface FinalizeUploadResponse {
  youtube_video_id: string;
  video_duration: number;
  overlay_start_time: number;
}

export const finalizeUpload = async (
  sessionId: string
): Promise<FinalizeUploadResponse> => {
  const response = await apiClient.post("/videos/finalize", {
    upload_session_id: sessionId,
  });
  return response.data;
};

export const finalizeCancellation = async (
  sessionId: string,
  message: string
): Promise<any> => {
  const response = await apiClient.post("/videos/finalize-cancellation", {
    upload_session_id: sessionId,
    message: message,
  });
  return response.data;
}

export const handleFileUpload = async (
  file: File,
  campId: string,
  onProgress: (progress: number) => void
): Promise<FinalizeUploadResponse> => {
  try {
    // 1. Initialize upload
    const { upload_session_id: sessionId } = await initUpload(
      campId
    );

    // 2. Upload chunks
    const totalSize = file.size;
    let start = 0;

    while (start < totalSize) {
      const chunk = file.slice(start, start + CHUNK_SIZE);
      await uploadChunk(sessionId, chunk, start, totalSize);
      start += chunk.size;
      const progress = Math.round((start / totalSize) * 100);
      onProgress(progress);
    }

    // 3. Finalize upload
    const finalizeResponse = await finalizeUpload(sessionId);
    onProgress(100);
    return finalizeResponse;
  } catch (error) {
    console.error("Error uploading file:", error);
    onProgress(0); // Reset progress on error
    throw error;
  }
};

export const handleCancellationUpload = async (
  file: File,
  campId: string,
  message: string,
  onProgress: (progress: number) => void
): Promise<any> => {
  try {
    // 1. Initialize upload
    const { upload_session_id: sessionId } = await initUpload(
      campId
    );

    // 2. Upload chunks
    const totalSize = file.size;
    let start = 0;

    while (start < totalSize) {
      const chunk = file.slice(start, start + CHUNK_SIZE);
      await uploadChunk(sessionId, chunk, start, totalSize);
      start += chunk.size;
      const progress = Math.round((start / totalSize) * 100);
      onProgress(progress);
    }

    // 3. Finalize cancellation
    const finalizeResponse = await finalizeCancellation(sessionId, message);
    onProgress(100);
    return finalizeResponse;
  } catch (error) {
    console.error("Error uploading file:", error);
    onProgress(0);
    throw error;
  }
}
