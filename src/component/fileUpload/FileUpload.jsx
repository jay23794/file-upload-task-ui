import { useState } from "react";
import { uploadFileService,getUploadedFiles } from "../../service/uploadService";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 const MAX_SIZE = 40 * 1024 * 1024; // 40 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

const handleFileChange = (e) => {
  const file = e.target.files[0]; // Only first file
  setMessage("");

  if (!file) {
    setMessage("Please upload a file.");
    setFile(null);
    return;
  }

  // Check file count (if user tries to select multiple)
  if (e.target.files.length > 1) {
    setMessage("Only one file is allowed.");
    setFile(null);
    return;
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    setMessage("Invalid file type. Only JPG, JPEG, PNG, or PDF allowed.");
    setFile(null);
    return;
  }

  // Check file size
  if (file.size > MAX_SIZE) {
    setMessage("File must be smaller than 40 MB.");
    setFile(null);
    return;
  }

  // If everything is valid
  setFile(file);
};

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await uploadFileService(file);
      setMessage("File uploaded successfully!");
      console.log("Upload response:", response);
       await getUploadedFiles();
    } catch (err) {
      setMessage("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full flex flex-col items-center mb-6">
    {/* Upload box */}
    <label
      htmlFor="file"
      className="flex flex-col items-center justify-center w-full max-w-xl h-40 
                 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer
                 hover:border-blue-500 hover:bg-blue-50 transition-colors"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Click to select file</span>
        </p>
        <p className="text-sm font-sm text-gray-600  mt-2 font-semibold">
         Supported file extensions are .pdf .png .jpeg .jpg <br></br>
         
        </p>
        <p className="text-sm font-sm text-gray-600  mt-2 font-semibold">
       
          <span className="font-semibold text-center">40 MB max</span>
        </p>
      </div>

      {/* Hidden file input */}
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>

    {/* Selected file name */}
    {file && (
      <p className="mt-2 text-sm text-gray-700">
        Selected: <strong>{file.name}</strong>
      </p>
    )}

    {/* Submit button */}
    <button
      onClick={handleUpload}
      disabled={loading}
      className="mt-4 w-full max-w-xl py-2 bg-green-600 text-white font-medium rounded-lg 
                 hover:bg-green-700 transition disabled:bg-gray-400"
    >
      {loading ? "Uploading..." : "Submit"}
    </button>

    {/* Loader */}
    {loading && (
      <div className="mt-4 flex justify-center">
        <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )}

    {/* Message */}
    {message && (
      <p className="mt-4 text-center text-sm font-medium text-gray-700">
        {message}
      </p>
    )}
  </div>
);

}