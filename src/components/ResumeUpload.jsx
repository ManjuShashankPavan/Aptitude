import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeURL, setResumeURL] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    const filePath = `resumes/${file.name}`;

    const { data, error } = await supabase.storage.from("resumes").upload(filePath, file);

    if (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    } else {
      const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(filePath);
      setResumeURL(urlData.publicUrl);
      alert("Resume uploaded successfully!");
    }

    setUploading(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>
      <input 
        type="file" 
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])} 
        className="w-full p-2 border rounded mb-3"
      />
      <button 
        onClick={handleUpload} 
        disabled={uploading} 
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {resumeURL && (
        <p className="mt-3 text-sm text-green-500">
          Resume uploaded: <a href={resumeURL} target="_blank" rel="noopener noreferrer" className="underline">View</a>
        </p>
      )}
    </div>
  );
}
