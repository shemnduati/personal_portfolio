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

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (activeServices.length === 0) return null;

    return (
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
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {activeServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={variants}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`rounded-lg cursor-pointer transition-all duration-300 overflow-hidden
                                    ${activeService === index ? 'bg-purple-600 text-white shadow-lg' : 'bg-white hover:bg-purple-600 hover:text-white'}`}
                                onClick={() => setActiveService(index)}
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {/* Service Number and Title */}
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:w-1/3">
                                            <span className={`text-xl md:text-2xl font-bold whitespace-nowrap
                                                ${activeService === index ? 'text-white' : 'text-purple-600 group-hover:text-white'}`}>
                                                0{index + 1}
                                            </span>
                                            <h3 className={`text-xl md:text-2xl font-bold break-words
                                                ${activeService === index ? 'text-white' : 'text-purple-600 group-hover:text-white'}`}>
                                                {service.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <div className="md:w-2/3">
                                            <p className={`font-semibold text-sm md:text-base
                                                ${activeService === index ? 'text-white' : 'text-gray-700 group-hover:text-white'}`}>
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Icon */}
                                        <div className="hidden md:flex items-center justify-end w-10 flex-shrink-0">
                                            {service.icon ? (
                                                <img 
                                                    src={`/storage/${service.icon}`} 
                                                    alt={service.title} 
                                                    className="w-8 h-8 object-contain"
                                                />
                                            ) : (
                                                activeService === index ? (
                                                    <MoveUpRight className="w-6 h-6 md:w-8 md:h-8" />
                                                ) : (
                                                    <MoveDownRight className="w-6 h-6 md:w-8 md:h-8" />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service; 