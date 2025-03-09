import { motion } from "framer-motion";

export default function IntroPage({ setShowSignIn }) {
  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to SpeaQ
      </motion.h1>

      <motion.p
        className="text-lg max-w-2xl text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Your ultimate AI-powered interview preparation tool. Practice mock
        interviews, get instant feedback, and enhance your chances of landing
        your dream job.
      </motion.p>

      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button
          onClick={() => setShowSignIn(true)}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </button>

        <a href="/about">
          <button className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </a>
      </motion.div>
    </div>
  );
}
