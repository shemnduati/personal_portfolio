import React from 'react';
import Navbar from '@/components/Sections/navbar';
import Header from '@/components/Sections/navbarPages';
import Footer from '@/components/Sections/footer';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {  ArrowRight, Calendar, CalendarDays, FacebookIcon, LinkedinIcon, MessageSquare, Minus, MoveLeft, MoveRight, Quote, Search, TwitchIcon, User} from 'lucide-react';

function blogDetails() {
    const bg = "/assets/blog-bg.jpeg";
    const blog1 = "/assets/blog-2.webp";
    const blog2  = "/assets/blog-1.webp";

    const blogPost = [
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
              Blog Details
            </Link>
          </motion.div>
        </div>
      </section>
      {/* Blog section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-8/12">
            {/**/}
            <article className="bg-white rounded-lg  overflow-hidden mb-8 transition-all">
                <div className="relative">
                <p>
                    <img src={blog2} alt='Blog Post' className='w-full h-auto' />
                </p>
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
                    <p className="hover:text-primary transition-colors">
                    The Role of Technology in Modern Logistics Management
                    </p>
                </h3>
                <p className="text-gray-700 font-medium mb-4">
                    Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui
                    dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...
                </p>
                
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


            <div className=" mx-auto p-6 bg-white ">
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-purple-900 mb-4">
                    The Role of Technology in Modern Logistics Management
                </h1>

                {/* Introduction */}
                <p className="text-gray-700 mb-4">
                    Welcome to our blog, where we celebrate our achievement as an AWS SaaS Competency Partner and share insights on how we accomplished this significant milestone.
                </p>

                <p className="text-gray-700 mb-4">
                    As businesses unlock growth opportunities in the digital age, harnessing the power of cloud computing has become essential. Amazon Web Services (AWS) offers the AWS SaaS Competency Partner program, recognizing companies with exceptional expertise in delivering Software-as-a-Service solutions on the AWS platform.
                </p>

                <p className="text-gray-700 mb-4">
                    In this blog, we will delve into the strategies, best practices, and key factors that accelerated our business growth and earned us the prestigious AWS SaaS Competency Partner status.
                </p>

                <p className="text-gray-700 mb-6">
                    Explore the transformative impact of technology on logistics management. Discuss how technologies like IoT, AI, and blockchain are reshaping the industry and improving efficiency.
                </p>

                {/* Key Points */}
                <h2 className="text-2xl font-bold text-purple-900 mb-3">Key Points</h2>
                <ul className="space-y-3">
                    {[
                    "IoT and Real-Time Tracking",
                    "Artificial Intelligence in Route Optimization and Predictive Analytics",
                    "Blockchain for Enhanced Transparency and Security",
                    "Warehouse Automation and Robotics",
                    ].map((point, index) => (
                    <li key={index} className="flex items-center text-gray-800 font-medium">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm mr-2">
                        ✓
                        </span>
                        {point}
                    </li>
                    ))}
                </ul>

                {/* Conclusion */}
                <h2 className="text-2xl font-bold text-purple-900 mt-6 mb-3">Conclusion</h2>
                <p className="text-gray-700 mb-4">
                    Emphasize the long-term benefits of integrating sustainable practices into logistics operations, both for the planet and a company's reputation.
                </p>
                <p className="text-gray-700">
                    These outlines can be expanded into comprehensive blog posts, each providing valuable insights and information on the respective topics.
                </p>
                </div>

                 {/*Tags */}

                <div className=" mx-auto mt-10 border-t pt-6">
                    {/* Tags Section */}
                    <div className="flex items-center flex-wrap gap-3 mb-6">
                        <span className="font-bold text-lg text-purple-900">Tags:</span>
                        {["Business", "Analysis", "Technology", "Design", "Strategy", "Tips"].map((tag, index) => (
                        <span
                            key={index}
                            className="bg-black text-white text-sm font-semibold px-4 py-1.5 rounded-full"
                        >
                            {tag}
                        </span>
                        ))}
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
                    <div className="grid grid-cols-2 gap-4">
                        {/* Previous Post */}
                        <div className="bg-black text-white p-4 rounded-lg flex items-center">
                        <img
                            src={blog2} // Replace with actual image
                            alt="Previous Post"
                            className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                            <span className="text-purple-400 text-sm font-bold">« PREVIOUS</span>
                            <h3 className="font-semibold text-lg">
                            Building a Real Estate Website Tips and Ideas
                            </h3>
                        </div>
                        </div>

                        {/* Next Post */}
                        <div className="bg-black text-white p-4 rounded-lg flex items-center justify-end text-right">
                        <div>
                            <span className="text-purple-400 text-sm font-bold">NEXT »</span>
                            <h3 className="font-semibold text-lg">
                            Architecture Is Not Based On Concrete And Steel
                            </h3>
                        </div>
                        <img
                            src={blog1} // Replace with actual image
                            alt="Next Post"
                            className="w-16 h-16 object-cover rounded-md ml-4"
                        />
                        </div>
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
     {/* Footer */}
    <Footer />
   </>
  )
}

export default blogDetails