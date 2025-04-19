import React from 'react';
import Navbar from '@/components/Sections/navbar';
import Header from '@/components/Sections/navbarPages';
import Footer from '@/components/Sections/footer';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CalendarDays, FacebookIcon, LinkedinIcon, MessageSquare, Minus, MoveLeft, MoveRight, Quote, Search, TwitchIcon, User } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

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
  tags: Tag[];
}

interface PageProps {
  blog: Blog;
  recentBlogs: Blog[];
  categories: {
    id: number;
    name: string;
    blogs_count: number;
  }[];
  previousBlog: Blog | null;
  nextBlog: Blog | null;
  popularTags?: {
    id: number;
    name: string;
    slug: string;
    blogs_count: number;
  }[];
  flash?: {
    success?: string;
    error?: string;
  };
}

function BlogDetails() {
  const { blog, recentBlogs, categories, previousBlog, nextBlog, popularTags = [] } = usePage<PageProps>().props;

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

  const bg = "/assets/blog-bg.jpeg";
  const blog1 = "/assets/blog-2.webp";
  const blog2 = "/assets/blog-1.webp";

  return (
    <>
      {/* Sticky Navigation bar */}
      <Header />
      {/* Hero Section */}
      <section
        className="breadcrumb_area relative py-24 md:py-32 lg:py-40 bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Purple Transparent Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgb(149, 0, 149, 0.8)' }} // Purple with 50% opacity
        ></div>

        {/* Centered Content */}
        <div className="relative z-10">
          {/* Page Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Blog Details
          </motion.h2>

          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center text-white space-x-2"
          >
            <Link href="/" className="hover:text-purple-300 transition-colors">
              Home
            </Link>
            <ArrowRight />
            <Link href="/bloglist" className="hover:text-purple-300 transition-colors">
              Blog
            </Link>
            <ArrowRight />
            <span className="text-purple-300">
              {blog.title}
            </span>
          </motion.div>
        </div>
      </section>
      {/* Blog section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-8/12">
              <article className="bg-white rounded-lg overflow-hidden mb-8 transition-all">
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                  <img 
                    src={getImageUrl(blog)} 
                    alt={blog.title} 
                    className="w-full h-full object-cover" 
                  />
                  {blog.category && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-black text-white px-3 py-1 rounded-full text-xs font-medium">
                      {blog.category.name}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-purple-600 text-sm mb-4">
                    <span className="flex items-center">
                      <User className="mr-2" />
                      By Admin
                    </span>
                    <span className="flex items-center">
                      <CalendarDays className="mr-2" />
                      {formatDate(blog.published_at)}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="mr-2" />
                      Comments (0)
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 font-medium mb-4">
                    {blog.excerpt}
                  </p>
                </div>
              </article>

              {/* Blog Content */}
              <div className="mx-auto p-6 bg-white">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>

              {/* Tags */}
              <div className="mx-auto mt-10 border-t pt-6">
                {/* Tags Section */}
                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <span className="font-bold text-lg text-purple-900">Tags:</span>
                  {blog.tags && blog.tags.length > 0 ? (
                    blog.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/bloglist?tag=${tag.slug}`}
                        className="bg-black text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-purple-900 transition-colors"
                      >
                        {tag.name}
                      </Link>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No tags</span>
                  )}
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center space-x-4 mb-6">
                  {[FacebookIcon, TwitchIcon, LinkedinIcon].map((Icon, index) => (
                    <span
                      key={index}
                      className="w-10 h-10 flex items-center justify-center border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
                    >
                      <Icon className="text-lg" />
                    </span>
                  ))}
                </div>

                {/* Previous & Next Blog Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {/* Previous Post */}
                  {previousBlog ? (
                    <Link
                      href={`/blogs/${previousBlog.slug}`}
                      className="bg-black text-white p-4 rounded-lg flex items-center group hover:bg-purple-900 transition-colors"
                    >
                      <img
                        src={getImageUrl(previousBlog)}
                        alt="Previous Post"
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <span className="text-purple-400 text-sm font-bold">« PREVIOUS</span>
                        <h3 className="font-semibold text-lg group-hover:text-purple-300 transition-colors">
                          {previousBlog.title}
                        </h3>
                      </div>
                    </Link>
                  ) : (
                    <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                      <div>
                        <span className="text-gray-400 text-sm font-bold">« PREVIOUS</span>
                        <h3 className="font-semibold text-lg text-gray-400">
                          No previous post
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Next Post */}
                  {nextBlog ? (
                    <Link
                      href={`/blogs/${nextBlog.slug}`}
                      className="bg-black text-white p-4 rounded-lg flex items-center justify-end text-right group hover:bg-purple-900 transition-colors"
                    >
                      <div>
                        <span className="text-purple-400 text-sm font-bold">NEXT »</span>
                        <h3 className="font-semibold text-lg group-hover:text-purple-300 transition-colors">
                          {nextBlog.title}
                        </h3>
                      </div>
                      <img
                        src={getImageUrl(nextBlog)}
                        alt="Next Post"
                        className="w-16 h-16 object-cover rounded-md ml-4"
                      />
                    </Link>
                  ) : (
                    <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-end text-right">
                      <div>
                        <span className="text-gray-400 text-sm font-bold">NEXT »</span>
                        <h3 className="font-semibold text-lg text-gray-400">
                          No next post
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* sidebar (Right Column) */}
            <div className="lg:w-4/12">
              {/* Search Widget*/}
              <div className="bg-purple-50 shadow-md rounded-lg p-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 outline-none"
                  />
                  <button className="bg-purple-600 text-white px-4 py-2">
                    <Search />
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-purple-50 shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-purple-700 font-semibold text-lg mb-3">
                  CATEGORIES
                </h3>
                {categories.map((category) => (
                  <ul key={category.id} className="space-y-2 font-medium text-gray-800">
                    <Link href='#' className="flex justify-between">
                      {category.name} <span className='text-purple-600'>({category.blogs_count})</span>
                    </Link>
                  </ul>
                ))}
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-purple-50 shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-purple-700 font-semibold text-lg mb-3">
                  RECENT POST
                </h3>
                <div className="space-y-4">
                  {recentBlogs.length > 0 ? (
                    recentBlogs.map((blog) => (
                      <div key={blog.id} className="flex items-center space-x-4">
                        <img
                          src={getImageUrl(blog)}
                          alt="Recent Post"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-purple-500 text-sm flex items-center">
                            <CalendarDays className="mr-1" /> {formatDate(blog.published_at)}
                            <span className='ml-3'>Comments (0)</span>
                          </p>
                          <h4 className="text-gray-700 font-semibold">
                            <Link href={`/blogs/${blog.slug}`}>
                              {blog.title}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No recent posts available.</p>
                  )}
                </div>
              </div>

              {/* Tags Widget */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700">POPULAR TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags && popularTags.length > 0 ? (
                    popularTags.map((tag) => (
                      <Link 
                        key={tag.id} 
                        href={`/bloglist?tag=${tag.slug}`} 
                        className="bg-gray-100 border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-2"
                      >
                        <span>{tag.name}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                          {tag.blogs_count}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No tags available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default BlogDetails;