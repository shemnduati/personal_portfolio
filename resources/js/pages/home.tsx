import { type SharedData } from '@/types';
import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/components/Sections/navbar';
import Hero from '@/components/Sections/hero';
import Services from '@/components/Sections/service';
import Portfolio from '@/components/Sections/works';
import Experience from '@/components/Sections/experience';
import Skill from '@/components/Sections/skill';
import Testimonials from '@/components/Sections/testimonials';
import Blogs from '@/components/Sections/blog';
import Contact from '@/components/Sections/contact';
import Footer from '@/components/Sections/footer';
import {  Mail, MapPin, MessageSquare, MoveDownRight,  MoveUp,  MoveUpRight,  PhoneCall,  QuoteIcon,  Twitter } from 'lucide-react';
import { delay, motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const { auth } = usePage<SharedData>().props;


 
    return (
        <>
            <Head title="Shem Nduati">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className='container-fluid'>
            <Navbar />
            <Hero />
            <Services />
            <Portfolio />
            <Experience />
            <Skill/>
            <Testimonials />
            <Blogs />
            <Contact />
            <Footer />
             {/* Back to Top Button */}
                <button className="fixed bottom-6 right-6 bg-white border border-purple-600 rounded-full p-3 shadow-lg hover:bg-purple-600 hover:text-white transition"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <MoveUp className='text-purple-700 hover:text-white' />
                </button>
            </div>
           
        </>
    );
}
