import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ShopCard from './components/ShopCard';
import ShopModal from './components/ShopModal';
import Footer from './components/Footer';
import AnimatedWrapper from './components/AnimatedWrapper';
import { shopData } from './constants/shopData';
import type { Shop } from './types';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All Regions');
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

    const cities = useMemo(() => {
        const uniqueCities = [...new Set(shopData.map(shop => shop.city))].sort();
        return ['All Regions', ...uniqueCities];
    }, []);

    const filteredShops = useMemo(() => {
        return shopData.filter(shop => {
            const nameMatch = shop.name.toLowerCase().includes(searchTerm.toLowerCase());
            const cityMatch = (selectedCity === 'All Regions' || shop.city === selectedCity);
            return nameMatch && cityMatch;
        });
    }, [searchTerm, selectedCity]);

    const handleSelectShop = (shop: Shop) => {
        setSelectedShop(shop);
    };

    const handleCloseModal = () => {
        setSelectedShop(null);
    };

    return (
        <>
            <Header />
            <Hero />
            <main id="directory" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <FilterBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    cities={cities}
                />

                {filteredShops.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredShops.map((shop, index) => (
                           <AnimatedWrapper key={`${shop.name}-${index}`} delay={`duration-${300 + (index % 3) * 100}`}>
                             <ShopCard shop={shop} onSelect={handleSelectShop} />
                           </AnimatedWrapper>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-2xl font-semibold text-gray-700">No Shops Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter settings.</p>
                    </div>
                )}
            </main>
            <Footer />
            <ShopModal shop={selectedShop} onClose={handleCloseModal} />
        </>
    );
};

export default App;
