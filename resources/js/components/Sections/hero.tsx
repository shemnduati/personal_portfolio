import React from 'react';
import {  Download, Facebook, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

interface Settings {
    github_url: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    facebook_url: string | null;
    cv_path: string | null;
}

function Hero() {
    const { settings } = usePage().props as { settings: Settings };
    const profilePic = "/assets/meee.png";

    return (
        <section id='hero' className='relative py-16 md:py-32 flex itmes-center min-h-screen' >
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                <svg viewBox='0 0 1320 300' className='w-full h-full opacity-10'>
                <motion.text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    className="fill-white stroke-purple-600 font-bold text-[240px]" 
                    strokeWidth="2"
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ duration: 3.0, repeat: Infinity, repeatType: "reverse" }}
                >
                    Hi
                </motion.text>
                </svg>
            </div>

            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row items-center'>
                    {/* Left Content */}
                    <div className='md:w-1/2 mb-12 md:mb-0'>
                        <motion.div
                        initial={{ opacity: 0, y: 20}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ duration: 0.8 }}
                        >
                        <span className='text-lg md:text-4xl font-bold text-primary mb-2 block'> I am Shem</span>
                        <h1 className='text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent leading-tight mb-4'>
                            Web Software <br className='md:block '/> Developer.
                        </h1>

                        {/* Mobile Image - Hide this for the desktop view */}
                        <div className='md:hidden mb-8'>
                            <motion.div
                                initial={{ opacity: 0, y: 10, rotate: 4.29 }}
                                animate={{ opacity: 1, y: 0, rotate: 4.29 }}
                                transition={{ duration: 0.8 }}
                                className='relative'
                                whileHover={{ rotate: 0 }}
                            >
                                <img src={profilePic} alt="Shem Nduati" className='rounded-4xl mx-auto  w-80 h-80 md:h-110 object-cover border-2 border-white hover:border-purple-600 shadow-2xl' />
                            </motion.div>
                            
                        </div>
                        <p className='text-xl text-gray-800 mb-8b max-w-lg'>
                            I break down complex user experience problems to create integrity-focused solutions that
                            connect billions of people
                        </p>
                        <div className="flex flex-wrap mt-8 items-center gap-4 mb-16 md:mb-0">
                            {settings.cv_path && (
                                <a 
                                    href="/admin/settings/download-cv"
                                    className="flex items-center gap-2 text-purple-600 font-semibold border-1 border-purple-600 hover:text-white hover:bg-purple-600 rounded-3xl py-2 px-4 transition-colors"
                                >
                                    Download CV <Download className="w-5 h-5" />
                                </a>
                            )}

                            <div className='flex space-x-4'>
                                {settings.github_url && (
                                    <a 
                                        href={settings.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='border-1 border-purple-600 hover:bg-purple-600 rounded-full px-2 py-2 transition-colors'
                                    >
                                        <Github className="w-4 h-4 text-purple-600 hover:text-white" />
                                    </a>
                                )}
                                {settings.linkedin_url && (
                                    <a 
                                        href={settings.linkedin_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='border-1 border-purple-600 hover:bg-purple-600 rounded-full px-2 py-2 transition-colors'
                                    >
                                        <Linkedin className="w-4 h-4 text-purple-600 hover:text-white" />
                                    </a>
                                )}
                                {settings.twitter_url && (
                                    <a 
                                        href={settings.twitter_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='border-1 border-purple-600 hover:bg-purple-600 rounded-full px-2 py-2 transition-colors'
                                    >
                                        <Twitter className="w-4 h-4 text-purple-600 hover:text-white" />
                                    </a>
                                )}
                                {settings.facebook_url && (
                                    <a 
                                        href={settings.facebook_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='border-1 border-purple-600 hover:bg-purple-600 rounded-full px-2 py-2 transition-colors'
                                    >
                                        <Facebook className="w-4 h-4 text-purple-600 hover:text-white" />
                                    </a>
                                )}
                            </div>
                        </div>
                        </motion.div>
                    </div>

                    {/* Right Content */}
                    <div className='hidden md:w-1/2 md:block'>
                        <motion.div
                            initial={{ opacity: 0, y: 10, rotate: 4.29 }}
                            animate={{ opacity: 1, y: 0, rotate: 4.29 }}
                            transition={{ duration: 0.8 }}
                            className='relative'
                            whileHover={{ rotate: 0 }}
                        >
                        <img src={profilePic} alt="Shem Nduati" className='rounded-4xl mx-auto w-100 h-80 md:h-110 object-cover border-2 border-white hover:border-purple-600 shadow-2xl' />
                        </motion.div>
                    </div>
                </div>
                    {/* Years of Experience */}
                    <div className="mt-20 grid grid-cols-2  md:grid-cols-4 gap-6">
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                        <span className="text-purple-600 text-6xl font-bold">14</span>
                        <div className="md:ml-2 text-purple-600 text-xl">
                            <p>Years of</p>
                            <p>Experience</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                        <span className="text-purple-600 text-6xl font-bold">50+</span>
                        <div className="md:ml-2 text-purple-600 text-xl">
                            <p>Projects</p>
                            <p>Completed</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                        <span className="text-purple-600 text-6xl font-bold">23</span>
                        <div className="md:ml-2 text-purple-600 text-xl">
                            <p>Happy</p>
                            <p>Clients</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                        <span className="text-purple-600 text-6xl font-bold">4</span>
                        <div className="md:ml-2 text-purple-600 text-xl">
                            <p>Awards</p>
                            <p>Won</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;