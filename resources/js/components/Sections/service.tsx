import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  MoveDownRight,  MoveUpRight } from 'lucide-react';

function service() {
    const [activeService, setActiveService] = useState(0);

    // Calculate the top position based on index and fixed item height
    const itemHeight = 112; // Fixed height for each service item
    const calculateTopPosition = (index) => {
        return index * itemHeight;
    };



    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      };
    const services = [
        {
            id: 1,
            title: "Responsive Design",
            description: "Ensure your website looks great on any device, with layouts that adapt to different screen sizes seamlessly.",
            icon: "📱",
            active: true 
          },
          {
            id: 2,
            title: "CMS Development",
            description: "Set up user-friendly CMS solutions like WordPress or custom-built options so clients can manage content easily.",
            icon: "🛠️",
            active: false
          },
          {
            id: 3,
            title: "API Integrations",
            description: "Build and integrate APIs to connect websites with third-party applications, enhancing functionality and performance.",
            icon: "🔌",
            active: false
          },
          {
            id: 4,
            title: "Website Redesign",
            description: "Refresh outdated websites with modern, appealing designs that align with current brand goals and user expectations.",
            icon: "🎨",
            active: false
          }
    ];

  return (
    <>
     <section id="services-section" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600">My Quality Services</h2>
            <p className="text-lg text-gray-600">
                We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
            </p>
            </motion.div>

            {/* Services List */}
            <div className="max-w-4xl mx-auto relative ">
            {/* Active Background Indicator */}
            <motion.div
                className="absolute left-0 w-full bg-white shadow-md rounded-lg hover:text-white z-0"
                initial={{ height: 0, top: 0 }}
                animate={{ 
                height: itemHeight,
                top: calculateTopPosition(activeService),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />

            <div className="relative z-10">
                {services.map((service, index) => (
                <motion.div
                    key={service.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6  rounded-lg cursor-pointer transition-all hover:text-white group  duration-300  ${activeService === index ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-purple-600'}`}
                    onClick={() => setActiveService(index)}
                    style={{ height: itemHeight }}
                >
                    <div className="flex flex-col h-full md:flex-row md:items-center ">
                        {/* Left Box */}
                        <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                            <span className={`text-2xl font-bold mr-4 text-purple-600 group-hover:text-white  ${activeService === index ? ' text-white ' : 'text-purple-600'}`}>0{service.id}</span>
                            <h3 className={`text-2xl font-bold text-purple-600 group-hover:text-white ${activeService === index ? ' text-white ' : 'text-purple-600'}`}>{service.title}</h3>
                        </div>

                        {/* Right Box */}
                        <div className="md:w-2/3">
                            <p className={` font-semibold group-hover:text-white ${activeService === index ? ' text-white ' : 'text-gray-700'}`}>{service.description}</p>
                        </div>

                        {/* Icon */}
                        <div className="hidden md:flex items-center justify-end ml-4 text-2xl w-10">
                            {activeService === index  ? (
                                <MoveUpRight className="text-4xl md:text-5xl" />
                                ) : (
                                <MoveDownRight className="text-4xl md:text-5xl" />
                            )}
                        </div>
                    </div>
                </motion.div>
                ))}
            </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default service