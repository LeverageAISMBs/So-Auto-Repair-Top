import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
    return (
        <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 left-0 z-40">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="#" className="flex-shrink-0 flex items-center" aria-label="Home">
                        <LogoIcon className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl ml-2 text-primary-dark">SO Auto Directory</span>
                    </a>
                    <div className="hidden md:block">
                        <a href="#directory" className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors">Find a Shop</a>
                        <a href="mailto:info@soautodirectory.com" className="ml-4 bg-primary text-white font-medium px-4 py-2 rounded-md shadow-sm hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-px">List Your Shop</a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
