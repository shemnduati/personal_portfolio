import React from 'react';
import {  Award, GraduationCap} from 'lucide-react';
import { motion } from 'framer-motion';

function experience() {
    const experiences = [
    {
        id: 1,
        year: "2022 to present",
        title: "Programing instructor",
        company: "Blockdots, London",
        experience: " Teaching Python and JavaScript fundamentals to beginners. Developed curriculum and interactive learning materials.",
        technologies: "python, javascript, Ciriculumn Design"

    },
    {
        id: 2,
        year: "2022 to 2022",
        title: "CMS Specialis",
        company: "Parsons, The New School",
        experience: " Managed content for university websites using WordPress and Drupal. Trained staff on CMS usage.",
        technologies: "VueJs, javascript, laravel"

    }
    ];
    const education = [
        {
            id: 1,
            year: "2018 to 2022",
            title: "Bachelor of Science in Computer Science",
            school: "University of California, Los Angeles",
            experience: " Completed coursework in data structures, algorithms, computer systems, and software engineering.",
        },
        {
            id: 1,
            year: "2014 to 2018",
            title: "Bachelor of Mathematics",
            school: "University of London, UK",
            experience: " Completed coursework in calculus, linear algebra, and differential equations.",
        },
    ];
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
  return (
    <>
      <section className="py-15 bg-gray-100" id="resume">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    {/* Experience Setion*/}
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                    <motion.div
                        initial={{ opacity:0, y:20 }}
                        whileInView={{ opacity:1, y:0 }}
                        viewport={{ once: true}}
                        transition={{ delay:0.3 }}
                        className='mb-12'
                    >
                        <h2 className="text-3xl font-bold mb-4 flex bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent items-center">
                            <Award className='w-8 h-8 mr-2 text-purple-600 '/> My Experience
                        </h2>
                    </motion.div>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true}}
                        className='space-y-8'
                    >
                        {experiences.map((exp) =>(
                            <motion.div
                            key={exp.id}
                            variants={item}
                            className='p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300'
                            >
                                <div className="text-purple-600 font-medium mb-1">{exp.year}</div>
                                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                                <div className="text-gray-600 mb-3">{exp.company}</div>
                                <p className="text-gray-500 text-sm mb-3">
                                {exp.experience}
                                </p>
                                {/* Technologies Used*/}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.split(", ").map((tech, index) => (
                                        <span key={index} className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">{tech}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    </div>

                    {/* Education Section */}
                    <div className="w-full md:w-1/2 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className='mb-12'
                    >
                        <h2 className="text-3xl font-bold mb-4 flex bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent items-center">
                            <GraduationCap className='w-8 h-8 mr-2 text-purple-600 '/> Education
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className='space-y-8'
                    >
                        {/* Education Items */}
                        {education.map((edu) =>(
                            <motion.div
                            key={edu.id}
                            variants={item}
                            className='p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300'
                            >
                            <div className="text-purple-600 font-medium mb-1">{edu.year}</div>
                            <h3 className="text-xl font-semibold mb-1">{edu.title}</h3>
                            <div className="text-gray-600 mb-3">{edu.school}</div>
                            <p className="text-gray-500 text-sm mb-3">
                                {edu.experience}
                            </p>
                            </motion.div>
                        ))}
                    </motion.div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default experience