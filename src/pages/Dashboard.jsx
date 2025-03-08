import { useState } from "react";
import SummaryAd from "../components/SummaryAd";
import ResumeUpload from "../components/ResumeUpload";

const Dashboard = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);

  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">AI-Powered Interview Practice Platform</h1>
      <p className="text-gray-600 mt-2 text-center">
        Master your interview skills with personalized AI feedback
      </p>

      {/* SummaryAd Component */}
      <div className="mt-6 w-full max-w-4xl px-4">
        <SummaryAd />
      </div>

      {/* Card Container */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        {/* Mock Interviews Card (Updated Icon) */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
          <img src="/MockInterviewIcon.jpg"  alt="Mock Interview Icon" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Mock Interviews</h2>
          <p className="text-gray-600 mt-2">
            Practice with our AI interviewer across aptitude, technical, and HR rounds
          </p>
        </div>

        {/* Learning Courses Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
        <img src="/LearningCourses.jpg"  alt="Learning Courses" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Learning Courses</h2>
          <p className="text-gray-600 mt-2">
            Access comprehensive courses to improve your skills
          </p>
        </div>

        {/* Course Completion Certificate (Updated) */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
        <img src="/Certificate.jpg"  alt="Course Completion Certificate" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Course Completion Certificate</h2>
          <p className="text-gray-600 mt-2">
            Earn verifiable certificates upon course completion
          </p>
        </div>
      </div>

      {/* Resume Upload or Start Button */}
      <div className="mt-8 w-full max-w-md">
        {!resumeUploaded ? (
          <ResumeUpload onUpload={handleResumeUpload} />
        ) : (
          <button className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all w-full">
            Start Your Interview
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;