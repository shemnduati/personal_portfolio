import React from 'react';
import { motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

interface Skill {
    id: number;
    name: string;
    icon: string | null;
    description: string;
    proficiency: number;
    order: number;
    is_active: boolean;
}

interface Props {
    skills: Skill[];
}

function Skills() {
    const { skills } = usePage<{ skills: Skill[] }>().props;

    // Filter only active skills and sort by order
    const activeSkills = skills
        .filter(skill => skill.is_active)
        .sort((a, b) => a.order - b.order);

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    if (activeSkills.length === 0) return null;

    return (
        <>
            <section className="py-16 bg-white" id="skills">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className='text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent'
                        >
                            My Skills
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className='text-gray-600 max-w-2xl mx-auto'
                        >
                            We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
                        </motion.p>
                    </div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className='flex flex-wrap justify-center gap-8'
                    >
                        {activeSkills.map((skill, index) => (
                            <motion.div
                                key={skill.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ delay: 0.3 + (index * 0.1) }}
                                className='w-40 text-center p-4 bg-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow'
                            >
                                <div className="w-20 h-20 mx-auto flex items-center justify-center">
                                    {skill.icon && (
                                        <img 
                                            src={getImageUrl(skill.icon)} 
                                            alt={skill.name} 
                                            className='w-12 h-12 object-contain' 
                                        />
                                    )}
                                </div>
                                <div className="text-gray-600 font-bold text-lg mt-2">
                                    {skill.proficiency}%
                                </div>
                                <div className="font-medium text-purple-600 text-sm">{skill.name}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default Skills; 