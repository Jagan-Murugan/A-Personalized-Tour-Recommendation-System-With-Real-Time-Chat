import React, { useState } from 'react';

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  description: string;
  highlights: string[];
  bestTime: string;
  tourCount: number;
  flag: string;
}

interface DestinationsPageProps {
  onBack: () => void;
  onExploreTours: (destination: string) => void;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'peru',
    name: 'Machu Picchu',
    country: 'Peru',
    continent: 'South America',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    description: 'Explore the ancient Incan citadel set high in the Andes Mountains, a UNESCO World Heritage site.',
    highlights: ['Inca Trail', 'Sacred Valley', 'Cusco', 'Rainbow Mountain'],
    bestTime: 'May - September',
    tourCount: 3,
    flag: '🇵🇪',
  },
  {
    id: 'japan',
    name: 'Kyoto & Tokyo',
    country: 'Japan',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    description: 'Experience the perfect blend of ancient traditions and futuristic innovation in the Land of the Rising Sun.',
    highlights: ['Mount Fuji', 'Fushimi Inari', 'Shibuya', 'Geisha Districts'],
    bestTime: 'March - May, October - November',
    tourCount: 4,
    flag: '🇯🇵',
  },
  {
    id: 'tanzania',
    name: 'Serengeti',
    country: 'Tanzania',
    continent: 'Africa',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    description: 'Witness the Great Migration and encounter the Big Five in Africa\'s most iconic wildlife reserve.',
    highlights: ['Great Migration', 'Big Five', 'Ngorongoro Crater', 'Maasai Culture'],
    bestTime: 'June - October',
    tourCount: 2,
    flag: '🇹🇿',
  },
  {
    id: 'greece',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    description: 'Discover whitewashed villages, stunning sunsets, and ancient ruins on these magical Greek islands.',
    highlights: ['Oia Sunset', 'Blue Domes', 'Wine Tasting', 'Volcano Tours'],
    bestTime: 'April - October',
    tourCount: 3,
    flag: '🇬🇷',
  },
  {
    id: 'indonesia',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    description: 'Find serenity in lush rice terraces, ancient temples, and pristine beaches of the Island of the Gods.',
    highlights: ['Ubud', 'Tanah Lot', 'Rice Terraces', 'Uluwatu Temple'],
    bestTime: 'April - October',
    tourCount: 4,
    flag: '🇮🇩',
  },
  {
    id: 'norway',
    name: 'Norwegian Fjords',
    country: 'Norway',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800',
    description: 'Cruise through dramatic fjords, chase the Northern Lights, and explore charming Scandinavian villages.',
    highlights: ['Northern Lights', 'Geirangerfjord', 'Bergen', 'Trolltunga'],
    bestTime: 'September - March (Aurora), June - August (Summer)',
    tourCount: 2,
    flag: '🇳🇴',
  },
  {
    id: 'morocco',
    name: 'Marrakech & Sahara',
    country: 'Morocco',
    continent: 'Africa',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800',
    description: 'Immerse yourself in vibrant souks, ancient medinas, and magical desert landscapes.',
    highlights: ['Medina', 'Sahara Desert', 'Atlas Mountains', 'Fes'],
    bestTime: 'March - May, September - November',
    tourCount: 3,
    flag: '🇲🇦',
  },
  {
    id: 'iceland',
    name: 'Golden Circle',
    country: 'Iceland',
    continent: 'Europe',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
    description: 'Explore the land of fire and ice with geysers, waterfalls, glaciers, and volcanic landscapes.',
    highlights: ['Blue Lagoon', 'Geysir', 'Northern Lights', 'Glacier Hiking'],
    bestTime: 'June - August (Midnight Sun), September - March (Aurora)',
    tourCount: 2,
    flag: '🇮🇸',
  },
];

const DestinationsPage: React.FC<DestinationsPageProps> = ({ onBack, onExploreTours }) => {
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const continents = [
    { id: 'all', label: 'All Destinations', icon: '🌍' },
    { id: 'Asia', label: 'Asia', icon: '🏯' },
    { id: 'Europe', label: 'Europe', icon: '🏰' },
    { id: 'Africa', label: 'Africa', icon: '🦁' },
    { id: 'South America', label: 'South America', icon: '🌎' },
  ];

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContinent && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920"
            alt="Destinations Hero"
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
            🗺️ 8 Amazing Regions
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Discover Destinations
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From ancient wonders to natural paradises, find your perfect escape
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-80 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Continent Pills */}
            <div className="flex flex-wrap gap-2">
              {continents.map(cont => (
                <button
                  key={cont.id}
                  onClick={() => setSelectedContinent(cont.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedContinent === cont.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span>{cont.icon}</span>
                  <span>{cont.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-400">
              Showing <span className="text-white font-semibold">{filteredDestinations.length}</span> destinations
            </p>
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">No destinations found</h3>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDestinations.map((dest, idx) => (
                <div
                  key={dest.id}
                  className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    
                    {/* Flag & Country */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <span className="text-lg">{dest.flag}</span>
                      <span className="text-white text-sm font-medium">{dest.country}</span>
                    </div>

                    {/* Tour Count */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full">
                      <span className="text-white text-sm font-medium">{dest.tourCount} Tours</span>
                    </div>

                    {/* Continent Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-gray-300 text-xs">
                        {dest.continent}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {dest.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {dest.highlights.slice(0, 3).map(highlight => (
                        <span key={highlight} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-gray-400">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Best Time */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Best: {dest.bestTime}</span>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => onExploreTours(dest.country)}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Explore Tours</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Travel Inspiration Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Need Travel Inspiration?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Chat with our AI travel assistant to discover personalized recommendations based on your preferences
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-xl transition-all"
            >
              Start Planning →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;
