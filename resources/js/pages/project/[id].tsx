import React from 'react';
import { motion } from 'framer-motion';
import { MoveUpRight, Github, ArrowLeft } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Sections/navbar';
import Footer from '@/components/Sections/footer';

interface Technology {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  featured_image_path: string;
  github_url: string | null;
  live_url: string | null;
  technologies: Technology[];
  category: Category;
}

interface Props {
  project: Project;
}

export default function ProjectDetails({ project }: Props) {
  // Function to get the full image URL
  const getImageUrl = (path: string) => {
    if (!path) return '/images/placeholder.jpg';
    if (path.startsWith('http')) return path;
    return `/storage/${path}`;
  };

  return (
    <>
      <Head title={project.title} />
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">

        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={getImageUrl(project.featured_image_path)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex gap-4 mt-8">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
                  >
                    View Live <MoveUpRight size={20} />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-colors"
                  >
                    <Github size={20} /> View Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {project.category.name}
              </span>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="prose prose-lg max-w-none"
            >
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
} 