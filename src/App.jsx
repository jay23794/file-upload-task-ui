import FileUpload from "./component/fileUpload/FileUpload";
import FileList from "./component/fileUpload/FileList";
import FileDetails from "./component/fileUpload/FileMetadata";
import { useState } from "react";

export default function App() {
   const [selectedFileId, setSelectedFileId] = useState(null);
  return (
   <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <FileUpload />

      <div className="mt-10 w-full max-w-5xl flex gap-6">
        <FileList onSelect={setSelectedFileId} />

        <FileDetails fileId={selectedFileId} />
      </div>
    </div>
  );
}
