import React from 'react';
import { delay, motion } from 'framer-motion';

function skill() {
    const html = "/assets/html.svg";
    const css = "/assets/css.svg";
    const js = "/assets/js.svg";
    const web = "/assets/web.svg";
    const react = "/assets/react.svg";
    const framer = "/assets/framer.svg";

    const skills = [
        { name: 'HTML', percentage: 92, icon: html, delay:0.3 },
        { name: 'CSS', percentage: 80, icon: css, delay:0.4 },
        { name: 'Js', percentage: 85, icon: js, delay:0.5 },
        { name: 'Webflow', percentage: 99, icon: web, delay:0.6 },
        { name: 'ReactJs', percentage: 87, icon: react, delay:0.7 },
        { name: 'Framer', percentage: 93, icon: framer, delay:0.8 },
    ];
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
                    className='text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to bg-purple-900 bg-clip-text text-transparent'
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
                hidden: {opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { 
                        staggerChildren: 0.1
                        }
                }
                }}
                className='flex flex-wrap justify-center gap-8'
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants ={{
                        hidden: { opacity: 0, y:20 },
                        visible:{ opacity: 1, y:0 }
                        }}
                        transition={{ delay: skill.delay }}
                        className='w-40 text-center p-4 bg-purple-50 rounded-xl shadow-md hover:shadow-lg transition-shadow'
                    >
                        <div className="w-20 h-20 mx-auto flex items-center justify-center">
                            <img src={skill.icon} alt={skill.name} className='w-12 h-12 object-contain' />
                        </div>
                        <div className="text-gray-600 font-bold text-lg mt-2">
                            {skill.percentage}%
                        </div>
                        <div className="font-medium text-purple-600 text-sm">{skill.name}</div>
                        
                    </motion.div>
                ))}
            </motion.div>
        </div>
        </section>
   </>
  )
}

export default skill