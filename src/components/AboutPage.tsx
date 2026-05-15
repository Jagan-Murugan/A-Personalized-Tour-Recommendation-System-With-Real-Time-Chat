import React from 'react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const teamMembers = [
    {
      name: 'Arjun Mehta',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      bio: '15+ years in travel industry',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      bio: 'Expert in tour planning',
    },
    {
      name: 'Rahul Verma',
      role: 'Chief Experience Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      bio: 'Curating unique experiences',
    },
    {
      name: 'Sneha Patel',
      role: 'Customer Success Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      bio: 'Your travel happiness expert',
    },
  ];

  const values = [
    {
      icon: '🌍',
      title: 'Authentic Experiences',
      description: 'We believe travel should be transformative. Every tour is designed to offer genuine cultural immersion.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Travel',
      description: 'We partner with eco-conscious operators and support local communities at every destination.',
    },
    {
      icon: '🛡️',
      title: 'Safety First',
      description: 'Your safety is our priority. All our tours are vetted and include comprehensive travel support.',
    },
    {
      icon: '❤️',
      title: 'Personal Connection',
      description: 'Small group sizes ensure personalized attention and meaningful connections with fellow travelers.',
    },
  ];

  const milestones = [
    { year: '2015', event: 'Founded in Mumbai with a vision to make travel accessible' },
    { year: '2017', event: 'Expanded to 15 international destinations' },
    { year: '2019', event: 'Reached 10,000 happy travelers milestone' },
    { year: '2021', event: 'Launched AI-powered travel recommendations' },
    { year: '2023', event: '50,000+ travelers and 25+ destinations' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1920"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
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

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm mb-4">
            🌟 Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            About Wanderlust
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We're passionate travelers who believe everyone deserves to experience the world's wonders. 
            Since 2015, we've been crafting extraordinary journeys that create lifelong memories.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-400 text-sm font-medium">OUR MISSION</span>
              <h2 className="text-4xl font-bold text-white mt-2 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Making Travel Dreams Accessible
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                At Wanderlust, we believe that extraordinary travel experiences shouldn't be reserved for the few. 
                Our mission is to democratize premium travel by offering carefully curated tours at accessible prices.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                We work directly with local guides, family-owned accommodations, and authentic experience providers 
                to ensure every rupee you spend creates meaningful impact while delivering unforgettable memories.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-4xl font-bold text-emerald-400">50K+</p>
                  <p className="text-gray-500 text-sm">Happy Travelers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-emerald-400">25+</p>
                  <p className="text-gray-500 text-sm">Destinations</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-emerald-400">4.9</p>
                  <p className="text-gray-500 text-sm">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600"
                alt="Travel Experience"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 p-6 bg-slate-800 rounded-xl border border-slate-700">
                <p className="text-emerald-400 font-bold text-2xl">8+ Years</p>
                <p className="text-gray-400 text-sm">Creating Memories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium">WHAT WE STAND FOR</span>
            <h2 className="text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-3xl mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium">OUR JOURNEY</span>
            <h2 className="text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Milestones
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500" />

            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className={`relative flex items-center mb-8 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-colors">
                    <p className="text-emerald-400 font-bold text-lg mb-1">{milestone.year}</p>
                    <p className="text-gray-400 text-sm">{milestone.event}</p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-950" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 text-sm font-medium">THE PEOPLE BEHIND</span>
            <h2 className="text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Meet Our Team
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              A diverse team of travel enthusiasts dedicated to making your journeys unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group text-center p-6 bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-emerald-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Have Questions?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            We'd love to hear from you. Our travel experts are ready to help plan your dream vacation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@wanderlust.com"
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Us</span>
            </a>
            <a
              href="tel:+911234567890"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 123 456 7890</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-8 px-4 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 Wanderlust. All rights reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Contact</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
