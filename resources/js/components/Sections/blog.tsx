import React from 'react';
import { motion } from 'framer-motion';
import {  CalendarDays, MessageSquare } from 'lucide-react';

function blog() {
    const blog1 = "/assets/blog1.jpg";
    const blog2 = "/assets/blog2.jpg";
    const blog3 = "/assets/blog3.jpg";
 
   const blogPost =[
    {
        id: 1,
        title: "Top 10 UI/UX Designers",
        category: "Tutorial",
        date: "Oct 01, 2022",
        comments: 0,
        image: blog1,
        link: "/blog-details-light.html"
      },
      {
        id: 2,
        title: "App Development Guides",
        category: "Tips",
        date: "Nov 01, 2022",
        comments: 0,
        image:  blog2,
        link: "/blog-details-light.html"
      },
      {
        id: 3,
        title: "Learn Graphic Design Free",
        category: "Freebies",
        date: "Dec 01, 2022",
        comments: 0,
        image:  blog3,
        link: "/blog-details-light.html"
      }
   ];

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

  return (
    <>
      <section className="py-16 bg-gray-50" id="blog">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{ opacity:1, y:0}}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3}}
                        className='text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to bg-purple-900 bg-clip-text text-transparent'
                    >
                        Recent Blogs
                    </motion.h2>
                    <motion.p
                        initial={{ opacity:0, y: 20}}
                        whileInView={{ opacity:1, y:0}}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-600 max-w-2xl mx-auto'
                    >
                        Check out our latest blog posts to stay up-to-date with the latest news and trends in the form of a unique web project that inspires you and your customers.
                    </motion.p>
                </div>
                {/* Blog Post Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                >
                    {blogPost.map((post, index) => (
                        <motion.div
                            key={post.id}
                            variants={itemVariants}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative"
                        >
                            {/* Blog Thumbnail Section */}
                            <div className="relative">
                            <a href={post.link}>
                                <img
                                src={post.image}
                                alt={post.title}
                                className="w-full  h-70 md:h-90 object-cover"
                                />
                            </a>

                            {/* Category Badge */}
                            <span className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                {post.category}
                            </span>

                            {/* Blog Content Overlay (Floating on Image) */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-purple-600 hover:text-white group">
                                {/* Date and Comments Section */}
                                <div className="flex items-center text-gray-500 text-sm mb-2">
                                    {/* Date */}
                                    <div className="flex items-center mr-4 text-purple-500 group-hover:text-white transition-colors">
                                        <CalendarDays className="mr-2"/>
                                        <span className="text-sm"> {post.date} </span>
                                    </div>
                                    {/* Comments */}
                                    <div className="flex items-center text-purple-500 group-hover:text-white transition-colors">
                                        <MessageSquare className="mr-2" />
                                        <a href="#" className="hover:text-white">
                                            Comment ({post.comments})
                                        </a>
                                    </div>
                                </div>

                                {/* Blog Title */}
                                <h3 className="text-lg md:text-xl font-extrabold group-hover:text-white transition-colors">
                                    <a href={post.link} className="block hover:text-white transition-colors">
                                        {post.title}
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    </>
  )
}

export default blog