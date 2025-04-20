import React, { useState } from 'react';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-100 py-16 lg:px-20" id="contact">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left Column - Contact Form */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Let's work together!</h2>
                    <p className="text-gray-600 mb-6">I design and code beautifully simple things and I love what I do.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full border p-3 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full border p-3 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className="w-full border p-3 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                className="w-full border p-3 rounded-md"
                                rows={4}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-purple-600 to-black text-white font-semibold py-3 rounded-3xl w-full md:w-auto px-8 hover:opacity-90 transition disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
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
  );
}

export default Contact;