import React, { useState, useEffect } from 'react';
import { MoveUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Project {
    id: number;
    title: string;
    description: string;
    featured_image_path: string;
    github_url: string | null;
    live_url: string | null;
    is_featured: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

function Works() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [filterPosition, setFilterPosition] = useState({ left: 8, width: 70 });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get<Project[]>('/api/featured-projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories from projects
    const uniqueCategories = Array.from(
        new Map(
            projects.map(project => [project.category.id, project.category])
        ).values()
    ).sort((a, b) => a.name.localeCompare(b.name));

    // Predefined filters to ensure specific order and all necessary categories
    const predefinedFilters = [
        { name: "All", value: "all" },
        { name: "UI/UX", value: "ui-ux" },
        { name: "Web Development", value: "web-development" },
        { name: "Mobile Apps", value: "mobile-apps" }
    ];

    // Merge predefined filters with any additional unique categories from the database
    const filters = [
        ...predefinedFilters,
        ...uniqueCategories
            .filter(category => !predefinedFilters.some(filter => filter.value === category.slug))
            .map(category => ({
                name: category.name,
                value: category.slug
            }))
    ];

    const handleFilterClick = (filterValue: string, event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveFilter(filterValue);
        const button = event.currentTarget;
        setFilterPosition({
            left: button.offsetLeft,
            width: button.offsetWidth
        });
    };

    // Filter projects based on category
    const filteredProjects = projects.filter(project => {
        if (activeFilter === 'all') return true;
        return project.category.slug === activeFilter;
    });

    // Function to get the full image URL
    const getImageUrl = (path: string) => {
        if (!path) return '/images/placeholder.jpg';
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };
     
    return (
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

                {/* Filter Buttons */}
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
                                key={`filter-${filter.value}`}
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

                {/* Portfolio Grid */}
                <motion.div
                    initial={{ opacity: 0}}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            Loading projects...
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No projects found for this category.
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <motion.div
                                key={`project-${project.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className='relative group overflow-hidden rounded-xl shadow-lg'
                            >
                                {/* Project Image */}
                                <div className="h-80 overflow-hidden">
                                    <img 
                                        src={getImageUrl(project.featured_image_path)} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                </div>

                                {/* Project Overlay */}
                                <div className="absolute bottom-0 left-0 w-full m-2 bg-gradient-to-r from-purple-500 to-purple-700 p-4 md:p-6 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-white mb-4">{project.description}</p>
                                        <div className="flex gap-4">
                                            {project.github_url && (
                                                <a 
                                                    href={project.github_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-purple-200 transition-colors text-sm flex items-center gap-1"
                                                >
                                                    GitHub <MoveUpRight size={16} />
                                                </a>
                                            )}
                                            {project.live_url && (
                                                <a 
                                                    href={project.live_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-purple-200 transition-colors text-sm flex items-center gap-1"
                                                >
                                                    Live Demo <MoveUpRight size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </section>
    );
}

export default Works;