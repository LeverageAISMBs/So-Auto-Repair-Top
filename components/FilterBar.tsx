import React from 'react';
import { SearchIcon } from './Icons';

interface FilterBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    cities: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ searchTerm, setSearchTerm, selectedCity, setSelectedCity, cities }) => {
    return (
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-lg shadow-lg rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                    <label htmlFor="searchInput" className="sr-only">Search by name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Search by shop name..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-shrink-0 w-full md:w-64">
                    <label htmlFor="cityFilter" className="sr-only">Filter by city</label>
                    <select
                        id="cityFilter"
                        className="w-full py-2 px-4 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
