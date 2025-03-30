import React, { useState } from 'react';
import Navbar from '@/components/Sections/navbar';
import Footer from '@/components/Sections/footer';
import { Link, router } from '@inertiajs/react';
import {  ArrowRight, Calendar, CalendarDays, MessageSquare, Minus, MoveLeft, MoveRight, Quote, Search, User} from 'lucide-react';
import { motion } from 'framer-motion';
import { title } from 'process';

function blogPage() {
  
  const bg = "/assets/blog-bg.jpeg";
  const blog1 = "/assets/blog-2.webp";
  const blog2  = "/assets/blog-1.webp";
  const blog3 = "/assets/blog-4.webp";


  const blogPosts = [
    {
      id: 1,
      title: "The Role of Technology in Modern Logistics Management",
      excerpt: "Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis...",
      image: blog1,
      category: "Tutorial",
      date: "11 Jul, 2023",
      author: "Admin",
      comments: 3,
      href: "/blog-details"
    },
    {
      id: 2,
      title: "Latest Trends in Web Development",
      excerpt: "Explore the newest technologies and frameworks shaping the future of web development...",
      image: blog3,
      category: "Technology",
      date: "15 Aug, 2023",
      author: "Admin",
      comments: 5,
      href: "/blog-details"
    },
    {
      id: 3,
      title: "The Role of Technology in Modern Logistics Management33",
      excerpt: "Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis...",
      image: blog1,
      category: "Tutorial",
      date: "11 Jul, 2023",
      author: "Admin",
      comments: 3,
      href: "/blog-details"
    },
    {
      id: 4,
      title: "Latest Trends in Web Development33",
      excerpt: "Explore the newest technologies and frameworks shaping the future of web development...",
      image: blog3,
      category: "Technology",
      date: "15 Aug, 2023",
      author: "Admin",
      comments: 5,
      href: "/blog-details"
    },
    {
      id: 5,
      title: "The Role of Technology in Modern Logistics Management33",
      excerpt: "Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis...",
      image: blog1,
      category: "Tutorial",
      date: "11 Jul, 2023",
      author: "Admin",
      comments: 3,
      href: "/blog-details"
    },
    {
      id: 6,
      title: "Latest Trends in Web Development33",
      excerpt: "Explore the newest technologies and frameworks shaping the future of web development...",
      image: blog3,
      category: "Technology",
      date: "15 Aug, 2023",
      author: "Admin",
      comments: 5,
      href: "/blog-details"
    }
    
    
  ];

  const recentBlogs = [
    {
      id: 1,
      title: "The Role of Technology in Modern Logistics Management",
      image: blog1,
      date: "11 Jul, 2023",
      comments: 3
    },
    {
      id: 2,
      title: "Real-world Examples of Successful JIT Logistics",
      image: blog2,
      date: "15 Aug, 2023",
      comments: 5
    }
  ];

  const categories = [
    { id: 1, name: "Tutorial", count: 2 },
    { id: 2, name: "Technology", count: 1 },
    { id: 3, name: "Bussiness", count: 3 },
    { id: 4, name: "Fintech", count: 5 },
  ];

  const popularTags = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Tutorial" },
    { id: 3, name: "Logistics" }
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const postsPerpage = 2;
  const totalPages = Math.ceil(blogPosts.length / postsPerpage);

  //Calculate the start and end index for the current page
  const indexOfLastPost = currentPage * postsPerpage;
  const indexOfFirstPost = indexOfLastPost - postsPerpage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate the range of pagination numbers (max of 5 numbers)
  const maxPagesToShow = 5;
  let startPage =  Math.max(1, currentPage - Math.floor(maxPagesToShow /2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Ensure we always show 5 pages when possible
  if (endPage - startPage < maxPagesToShow -1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Generate page numbers for rendering
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }



  
  return (
    <>
      {/* Sticky Navigation bar */}
     <Navbar />
      {/* Blog header */}
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
            Blog
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
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-8/12">
             {/**/}
              <article className="bg-purple-200/25 rounded-lg shadow-md overflow-hidden mb-8 transition-all hover:shadow-lg">
                <div className="relative">
                  <Link href='/bloglist'>
                    <img src={blog2} alt='Blog Post' className='w-full h-auto' />
                  </Link>
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-black text-white px-3 py-1 rounded-full text-xs font-medium">Tutorial</span>
                </div>
                <div className="p-6">
                  <div className="flex flexe-wrap items-center gap-4 text-purple-600 text-sm mb-4">
                    <span className="flex items-center">
                      <User />
                      By Admin
                    </span>
                    <span className="flex items-center">
                      <CalendarDays />
                      11 Jul, 2023
                    </span>
                    <span className="flex items-center">
                      <MessageSquare />
                      Comments (3)
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                    <Link href="/blog-details" className="hover:text-primary transition-colors">
                      The Role of Technology in Modern Logistics Management
                    </Link>
                  </h3>
                  <p className="text-gray-700 font-medium mb-4">
                    Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui
                    dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...
                  </p>
                  <Link 
                      href="/blog-details" 
                      className="inline-block bg-gradient-to-r from-purple-600 to-black text-white font-medium px-6 py-2 rounded-full hover:bg-primary-dark transition-colors"
                    >
                      Read more
                    </Link>
                </div>
              </article>
              {/* Blockquotes */}
              <div className="bg-black rounded-md border-1-4 border-primary p-8 mb-8">
                <Quote className='text-gray-200' />
                <p className="text-lg italic text-gray-200 mb-4 mt-4">
                  "Welcome to our blog, where we celebrate our achievement as an AWS SaaS Competency Partner
                  and share insights on how we accomplished this significant milestone..."
                </p>
                 <p className="font-semibold text-white"> <Minus className='text-purple-400' />Silvester Scott </p>
              </div>

                {/* Blog Posts */}

                {currentPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-purple-50 rounded-lg shadow-md overflow-hidden mb-8 transition-all hover:shadow-lg"
                  >
                    <div className="relative">
                      <Link href={post.href}>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-auto"
                        />
                      </Link>
                      <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-black text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-purple-600 text-sm mb-4">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          By {post.author}
                        </span>
                        <span className="flex items-center">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Comments ({post.comments})
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
                        <Link href={post.href} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700 font-medium mb-4">
                        {post.excerpt}
                      </p>
                      <Link 
                        href={post.href} 
                        className="inline-block bg-gradient-to-r from-purple-600 to-black text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                      >
                        Read more
                      </Link>
                    </div>
                  </article>
                ))}
             
               {/* Pagination */}
               <div className="flex justify-center mt-10">
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-black"
                    }`}
                  >
                    <MoveLeft className="text-white" />
                  </button>

                  {/* Page Numbers */}
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`w-10 h-10 flex items-center justify-center font-semibold rounded-full ${
                        currentPage === number 
                          ? "bg-blue-600 text-white" // Active Page -> Blue
                          : "bg-gradient-to-r from-purple-600 to-black text-white"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-black"
                    }`}
                  >
                    <MoveRight className="text-white" />
                  </button>
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
           
                {/* Categories  Widget */}
                <div className="bg-purple-50 shadow-md rounded-lg p-4 mb-6">
                  <h3 className="text-purple-700 font-semibold text-lg mb-3">
                    CATEGORIES
                  </h3>
                  {categories.map((category) => (
                    <ul key={category.id} className="space-y-2 font-medium text-gray-800">
                      <Link href='#' className="flex justify-between">
                        {category.name} <span className='text-purple-600'>({category.count})</span>
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
                  {recentBlogs.map((blog) =>(
                    <div key={blog.id} className="flex items-center space-x-4">
                    <img
                      src={blog.image}
                      alt="Recent Post"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-purple-500 text-sm flex items-center">
                        <CalendarDays className="mr-1" /> {blog.date}
                        <span className='ml-3'>Comments ({blog.comments})</span>
                      </p>
                      <h4 className="text-gray-700 font-semibold">
                       {blog.title}
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
                {popularTags.map((tag) => (
                  <Link key={tag.id} href="#" className="bg-gray-100 border-1 border-purple-700 text-purple-700 hover:bg-purple-700 font-medium hover:text-white px-3 py-1 rounded-full text-sm transition-colors">
                 {tag.name}
                </Link>
                ))}
                {/* Add more tags */}
              </div>
            </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default blogPage