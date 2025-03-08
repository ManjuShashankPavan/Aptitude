import SummaryAd from "../components/SummaryAd";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <p className="mt-2 text-gray-600">Manage your interview practice, upload resumes, and more.</p>

      <SummaryAd />  {/* Add SummaryAd here */}
    </div>
  );
}
