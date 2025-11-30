const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000';
const API_ENDPOINT = `${API_HOST}/api/v1/file/upload`;

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return await response.json();
};