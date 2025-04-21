import React, { useState, useEffect } from 'react';
import { QuoteIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    company_logo: string | null;
    avatar: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    testimonials: Testimonial[];
}

function Testimonials() {
    const { testimonials } = usePage().props as Props;
    const activeTestimonials = testimonials.filter(t => t.is_active);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const nextTestimonial = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === activeTestimonials.length - 1 ? 0 : prevIndex + 1
        );
    };
    
    const prevTestimonial = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? activeTestimonials.length - 1 : prevIndex - 1
        );
    };

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % activeTestimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeTestimonials.length]);

    if (activeTestimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-purple-50" id="testimonials">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row">
                    {/* Left column */}
                    <div className="lg:w-5/12 mb-12 lg:mb-0 lg:pr-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            variants={variants}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-transparent">
                                My Client's Stories
                            </h2>
                            <p className="text-gray-600">
                                Here's what some of my clients have to say about working with me.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right column */}
                    <div className="lg:w-7/12 lg:pl-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            variants={variants}
                            className="relative"
                        >
                            {/* Fixed height container to prevent layout shift */}
                            <div className="min-h-[400px] md:min-h-[350px] w-full">
                                <AnimatePresence mode="wait">
                                    <div className="flex flex-wrap justify-center gap-6">
                                        {[0, 1].map((offset) => {
                                            const index = (activeIndex + offset) % activeTestimonials.length;
                                            const testimonial = activeTestimonials[index];
                                            return (
                                                <motion.div
                                                    key={testimonial.id}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="bg-white p-6 rounded-xl shadow-md w-72 md:w-96"
                                                >
                                                    {/* Company Logo & Quote Icon */}
                                                    <div className="flex justify-between items-start mb-4">
                                                        {testimonial.company_logo && (
                                                            <img
                                                                src={getImageUrl(testimonial.company_logo)}
                                                                alt="Company Logo"
                                                                className="h-6"
                                                            />
                                                        )}
                                                        <QuoteIcon className="text-purple-600 text-xl" />
                                                    </div>

                                                    {/* Reviewer Quote */}
                                                    <p className="text-gray-700 italic mb-4">
                                                        "{testimonial.quote}"
                                                    </p>

                                                    {/* Reviewer Details */}
                                                    <div className="flex items-center gap-4">
                                                        {testimonial.avatar && (
                                                            <img
                                                                src={getImageUrl(testimonial.avatar)}
                                                                alt={testimonial.name}
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        )}
                                                        <div>
                                                            <p className="text-lg font-semibold text-gray-900">
                                                                {testimonial.name}
                                                            </p>
                                                            <p className="text-gray-500 text-sm">
                                                                {testimonial.role}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex justify-center mt-8 space-x-2">
                                {activeTestimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${
                                            index === activeIndex ? "bg-purple-600 w-6" : "bg-gray-300"
                                        }`}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;