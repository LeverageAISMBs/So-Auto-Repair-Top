import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary-dark text-white/80 mt-12 py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Southern Oregon Auto Directory. All rights reserved.</p>
                <p className="text-sm mt-2">Data sourced from the Southern Oregon Auto Shop Economics and Digital Reach Report.</p>
                <p className="text-xs mt-4 text-white/60">Powered by LEVERAGEAI LLC</p>
            </div>
        </footer>
    );
};

export default Footer;