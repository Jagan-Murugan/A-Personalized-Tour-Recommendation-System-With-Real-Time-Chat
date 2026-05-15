import React, { useState } from 'react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface Tour {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  category: string[];
  difficulty: string;
  bestFor: string[];
  highlights: string[];
  reviews: Review[];
}

interface ToursPageProps {
  tours: Tour[];
  onBack: () => void;
  onViewTour: (tour: Tour) => void;
  onBookTour: (tour: Tour) => void;
}

const ToursPage: React.FC<ToursPageProps> = ({ tours, onBack, onViewTour, onBookTour }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: 'All Tours', icon: '🌍' },
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'culture', label: 'Cultural', icon: '🏛️' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
    { id: 'beach', label: 'Beach', icon: '🏖️' },
    { id: 'wildlife', label: 'Wildlife', icon: '🦁' },
    { id: 'wellness', label: 'Wellness', icon: '🧘' },
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'budget', label: 'Under ₹1,00,000' },
    { id: 'mid', label: '₹1,00,000 - ₹1,50,000' },
    { id: 'premium', label: 'Above ₹1,50,000' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter and sort tours
  let filteredTours = tours.filter(tour => {
    const matchesCategory = selectedCategory === 'all' || tour.category.includes(selectedCategory);
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tour.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === 'budget') matchesPrice = tour.price < 100000;
    else if (priceRange === 'mid') matchesPrice = tour.price >= 100000 && tour.price <= 150000;
    else if (priceRange === 'premium') matchesPrice = tour.price > 150000;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort tours
  if (sortBy === 'price-low') {
    filteredTours = [...filteredTours].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredTours = [...filteredTours].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredTours = [...filteredTours].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920"
            alt="Tours Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <div className="relative z-10 text-center px-4">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm mb-4">
            🌟 Handpicked Experiences
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Explore Our Tours
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover extraordinary journeys curated for unforgettable memories
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tours, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{filteredTours.length}</span> tours
            </p>
          </div>

          {filteredTours.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No tours found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map((tour, idx) => (
                <div
                  key={tour.id}
                  className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {tour.duration}
                      </span>
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {tour.difficulty}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full">
                      <span className="text-white text-xs">⭐</span>
                      <span className="text-white text-xs font-semibold">{tour.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {tour.title}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center mt-1">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {tour.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {tour.description}
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tour.category.slice(0, 3).map(cat => (
                        <span key={cat} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-gray-400">
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-xl font-bold text-emerald-400">{formatCurrency(tour.price)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewTour(tour)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onBookTour(tour)}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg text-sm font-medium transition-all"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ToursPage;
