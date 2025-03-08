import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="max-w-6xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-center md:text-left"> AI Interview Training</h1>
                    <div className="flex mt-4 md:mt-0">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="bg-white text-gray-900 px-3 py-2 rounded-l-md outline-none"
                        />
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-r-md hover:bg-blue-700">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Company</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li className="hover:text-gray-200 cursor-pointer">About Us</li>
                            <li className="hover:text-gray-200 cursor-pointer">Careers</li>
                            <li className="hover:text-gray-200 cursor-pointer">Press</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Resources</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li className="hover:text-gray-200 cursor-pointer">Blogs</li>
                            <li className="hover:text-gray-200 cursor-pointer">FAQs</li>
                            <li className="hover:text-gray-200 cursor-pointer">Support</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Legal</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li className="hover:text-gray-200 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-gray-200 cursor-pointer">Terms of Service</li>
                            <li className="hover:text-gray-200 cursor-pointer">Contact Us</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-gray-500 text-sm mt-6">
                    © {new Date().getFullYear()} InterviewAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
