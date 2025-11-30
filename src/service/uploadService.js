export async function uploadFileService(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:9000/api/v1/file/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return await res.json(); // return server response
  } catch (err) {
    throw err;
  }
}
export async function getUploadedFiles() {
  try {
    const res = await fetch("http://localhost:9000/api/v1/file/",{
        method: "GET",
    });
   
  
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export async function getFileDetails(fileId) {
  try {
    const res = await fetch(`http://localhost:9000/api/v1/file/analysis/${fileId}`);
    return await res.json();
  } catch (err) {
    throw err;
  }
}
