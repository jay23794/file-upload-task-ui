import { useEffect, useState } from "react";
import { getUploadedFiles } from "../../service/uploadService";

export default function FileList({ onSelect }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await getUploadedFiles();
    
      setFiles(data['data']);
    } catch (err) {
      console.error("Error loading files:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading files...</p>;

  return (
    <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files: {files.length}</h2>

      {files.length === 0 && (
        <p className="text-gray-600">No files uploaded yet.</p>
      )}
   
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file._id}
            onClick={() => onSelect(file._id)}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          >
            <div className="flex justify-between">
              <span className="font-medium">{file.fileName}</span>

               <span className="font-sm text-sm">{new Date(file.createdAt).toLocaleString("en-IN")}</span>
              <span
                className={`text-sm ${
                  file.status === "COMPLETED"
                    ? "text-green-600"
                    : file.status === "PROCESSING"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {file.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
