import React from 'react';
import { Mail, MapPin, PhoneCall } from 'lucide-react';

function contact() {
  return (
    <>
    <section className="bg-gray-100 py-16 lg:px-20" id="contact">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left Column - Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Let's work together!</h2>
                    <p className="text-gray-600 mb-6">I design and code beautifully simple things and I love what I do.</p>
                    <form>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="border p-3 rounded-md" />
                            <input type="text" placeholder="Last Name" className="border p-3 rounded-md" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <input type="email" placeholder="Email Address" className="border p-3 rounded-md" />
                            <input type="tel" placeholder="Phone Number" className="border p-3 rounded-md" />
                        </div>
                        <select className="w-full border p-3 rounded-md mt-4">
                            <option>Choose Service</option>
                            <option>Web Development</option>
                            <option>UI/UX Design</option>
                        </select>
                        <textarea placeholder="Message" className="w-full border p-3 rounded-md mt-4" rows="4"></textarea>
                        <button className="bg-gradient-to-r from-purple-600 to-black text-white font-semibold py-3 mt-4 rounded-3xl lg:w-1/4 sm:w-1/2 px-4 md:col-span-2 hover:opacity-90 transition">Send Message</button>
                    </form>
                </div>

                {/* Right Column - Contact Info */}
                <div className="lg:pl-10 flex flex-col-reverse justify-center">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-purple-600 to-black p-3 rounded-full">
                                <PhoneCall className='text-white' />
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold">Phone</p>
                                <p className="text-gray-900">+254 715 511 1302</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-purple-600 to-black p-3 rounded-full">
                                <Mail className='text-white' />
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold">Email</p>
                                <p className="text-gray-900">nduatishem@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-purple-600 to-black p-3 rounded-full">
                                <MapPin className='text-white'/>
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold">Address</p>
                                <p className="text-gray-900">
                                    Nairobi, Kenya
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default contact