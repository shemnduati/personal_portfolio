import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_path: string | null;
  featured_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
}

function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/latest-blogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get image URL
  const getImageUrl = (blog: Blog) => {
    if (blog.featured_image_url) {
      return blog.featured_image_url;
    }
    
    if (blog.featured_image_path) {
      if (blog.featured_image_path.startsWith('http://') || blog.featured_image_path.startsWith('https://')) {
        return blog.featured_image_path;
      }
      if (blog.featured_image_path.startsWith('/storage/')) {
        return blog.featured_image_path;
      }
      return `/storage/${blog.featured_image_path}`;
    }
    
    // Default image if no image is available
    return "/assets/blog-placeholder.jpg";
  };

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest insights, tutorials, and news from the tech world.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading blog posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No blog posts available.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative"
                >
                  {/* Blog Thumbnail Section */}
                  <div className="relative">
                    <Link href={`/blogs/${blog.slug}`}>
                      <img
                        src={getImageUrl(blog)}
                        alt={blog.title}
                        className="w-full h-70 md:h-90 object-cover"
                      />
                    </Link>

                    {/* Category Badge */}
                    {blog.category && (
                      <span className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {blog.category.name}
                      </span>
                    )}

                    {/* Blog Content Overlay (Floating on Image) */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-purple-600 hover:text-white group">
                      {/* Date and Comments Section */}
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        {/* Date */}
                        <div className="flex items-center mr-4 text-purple-500 group-hover:text-white transition-colors">
                          <CalendarDays className="mr-2" />
                          <span className="text-sm">{formatDate(blog.published_at)}</span>
                        </div>
                        {/* Comments - Placeholder for now */}
                        <div className="flex items-center text-purple-500 group-hover:text-white transition-colors">
                          <MessageSquare className="mr-2" />
                          <Link href={`/blogs/${blog.slug}`} className="hover:text-white">
                            Comment (0)
                          </Link>
                        </div>
                      </div>

                      {/* Blog Title */}
                      <h3 className="text-lg md:text-xl font-extrabold group-hover:text-white transition-colors">
                        <Link href={`/blogs/${blog.slug}`} className="block hover:text-white transition-colors">
                          {blog.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export default Blog;