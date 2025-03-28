import { type SharedData } from '@/types';
import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/components/Sections/navbar';
import Hero from '@/components/Sections/hero';
import Services from '@/components/Sections/service';
import Portfolio from '@/components/Sections/works';
import {  MoveDownRight,  MoveUpRight,  Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

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
            
            </div>
           
        </>
    );
}
