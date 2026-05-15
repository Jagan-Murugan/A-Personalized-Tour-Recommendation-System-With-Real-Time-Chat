import React, { useEffect } from 'react';

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

interface TourModalProps {
  tour: Tour;
  onClose: () => void;
  onBook: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ tour, onClose, onBook }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}>
        ★
      </span>
    ));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-700 shadow-2xl animate-scale-in">
        {/* Header Image */}
        <div className="relative h-72 md:h-80 flex-shrink-0">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center space-x-2 mb-2">
              {tour.category.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-medium rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              {tour.title}
            </h2>
            <p className="text-gray-300 flex items-center mt-2">
              <span className="mr-2">📍</span>
              {tour.location}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: '⏱️', label: 'Duration', value: tour.duration },
              { icon: '💰', label: 'Price', value: formatCurrency(tour.price), isPrice: true },
              { icon: '⭐', label: 'Rating', value: `${tour.rating}/5` },
              { icon: '🎯', label: 'Difficulty', value: tour.difficulty },
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                <p className={`font-semibold ${stat.isPrice ? 'text-orange-400' : 'text-white'}`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">📝</span> About This Adventure
            </h3>
            <p className="text-gray-400 leading-relaxed">{tour.description}</p>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">✨</span> Tour Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tour.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center text-gray-300 bg-slate-800/30 rounded-lg p-3">
                  <span className="text-orange-400 mr-3">✓</span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">👥</span> Perfect For
            </h3>
            <div className="flex flex-wrap gap-2">
              {tour.bestFor.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 text-orange-300 rounded-full text-sm capitalize"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="mr-2">⭐</span> Traveler Reviews ({tour.reviews.length})
            </h3>
            
            {tour.reviews.length > 0 ? (
              <div className="space-y-4">
                {tour.reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-lg">
                          {review.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{review.name}</p>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm">{renderStars(review.rating)}</div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-800/30 rounded-xl">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 p-6 bg-slate-900/95 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-orange-400">{formatCurrency(tour.price)}</p>
              <p className="text-xs text-gray-500">per person • {tour.duration}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 text-gray-300 border border-slate-600 rounded-xl hover:border-gray-400 hover:text-white transition-all font-medium"
              >
                Close
              </button>
              <button
                onClick={onBook}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all font-semibold shadow-lg shadow-orange-500/30 btn-shine"
              >
                Book This Adventure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourModal;
