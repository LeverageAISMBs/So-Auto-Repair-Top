import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
    const handleScrollToDirectory = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 left-0 z-40">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="https://web-design.leverageai.network" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex items-center" aria-label="Home">
                        <LogoIcon className="h-8 w-8 text-primary" />
                        <div className="ml-2">
                            <span className="block font-bold text-xl text-primary-dark leading-tight">SO Auto Directory</span>
                            <span className="block text-xs text-gray-500 leading-tight">Powered by LEVERAGEAI LLC</span>
                        </div>
                    </a>
                    <div className="hidden md:block">
                        <a href="#directory" onClick={handleScrollToDirectory} className="text-gray-600 hover:text-primary font-medium px-3 py-2 rounded-md transition-colors">Find a Shop</a>
                        <a href="mailto:info@soautodirectory.com" className="ml-4 bg-primary text-white font-medium px-4 py-2 rounded-md shadow-sm hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-px">List Your Shop</a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;