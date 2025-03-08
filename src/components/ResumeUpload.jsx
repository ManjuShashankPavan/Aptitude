import { useRef, useState } from "react";
import { uploadResume } from "../services/uploadService";

export default function ResumeUpload() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [resumeURL, setResumeURL] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      uploadResume(e.target.files[0], setUploading, setResumeURL);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-96 justify-center items-center m-9 flex">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button 
        onClick={triggerFileInput} 
        disabled={uploading} 
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}