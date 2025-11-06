import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ShopCard from './components/ShopCard';
import Footer from './components/Footer';
import AnimatedWrapper from './components/AnimatedWrapper';
import Pagination from './components/Pagination';
import { shopData } from './constants/shopData';
import type { Shop } from './types';

const ShopModal = lazy(() => import('./components/ShopModal'));

const SHOPS_PER_PAGE = 9;

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All Regions');
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCity]);
    
    const totalPages = Math.ceil(filteredShops.length / SHOPS_PER_PAGE);
    const paginatedShops = useMemo(() => {
        const startIndex = (currentPage - 1) * SHOPS_PER_PAGE;
        const endIndex = startIndex + SHOPS_PER_PAGE;
        return filteredShops.slice(startIndex, endIndex);
    }, [filteredShops, currentPage]);


    const handleSelectShop = (shop: Shop) => {
        setSelectedShop(shop);
    };

    const handleCloseModal = () => {
        setSelectedShop(null);
    };
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' });
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

                {paginatedShops.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedShops.map((shop, index) => (
                               <AnimatedWrapper key={`${shop.name}-${index}`} delay={`duration-${300 + (index % 3) * 100}`}>
                                 <ShopCard shop={shop} onSelect={handleSelectShop} />
                               </AnimatedWrapper>
                            ))}
                        </div>
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-2xl font-semibold text-gray-700">No Shops Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter settings.</p>
                    </div>
                )}
            </main>
            <Footer />
            <Suspense fallback={<div />}>
                <ShopModal shop={selectedShop} onClose={handleCloseModal} />
            </Suspense>
        </>
    );
};

export default App;