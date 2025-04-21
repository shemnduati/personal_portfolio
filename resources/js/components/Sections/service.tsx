import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoveDownRight, MoveUpRight } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    order: number;
    is_active: boolean;
}

function Service() {
    const { services } = usePage<{ services: Service[] }>().props;
    const [activeService, setActiveService] = useState(0);

    // Filter active services and sort by order
    const activeServices = services
        .filter(service => service.is_active)
        .sort((a, b) => a.order - b.order);

    // Calculate the top position based on index and fixed item height
    const itemHeight = 112; // Fixed height for each service item
    const calculateTopPosition = (index: number) => {
        return index * itemHeight;
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (activeServices.length === 0) return null;

    return (
        <>
            <section id="services" className="py-20 bg-gray-100">
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
                    <div className="max-w-4xl mx-auto relative">
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
                            {activeServices.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={variants}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`p-6 rounded-lg cursor-pointer transition-all hover:text-white group duration-300 ${activeService === index ? 'bg-purple-600 text-white shadow-lg' : 'hover:bg-purple-600'}`}
                                    onClick={() => setActiveService(index)}
                                    style={{ height: itemHeight }}
                                >
                                    <div className="flex flex-col h-full md:flex-row md:items-center">
                                        {/* Left Box */}
                                        <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                                            <span className={`text-2xl font-bold mr-4 text-purple-600 group-hover:text-white ${activeService === index ? 'text-white' : 'text-purple-600'}`}>
                                                0{index + 1}
                                            </span>
                                            <h3 className={`text-2xl font-bold text-purple-600 group-hover:text-white ${activeService === index ? 'text-white' : 'text-purple-600'}`}>
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Right Box */}
                                        <div className="md:w-2/3">
                                            <p className={`font-semibold group-hover:text-white ${activeService === index ? 'text-white' : 'text-gray-700'}`}>
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Icon */}
                                        <div className="hidden md:flex items-center justify-end ml-4 text-2xl w-10">
                                            {service.icon ? (
                                                <span className="text-4xl">{service.icon}</span>
                                            ) : (
                                                activeService === index ? (
                                                    <MoveUpRight className="text-4xl md:text-5xl" />
                                                ) : (
                                                    <MoveDownRight className="text-4xl md:text-5xl" />
                                                )
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
    );
}

export default Service;