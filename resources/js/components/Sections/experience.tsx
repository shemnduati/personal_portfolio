import React from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';

interface Experience {
    id: number;
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    order: number;
    is_active: boolean;
}

interface Education {
    id: number;
    degree: string;
    institution: string;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    order: number;
    is_active: boolean;
}

interface Props {
    experiences: Experience[];
    education: Education[];
}

function Experience() {
    const { experiences, education } = usePage().props as Props;

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="py-15 bg-gray-100" id="resume">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    {/* Experience Section */}
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className='mb-12'
                        >
                            <h2 className="text-3xl font-bold mb-4 flex bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent items-center">
                                <Award className='w-8 h-8 mr-2 text-purple-600' /> My Experience
                            </h2>
                        </motion.div>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className='space-y-8'
                        >
                            {experiences.map((exp) => (
                                <motion.div
                                    key={exp.id}
                                    variants={item}
                                    className='p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300'
                                >
                                    <div className="text-purple-600 font-medium mb-1">
                                        {format(new Date(exp.start_date), 'MMM yyyy')} - {' '}
                                        {exp.is_current 
                                            ? 'Present'
                                            : exp.end_date 
                                                ? format(new Date(exp.end_date), 'MMM yyyy')
                                                : ''
                                        }
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                                    <div className="text-gray-600 mb-3">{exp.company}</div>
                                    {exp.location && (
                                        <div className="text-gray-500 mb-3">{exp.location}</div>
                                    )}
                                    <p className="text-gray-500 text-sm mb-3">
                                        {exp.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Education Section */}
                    <div className="w-full md:w-1/2 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className='mb-12'
                        >
                            <h2 className="text-3xl font-bold mb-4 flex bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent items-center">
                                <GraduationCap className='w-8 h-8 mr-2 text-purple-600' /> Education
                            </h2>
                        </motion.div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className='space-y-8'
                        >
                            {education.map((edu) => (
                                <motion.div
                                    key={edu.id}
                                    variants={item}
                                    className='p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300'
                                >
                                    <div className="text-purple-600 font-medium mb-1">
                                        {format(new Date(edu.start_date), 'MMM yyyy')} - {' '}
                                        {edu.is_current 
                                            ? 'Present'
                                            : edu.end_date 
                                                ? format(new Date(edu.end_date), 'MMM yyyy')
                                                : ''
                                        }
                                    </div>
                                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                                    <div className="text-gray-600 mb-3">{edu.institution}</div>
                                    {edu.location && (
                                        <div className="text-gray-500 mb-3">{edu.location}</div>
                                    )}
                                    <p className="text-gray-500 text-sm mb-3">
                                        {edu.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Experience;