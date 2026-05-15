import React, { useState, useRef, useEffect } from 'react';

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

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  tours?: Tour[];
  timestamp: Date;
}

interface ChatBotProps {
  tours: Tour[];
  onViewTour: (tour: Tour) => void;
  onBookTour: (tour: Tour) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ tours, onViewTour, onBookTour }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Namaste! 🙏 I'm your AI travel guide. Looking for the perfect medium-budget adventure? Tell me your dream destination, travel style, or any questions!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // NLP Processing
  const processMessage = (input: string): { text: string; tours?: Tour[] } => {
    const lowerInput = input.toLowerCase();

    // Greetings
    if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|hola)/.test(lowerInput)) {
      return {
        text: "Hello! 👋 Great to have you here! I specialize in medium-budget adventures (₹80K-₹1.8L). What kind of experience excites you?\n\n🏖️ Beach paradise\n🏔️ Mountain adventure\n🦁 Wildlife safari\n🏛️ Cultural immersion\n\nOr just tell me your dream destination!",
      };
    }

    // Farewells
    if (/^(bye|goodbye|thanks|thank you|dhanyawad|see you|tata)/.test(lowerInput)) {
      return {
        text: "Thank you for chatting! 🙏 Have amazing travels ahead. Whenever you're ready to book, I'm here 24/7. Safe journeys! ✈️",
      };
    }

    // Help
    if (/help|how does this work|what can you do|guide me/.test(lowerInput)) {
      return {
        text: "I'm here to help you find your perfect adventure! 🎯\n\n**Ask me about:**\n• Destinations (Japan, Peru, Bali...)\n• Travel styles (adventure, relaxation, culture)\n• Budget details & pricing\n• Best time to visit\n• Visa requirements for Indians\n• Local food & experiences\n• Safety information\n\n**Or try:**\n• 'Show me beach destinations'\n• 'I want an adventure trip'\n• 'Best for couples'\n\nHow can I help you today?",
      };
    }

    // Price/Budget queries
    if (/price|cost|budget|how much|expensive|cheap|affordable|kitna/.test(lowerInput)) {
      const budgetTours = tours.filter(t => t.price < 100000);
      const midTours = tours.filter(t => t.price >= 100000 && t.price <= 150000);
      
      if (/cheap|low|sasta|affordable/.test(lowerInput)) {
        return {
          text: `Great choice for budget-conscious travelers! 💰 Here are our best value tours under ₹1 lakh:`,
          tours: budgetTours.slice(0, 3),
        };
      }

      return {
        text: `Our medium-budget adventures range from **${formatCurrency(80000)}** to **${formatCurrency(180000)}** per person.\n\n💚 **Value Range** (₹80K-₹1L): Bali, Morocco\n💛 **Sweet Spot** (₹1L-₹1.5L): Japan, Greece, Peru\n🧡 **Premium** (₹1.5L-₹1.8L): Norway, Iceland, Safari\n\nAll include:\n✓ Accommodation & transport\n✓ Expert local guides\n✓ Key activities & experiences\n\nWhich range interests you?`,
        tours: midTours.slice(0, 2),
      };
    }

    // Weather/Best time queries
    if (/weather|best time|when to visit|season|climate|kab jaana/.test(lowerInput)) {
      return {
        text: "🌤️ **Best Times to Visit Our Destinations:**\n\n**Spring (Mar-May):**\n🌸 Japan - Cherry blossoms\n🇬🇷 Greece - Perfect weather\n\n**Summer (Jun-Aug):**\n🇮🇸 Iceland - Midnight sun\n🇳🇴 Norway - Fjord cruises\n\n**Autumn (Sep-Nov):**\n🇵🇪 Peru - Dry season\n🇲🇦 Morocco - Pleasant temps\n\n**Winter (Dec-Feb):**\n🇮🇩 Bali - Dry season\n🇹🇿 Tanzania - Safari season\n🇳🇴 Norway - Northern Lights\n\nWhich season are you planning for?",
      };
    }

    // Visa information
    if (/visa|passport|document|requirement/.test(lowerInput)) {
      return {
        text: "🛂 **Visa Info for Indian Passport Holders:**\n\n**Visa on Arrival:**\n✅ Indonesia (Bali) - 30 days free\n✅ Tanzania - $50 on arrival\n\n**E-Visa (Easy Process):**\n📱 Japan - Apply online\n📱 Morocco - Free for 90 days\n\n**Visa Required:**\n📋 Greece (Schengen) - 15-20 days\n📋 Iceland (Schengen)\n📋 Norway (Schengen)\n📋 Peru - Easy to get\n\n**We provide full visa assistance** with all bookings! 📧 support@wanderlust.com",
      };
    }

    // Safety queries
    if (/safe|safety|dangerous|security|crime/.test(lowerInput)) {
      return {
        text: "🛡️ **Your Safety is Our Priority!**\n\nAll our destinations are carefully selected for safety. We provide:\n\n✓ 24/7 emergency support line\n✓ Vetted local partners & guides\n✓ Travel insurance assistance\n✓ Safety briefings before departure\n✓ Regular check-ins during trip\n\n**Generally Safe:** Japan, Iceland, Norway, Greece, Bali\n**Take Precautions:** Morocco (tourist areas very safe)\n**Expert Guides Essential:** Peru (altitude), Tanzania (wildlife)\n\nAny specific destination concerns?",
      };
    }

    // Food/Vegetarian queries
    if (/food|vegetarian|vegan|diet|eat|cuisine|halal|khana/.test(lowerInput)) {
      return {
        text: "🍽️ **Foodie Info for Our Destinations:**\n\n**Veg-Friendly Paradise:**\n🇮🇩 Bali - Extensive veg options\n🇬🇷 Greece - Fresh Mediterranean\n\n**Amazing Street Food:**\n🇯🇵 Japan - Must-try ramen, sushi\n🇲🇦 Morocco - Tagines, couscous\n\n**We Accommodate:**\n✓ Vegetarian & Vegan\n✓ Jain food requirements\n✓ Halal options\n✓ Gluten-free\n✓ All allergies\n\nJust mention your dietary needs while booking! 🥗",
      };
    }

    // Booking queries
    if (/book|reserve|payment|how to book/.test(lowerInput)) {
      return {
        text: "📝 **Booking is Super Easy!**\n\n**5 Simple Steps:**\n1️⃣ Choose your adventure\n2️⃣ Click 'Book Now'\n3️⃣ Fill your details\n4️⃣ Secure payment\n5️⃣ Get instant confirmation!\n\n**We Accept:**\n💳 All cards (Visa, Mastercard)\n📱 UPI (Google Pay, PhonePe)\n🏦 Net Banking\n💵 EMI options available\n\n**100% Secure** - All payments encrypted\n\nWant me to show you some tours to book?",
        tours: tours.slice(0, 2),
      };
    }

    // Cancellation queries
    if (/cancel|refund|policy|change date/.test(lowerInput)) {
      return {
        text: "📋 **Our Flexible Cancellation Policy:**\n\n**Free Cancellation:**\n✓ 45+ days before: 100% refund\n\n**Partial Refund:**\n• 30-44 days: 75% refund\n• 15-29 days: 50% refund\n• 7-14 days: 25% refund\n\n**No Refund:**\n• Less than 7 days\n\n**Exceptions:**\n🏥 Medical emergencies - Case by case\n🦠 COVID-related - Full refund\n📅 Date changes - Free if 30+ days\n\nQuestions? support@wanderlust.com",
      };
    }

    // Destination-specific queries
    const destinations: Record<string, string> = {
      'peru|machu picchu|inca': '🇵🇪 **Peru - Land of the Incas**\n\nMachu Picchu is a bucket-list must! Our 8-day tour includes:\n• Inca Trail trek\n• Sacred Valley exploration\n• Cusco heritage walks\n• Authentic local cuisine\n\n💰 From ₹1,45,000\n📅 Best: May-September\n⛰️ Difficulty: Moderate\n\nPerfect for adventure seekers!',
      'japan|tokyo|kyoto': '🇯🇵 **Japan - Where Tradition Meets Future**\n\nOur 10-day cultural journey covers:\n• Tokyo\'s electric energy\n• Kyoto\'s ancient temples\n• Mount Fuji views\n• Authentic tea ceremony\n• Sushi making class\n\n💰 From ₹1,65,000\n📅 Best: Mar-May or Oct-Nov\n🌸 Cherry blossom season is magical!',
      'bali|indonesia': '🇮🇩 **Bali - Island of Gods**\n\nPerfect wellness escape! 7 days of:\n• Daily yoga sessions\n• Ubud rice terraces\n• Temple spirituality\n• Spa treatments\n• Balinese cooking\n\n💰 From ₹89,000 (Best value!)\n📅 Best: April-October\n🧘 Perfect for solo travelers & couples',
      'greece|santorini|mykonos': '🇬🇷 **Greek Islands - Mediterranean Dream**\n\n8 days of island hopping:\n• Santorini sunsets (iconic!)\n• Mykonos beaches & nightlife\n• Ancient ruins\n• Wine tasting\n• Greek cooking class\n\n💰 From ₹1,25,000\n📅 Best: April-October\n💑 Most romantic destination!',
      'iceland': '🇮🇸 **Iceland - Land of Fire & Ice**\n\n10-day Ring Road adventure:\n• Northern Lights hunting\n• Blue Lagoon bliss\n• Glacier hiking\n• Whale watching\n• Waterfalls galore\n\n💰 From ₹1,75,000\n📅 Best: Jun-Aug (sun) or Sep-Mar (Aurora)\n📸 Every photo is a masterpiece!',
      'norway|fjord': '🇳🇴 **Norwegian Fjords - Nature\'s Masterpiece**\n\n9 days of Nordic wonder:\n• Fjord cruises\n• Northern Lights\n• Bergen old town\n• Flam Railway\n• Viking history\n\n💰 From ₹1,68,000\n📅 Best: May-Sep (fjords) or Dec-Mar (Aurora)\n❄️ Magical winter wonderland!',
      'morocco|sahara': '🇲🇦 **Morocco - Exotic & Mystical**\n\n8 days of sensory overload:\n• Marrakech medina\n• Sahara desert camping\n• Camel trekking\n• Atlas Mountains\n• Traditional hammam\n\n💰 From ₹98,000\n📅 Best: Mar-May or Sep-Nov\n🐪 Sleep under Saharan stars!',
      'tanzania|safari|serengeti': '🇹🇿 **Tanzania Safari - Wildlife Paradise**\n\n7 days of African adventure:\n• Big Five spotting\n• Great Migration\n• Ngorongoro Crater\n• Maasai village visit\n• Hot air balloon ride\n\n💰 From ₹1,78,000\n📅 Best: June-October\n🦁 Once-in-a-lifetime experience!',
    };

    for (const [keywords, response] of Object.entries(destinations)) {
      if (new RegExp(keywords).test(lowerInput)) {
        const matchedTours = tours.filter(t => 
          keywords.split('|').some(k => t.title.toLowerCase().includes(k) || t.location.toLowerCase().includes(k))
        );
        return {
          text: response,
          tours: matchedTours.slice(0, 2),
        };
      }
    }

    // Category-based recommendations
    const categoryMap: Record<string, string[]> = {
      'beach|sea|ocean|island|coastal|samudra': ['beach'],
      'adventure|hiking|trek|mountain|climb|pahad': ['adventure', 'hiking'],
      'culture|history|heritage|ancient|temple|mandir': ['culture'],
      'wildlife|animal|safari|jungle|nature': ['wildlife', 'nature'],
      'wellness|spa|yoga|relax|peaceful|shanti': ['wellness'],
      'romantic|honeymoon|couple|shaadi': ['romantic', 'beach'],
      'family|kid|children|bachche': ['family'],
    };

    for (const [keywords, categories] of Object.entries(categoryMap)) {
      if (new RegExp(keywords).test(lowerInput)) {
        const matchedTours = tours.filter(t => 
          t.category.some(c => categories.includes(c)) || 
          t.bestFor.some(b => categories.includes(b))
        );
        if (matchedTours.length > 0) {
          return {
            text: `Perfect choice! 🎯 Here are our best ${categories[0]} experiences for medium budgets:`,
            tours: matchedTours.slice(0, 3),
          };
        }
      }
    }

    // Solo travel
    if (/solo|alone|single|akela/.test(lowerInput)) {
      const soloTours = tours.filter(t => t.bestFor.includes('solo'));
      return {
        text: "Solo traveling? You're brave and amazing! 🎒 Here are perfect solo-friendly adventures:\n\n✓ Meet like-minded travelers\n✓ Group activities available\n✓ Safe destinations\n✓ No single supplement on select tours",
        tours: soloTours.slice(0, 3),
      };
    }

    // Show all tours
    if (/show|list|all tour|what tour|available|dikhao/.test(lowerInput)) {
      return {
        text: "Here are all our medium-budget adventures! 🌍 Click any to explore:",
        tours: tours.slice(0, 5),
      };
    }

    // Recommend
    if (/recommend|suggest|best|popular|top/.test(lowerInput)) {
      const topTours = tours.filter(t => t.rating >= 4.8).slice(0, 3);
      return {
        text: "Based on traveler ratings and feedback, here are our **most loved adventures** ⭐:",
        tours: topTours,
      };
    }

    // Default response
    return {
      text: "I'd love to help you plan the perfect trip! 🤔\n\nTell me more about:\n• Your dream destination?\n• Type of experience (adventure/relaxation/culture)?\n• Who's traveling (solo/couple/family/friends)?\n• Your budget range?\n\nOr ask me anything about visas, weather, food, safety - I'm here to help! 😊",
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = processMessage(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        tours: response.tours,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const quickOptions = [
    { text: '🏖️ Beach', query: 'beach destinations' },
    { text: '🏔️ Adventure', query: 'adventure trips' },
    { text: '💰 Budget', query: 'affordable options' },
    { text: '⭐ Top Rated', query: 'best rated tours' },
    { text: '👫 Couples', query: 'romantic honeymoon' },
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-slate-700 rotate-0' 
            : 'bg-gradient-to-r from-orange-500 to-pink-500 animate-pulse-glow'
        }`}
      >
        <span className="text-2xl text-white">{isOpen ? '✕' : '💬'}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[550px] bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">Wanderlust AI</h3>
                <p className="text-xs text-white/80">Your personal travel guide</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-br-none'
                      : 'bg-slate-800 text-gray-200 rounded-bl-none border border-slate-700'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  
                  {/* Tour Cards */}
                  {message.tours && message.tours.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.tours.map((tour) => (
                        <div
                          key={tour.id}
                          className="bg-slate-700/50 rounded-xl p-3 border border-slate-600"
                        >
                          <div className="flex space-x-3">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white text-sm truncate">{tour.title}</h4>
                              <p className="text-xs text-gray-400">📍 {tour.location}</p>
                              <p className="text-sm font-semibold text-orange-400">{formatCurrency(tour.price)}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => {
                                onViewTour(tour);
                                setIsOpen(false);
                              }}
                              className="flex-1 text-xs px-3 py-1.5 border border-orange-500 text-orange-400 rounded-lg hover:bg-orange-500/10 transition-colors"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => {
                                onBookTour(tour);
                                setIsOpen(false);
                              }}
                              className="flex-1 text-xs px-3 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          <div className="p-2 bg-slate-800 border-t border-slate-700 flex-shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {quickOptions.map((option) => (
                <button
                  key={option.text}
                  onClick={() => {
                    setInputValue(option.query);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="text-xs px-3 py-1.5 bg-slate-700 text-gray-300 rounded-full hover:bg-slate-600 hover:text-orange-400 transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-700 bg-slate-900 flex-shrink-0">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about travel..."
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                <span>➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
