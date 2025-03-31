import React, { useState } from 'react';
import {  MoveDownRight,  MoveUpRight,  Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

function works() {
    const[activeFilter, setActiveFilter] = useState('*');
    const [filterPosition, setFilterPosition] = useState({ left: 8, width: 70});

    const project1 = "/assets/project1.jpg";
    const project2 = "/assets/project2.jpg";
    const project3 = "/assets/project3.jpg";
    const project4 = "/assets/project4.jpg";

    const portfolioItems = [
        {
            id: 1,
            title: 'Deloitte',
            description: 'Project was about precision and information.',
            image: project1,
            category: 'branding'
        },
        {
            id: 2,
            title: 'New Age',
            description: 'Project was about precision and information.',
            image: project2,
            category: 'uxui'
        },
        {
            id: 3,
            title: 'Portfolio Item 1',
            description: 'Project was about precision and information.',
            image: project3,
            category: 'mobile-app'
        },
        {
            id: 4,
            title: 'Portfolio Item 1',
            description: 'Project was about precision and information.',
            image: project4,
            category: 'branding'
        }
    ];

    const filters = [
        {name: "All", value: "*"},
        {name: "UX/UI", value: "uxui"},
        {name: "Branding", value: "branding"},
        {name: "Apps", value: "mobile-app"}
    ];

    const handleFilterClick = (filterValue, event) => {
        setActiveFilter(filterValue);
        const button = event.target;
        setFilterPosition({
            left: button.offsetLeft,
            width: button.offsetWidth
        });
    };

    const filteredItems = activeFilter === '*'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter);
     
  return (
    <>
     <section id="works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true}}
                transition={{ duration: 0.5 }}
                className='text-center max-w-2xl mx-auto mb-16'
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                My Recent Works
                </h2>
                <p className="text-lg text-gray-600">
                    We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
                </p>
            </motion.div>

            {/* Filter Button*/}
            <motion.div
                initial={{ opacity: 0, y: 20}}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-12 relative"
            >
                <div className="inline-flex bg-gray-100 rounded-full p-1 relative">
                    {/* Active Filter Indicator */}
                    <motion.div
                        className="absolute top-0 bottom-0 bg-gradient-to-r from-purple-400 to-purple-900 rounded-full shadow-md"
                        initial={{ left: filterPosition.left, width: filterPosition.width }}
                        animate={{ left: filterPosition.left, width: filterPosition.width }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />

                    {filters.map((filter) => (
                        <button
                        key={filter.value}
                        onClick={(e) => handleFilterClick(filter.value, e)}
                        className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                            activeFilter === filter.value ? 'text-white' : 'text-purple-600 hover:text-purple-800'
                        }`}
                        >
                        {filter.name}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Porfolio Grid */}
            <motion.div
                initial={{ opacity: 0}}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='relative group overflow-hidden rounded-xl shadow-lg'
                    >
                        {/* Portfoli Item Image */}
                        <div className="h-80 overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>

                        {/* Portfolio Overlay */}
                        <div className="absolute bottom-0 left-0 w-full m-2 bg-gradient-to-r from-purple-500 to-purple-700 p-4 md:p-6 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                            <a href="/blogDetails" >
                                <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-white mb-4">{item.description}</p>
                            </a>
                            <button className="text-white hover:text-purple-300 transition-colors">
                                <a href="/blogDetails" >
                                  <MoveUpRight className="text-4xl md:text-5xl" />
                                </a>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            </div>
        </section>
    </>
  )
}

export default works