import React, { useEffect, useRef } from 'react';
import type { Shop } from '../types';
import { CloseIcon, WebsiteIcon, ProfileIcon, SearchIcon } from './Icons';

interface ShopModalProps {
    shop: Shop | null;
    onClose: () => void;
}

const ModalLink: React.FC<{ href: string; text: string; icon: React.ReactNode }> = ({ href, text, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center w-full text-left bg-gray-100 p-3 rounded-lg transition-all duration-200 hover:bg-gray-200 hover:shadow-sm hover:scale-105"
    >
        <span className="flex-shrink-0 w-6 h-6 text-primary">{icon}</span>
        <span className="ml-3 font-medium text-gray-800">{text}</span>
        <span className="ml-auto text-gray-400 text-xl">&rarr;</span>
    </a>
);

const ShopModal: React.FC<ShopModalProps> = ({ shop, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (shop) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [shop, onClose]);

    if (!shop) {
        return null;
    }
    
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(shop.name + ' ' + shop.city)}`;

    const modalClasses = `fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        shop ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`;
    const contentClasses = `bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
        shop ? 'scale-100 translate-y-0' : 'scale-95 translate-y-5'
    }`;

    return (
        <div className={modalClasses} onClick={onClose} role="dialog" aria-modal="true">
            <div className={contentClasses} onClick={(e) => e.stopPropagation()} ref={modalRef}>
                <div className="flex justify-between items-start p-5 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm">
                    <div className="flex-1 pr-4">
                        <h2 className="text-2xl font-bold text-primary-dark">{shop.name}</h2>
                        <p className="text-md text-gray-600">{shop.city}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close modal">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">{shop.description}</p>
                    <div className="mt-6 space-y-3">
                        {shop.website && (
                            <ModalLink href={shop.website} text="Visit Website" icon={<WebsiteIcon />} />
                        )}
                        {shop.profile && (
                            <ModalLink href={shop.profile} text="View Online Profile" icon={<ProfileIcon />} />
                        )}
                        <ModalLink href={googleSearchUrl} text="Search on Google" icon={<SearchIcon className="w-5 h-5" />} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;
