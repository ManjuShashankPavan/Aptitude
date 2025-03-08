import { motion } from "framer-motion";

export default function SummaryAd() {
  return (
    <motion.div 
      className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h3 className="text-lg font-bold">AI Interview Platform</h3>
      <p className="text-sm">
        Enhance your interview skills with AI-powered feedback and real-time mock interviews.
      </p>
    </motion.div>
  );
}
