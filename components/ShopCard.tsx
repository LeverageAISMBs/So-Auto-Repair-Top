import React from 'react';
import type { Shop } from '../types';

interface ShopCardProps {
    shop: Shop;
    onSelect: (shop: Shop) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(shop)}
            className="group bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer flex flex-col justify-between h-full"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onSelect(shop)}
            aria-label={`View details for ${shop.name}`}
        >
            <div>
                <h3 className="text-xl font-bold text-primary-dark">{shop.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{shop.city}</p>
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">{shop.description}</p>
            </div>
            <span className="mt-4 inline-block text-primary font-semibold group-hover:text-primary-dark transition-colors">
                View Details &rarr;
            </span>
        </div>
    );
};

export default ShopCard;