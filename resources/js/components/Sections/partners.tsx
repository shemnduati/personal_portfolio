import React, { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

interface Partner {
    id: number;
    name: string;
    logo: string;
    website: string;
}

interface Props {
    partners?: Partner[];
}

interface PageProps {
    partners: Partner[];
}

export default function Partners() {
    const { partners = [] } = usePage<PageProps>().props;
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || partners.length === 0) return;

        const container = containerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (scrollWidth <= clientWidth) return;

        let scrollPosition = 0;
        const scrollSpeed = 1;
        const gap = 40;
        
        const scroll = () => {
            if (!container) return;

            scrollPosition += scrollSpeed;
            
            if (scrollPosition >= scrollWidth / 2) {
                scrollPosition = 0;
            }

            container.scrollLeft = scrollPosition;
            requestAnimationFrame(scroll);
        };

        // Clone items for infinite scroll
        const originalItems = container.innerHTML;
        container.innerHTML = originalItems + originalItems;

        requestAnimationFrame(scroll);

        return () => {
            container.innerHTML = originalItems;
        };
    }, [partners]);

    if (!partners || partners.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                        My Partners
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        I am proud to collaborate with industry leaders and innovative companies 
                        who share my vision for excellence. Together, we create impactful solutions 
                        and drive technological advancement.
                    </p>
                </div>
                
                <div 
                    ref={containerRef}
                    className="overflow-hidden whitespace-nowrap"
                >
                    <div className="inline-flex gap-10 items-center justify-center">
                        {partners.map((partner) => (
                            <a
                                key={partner.id}
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-[200px] h-[100px] bg-white rounded-lg p-4 transition-transform hover:scale-110 shadow-sm hover:shadow-md"
                            >
                                <img
                                    src={`/storage/${partner.logo}`}
                                    alt={partner.name}
                                    className="max-w-full max-h-full w-auto h-auto object-contain grayscale hover:grayscale-0 transition-all"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 