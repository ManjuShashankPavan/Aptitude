import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="max-w-6xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-center md:text-left">AI Interview Training</h1>
                    <div className="flex mt-4 md:mt-0">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="bg-white text-gray-900 px-3 py-2 rounded-l-md outline-none ml-30"
                        />
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-r-md hover:bg-blue-700">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left mt-10">
                    
                    {/* Company Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Company</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li>
                                <Link to="/About" className="hover:text-gray-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="hover:text-gray-200">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/press" className="hover:text-gray-200">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Resources</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li>
                                <Link to="/blogs" className="hover:text-gray-200">
                                    Blogs
                                </Link>
                            </li>
                            <li>
                                <Link to="/faqs" className="hover:text-gray-200">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/support" className="hover:text-gray-200">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Legal</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li>
                                <Link to="/privacy-policy" className="hover:text-gray-200">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="hover:text-gray-200">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/ContactUs" className="hover:text-gray-200">
                                    Contact Us
                                </Link>
                            </li>
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
