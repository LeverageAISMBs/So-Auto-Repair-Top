import React from 'react';
import { ScrollDownIcon } from './Icons';

const Hero: React.FC = () => {
    return (
        <section className="min-h-screen h-screen flex items-center justify-center relative pt-16 bg-gradient-to-br from-primary-dark to-primary">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="text-center z-10 p-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                    Find Southern Oregon's
                    <span className="block text-accent-yellow">Trusted Auto Shops</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                    From Medford to Klamath Falls, your search for reliable, vetted auto care ends here. Browse our directory of local mechanics and service centers.
                </p>
                <a href="#directory" className="bg-accent-yellow text-primary-dark font-bold text-lg px-8 py-3 rounded-lg shadow-xl hover:bg-accent-yellow-dark hover:-translate-y-0.5 transform transition-all duration-300">
                    Start Your Search
                </a>
            </div>
            <a href="#directory" className="scroll-down absolute bottom-8 left-1/2 -translate-x-1/2" aria-label="Scroll down to directory">
                <ScrollDownIcon className="w-8 h-8 text-white/70" />
            </a>
        </section>
    );
};

export default Hero;
