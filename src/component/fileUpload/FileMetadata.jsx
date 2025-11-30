import { useEffect, useState } from "react";
import { getFileDetails } from "../../service/uploadService";

export default function FileDetails({ fileId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showJson, setShowJson] = useState(false);

   const rawJson = {
    exif: file?.exif || null,
    ocr: file?.ocr || null
  };

  useEffect(() => {
    if (fileId) loadFile();
  }, [fileId]);

  const getOcrText = (value) => {
  if (!value) return "";

  
  if (typeof value === "object" && "text" in value) {
    return value.text;
  }

  
  if (Array.isArray(value)) {
    return value[0] || "";
  }

  // If plain string
  return value;
};

  const loadFile = async () => {
    setLoading(true);
    try {
      const data = await getFileDetails(fileId);
      setFile(data['data']);
    } catch (err) {
      console.error("Error loading details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!fileId) return <p>Select a file to view details</p>;

  if (loading) return <p>Loading details...</p>;

  return (
     <>
    <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-4">File Details</h2>
      <h5 className="text-sm font-semibold mb-4 flex justify-between items-center">
          File Details

          <button
            onClick={() => setShowJson(true)}
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
          >
            View Raw JSON
          </button>
        </h5>
      <div className="space-y-2 text-gray-700">

      

        <p><strong>Name:</strong> {file?.exif?.fileName || file?.ocr.fileName }</p>
        <p><strong>Size:</strong> {file?.exif?.exif?.FileSize || "NSA" } bytes</p>
        <p><strong>EncodingProcess:</strong> {file?.exif?.EncodingProcess || "NSA"}</p>
        <p><strong>text:</strong>{getOcrText(file?.ocr?.text)}</p>
        <p><strong>Uploaded At:</strong> {new Date(file?.exif?.createdAt).toLocaleString()}</p>

      </div>
    </div>

    {showJson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-5 rounded-md shadow-xl w-full max-w-3xl">

            <h2 className="text-xl font-semibold mb-3">Raw JSON</h2>

            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-[70vh]">
{JSON.stringify(rawJson, null, 2)}
            </pre>

            <button
              onClick={() => setShowJson(false)}
              className="mt-4 bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700"
            >
              Close
            </button>

          </div>
        </div>
      )}
       </>
  );
}
