import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Sections/navbar';
import Footer from '@/components/Sections/footer';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, CalendarDays, MessageSquare, Minus, MoveLeft, MoveRight, Quote, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  blogs_count: number;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  blogs_count: number;
}

interface PageProps {
  blogs: Blog[];
  categories: Category[];
  currentCategory: string | null;
  currentTag: string | null;
  popularTags: Tag[];
  [key: string]: any;
}

function BlogPage() {
  const { blogs, categories, currentCategory, currentTag, popularTags } = usePage<PageProps>().props;
  
  const bg = "/assets/blog-bg.jpeg";
  const blog1 = "/assets/blog-2.webp";
  const blog2 = "/assets/blog-1.webp";
  const blog3 = "/assets/blog-4.webp";

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

  const recentBlogs = blogs.slice(0, 2);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerpage = 2;
  const totalPages = Math.ceil(blogs.length / postsPerpage);

  // Calculate the current page's posts
  const indexOfLastPost = currentPage * postsPerpage;
  const indexOfFirstPost = indexOfLastPost - postsPerpage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section
        className="breadcrumb_area relative py-24 md:py-32 lg:py-40 bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Purple Transparent Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgb(149, 0, 149, 0.8)' }}
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
            {currentCategory 
              ? `Category: ${categories.find(c => c.slug === currentCategory)?.name}` 
              : currentTag 
                ? `Tag: ${popularTags.find(t => t.slug === currentTag)?.name}` 
                : 'Blog'}
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
            {currentCategory && (
              <>
                <ArrowRight />
                <span className="text-purple-300">
                  {categories.find(c => c.slug === currentCategory)?.name}
                </span>
              </>
            )}
            {currentTag && !currentCategory && (
              <>
                <ArrowRight />
                <span className="text-purple-300">
                  {popularTags.find(t => t.slug === currentTag)?.name}
                </span>
              </>
            )}
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-8/12">
              {blogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No blog posts available.</p>
                </div>
              ) : (
                <>
                  {currentPosts.map((blog) => (
                    <article key={blog.id} className="bg-purple-200/25 rounded-lg shadow-md overflow-hidden mb-8 transition-all hover:shadow-lg">
                      <div className="relative">
                        <Link href={`/blogs/${blog.slug}`}>
                          <img 
                            src={getImageUrl(blog)} 
                            alt={blog.title} 
                            className="w-full h-auto" 
                          />
                        </Link>
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
                          <Link href={`/blogs/${blog.slug}`} className="hover:text-primary transition-colors">
                            {blog.title}
                          </Link>
                        </h3>
                        <p className="text-gray-700 font-medium mb-4">
                          {blog.excerpt}
                        </p>
                        
                        {/* Blog Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map((tag) => (
                              <Link
                                key={tag.id}
                                href={`/bloglist?tag=${tag.slug}`}
                                className="bg-gray-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-purple-700 hover:text-white transition-colors"
                              >
                                {tag.name}
                              </Link>
                            ))}
                          </div>
                        )}
                        
                        <Link 
                          href={`/blogs/${blog.slug}`} 
                          className="inline-block bg-gradient-to-r from-purple-600 to-black text-white font-medium px-6 py-2 rounded-full hover:bg-primary-dark transition-colors"
                        >
                          Read More
                        </Link>
                      </div>
                    </article>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <nav className="flex items-center space-x-2">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === 1
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          <MoveLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 rounded-md ${
                              currentPage === number
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === totalPages
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          <MoveRight className="w-4 h-4" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
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
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/bloglist?category=${category.slug}`}
                      className={`flex justify-between items-center p-2 rounded-lg transition-colors ${
                        currentCategory === category.slug
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-800 hover:bg-purple-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        currentCategory === category.slug
                          ? 'bg-white text-purple-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {category.blogs_count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-purple-50 shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-purple-700 font-semibold text-lg mb-3">
                  RECENT POST
                </h3>
                <div className="space-y-4">
                  {recentBlogs.map((blog) => (
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
                  ))}
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
                        className={`border border-purple-700 font-medium px-3 py-1 rounded-full text-sm transition-colors ${
                          currentTag === tag.slug
                            ? 'bg-purple-700 text-white'
                            : 'bg-gray-100 text-purple-700 hover:bg-purple-700 hover:text-white'
                        }`}
                      >
                        {tag.name} <span className="text-xs ml-1">({tag.blogs_count})</span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No tags available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default BlogPage;