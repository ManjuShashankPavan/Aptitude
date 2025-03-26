import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

const AptitudeTest = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleStartInterview = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      <h1 className="text-3xl font-bold text-center">Aptitude Test</h1>
      <p className="text-gray-600 mt-2 text-center">
        Prepare effectively for your interviews with structured mock tests
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/Beging")}
        >
          <img src="/AptitudeIcon.jpg" alt="Aptitude Test" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Beginner Round</h2>
          <p className="text-gray-600 mt-2">
            Sharpen your problem-solving skills with aptitude tests
          </p>
        </div>

        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/Intermediate")}
        >
          <img src="/TechnicalIcon.jpg" alt="Technical Interview" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Intermediate Round</h2>
          <p className="text-gray-600 mt-2">
            Practice coding and technical problem-solving questions
          </p>
        </div>

        <div 
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:bg-slate-100 relative group cursor-pointer"
          onClick={() => navigate("/Advance")}
        >
          <img src="/HRIcon.jpg" alt="HR Interview" className="w-12 h-12" />
          <h2 className="text-lg font-semibold mt-4">Advance Round</h2>
          <p className="text-gray-600 mt-2">
            Learn how to answer behavioral and situational questions
          </p>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md relative">
        <button 
          className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all w-full relative group"
          onClick={handleStartInterview} 
        >
          Start Your Interview
        </button>
        {showPopup && (
          <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-lg">
            Choose any 1 among the above three
          </div>
        )}
      </div>
    </div>
  );
};

export default AptitudeTest;