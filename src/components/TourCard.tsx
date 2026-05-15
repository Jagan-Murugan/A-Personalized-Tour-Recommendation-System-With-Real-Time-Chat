import React from 'react';

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
  reviews: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

interface TourCardProps {
  tour: Tour;
  onViewDetails: () => void;
  onBook: () => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onViewDetails, onBook }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all duration-500 card-hover">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden img-zoom">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        {/* Category Tags */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tour.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20"
            >
              {cat}
            </span>
          ))}
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-white text-sm font-semibold">{tour.rating}</span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
          {tour.duration}
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
          tour.difficulty === 'Easy' ? 'bg-green-500/80 text-white' :
          tour.difficulty === 'Moderate' ? 'bg-yellow-500/80 text-black' :
          'bg-red-500/80 text-white'
        }`}>
          {tour.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {tour.title}
          </h3>
          <p className="text-gray-400 text-sm flex items-center mt-1">
            <span className="mr-1.5">📍</span>
            {tour.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
          {tour.description}
        </p>

        {/* Best For Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tour.bestFor.slice(0, 3).map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 bg-slate-700 text-gray-300 text-xs rounded-md capitalize"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Price & Actions */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-700">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-orange-400">{formatCurrency(tour.price)}</p>
            <p className="text-xs text-gray-500">per person</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onViewDetails}
              className="px-4 py-2 text-sm font-medium text-gray-300 border border-slate-600 rounded-lg hover:border-orange-500 hover:text-orange-400 transition-all"
            >
              Details
            </button>
            <button
              onClick={onBook}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg shadow-orange-500/20"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
