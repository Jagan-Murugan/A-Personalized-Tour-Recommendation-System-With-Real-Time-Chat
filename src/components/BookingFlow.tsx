import React, { useState } from 'react';

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
}

interface BookingData {
  tourId: string;
  tourTitle: string;
  tourImage: string;
  tourLocation: string;
  tourDuration: string;
  tourPrice: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
  };
  travelDetails: {
    travelDate: string;
    travelers: number;
    travelStyle: string;
    accommodation: string;
    dietaryRequirements: string;
    specialRequests: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  paymentInfo: {
    cardHolder: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: string;
    city: string;
    zipCode: string;
    country: string;
  };
  totalAmount: number;
}

interface BookingFlowProps {
  tour: Tour;
  onComplete: (booking: BookingData) => void;
  onCancel: () => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ tour, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: 'Indian',
  });

  const [travelDetails, setTravelDetails] = useState({
    travelDate: '',
    travelers: 1,
    travelStyle: 'standard',
    accommodation: 'standard',
    dietaryRequirements: 'none',
    specialRequests: '',
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'India',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotal = () => {
    let base = tour.price * travelDetails.travelers;
    if (travelDetails.accommodation === 'luxury') {
      base *= 1.4;
    } else if (travelDetails.accommodation === 'budget') {
      base *= 0.85;
    }
    return Math.round(base);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!personalInfo.firstName) newErrors.firstName = 'First name is required';
      if (!personalInfo.lastName) newErrors.lastName = 'Last name is required';
      if (!personalInfo.email) newErrors.email = 'Email is required';
      if (!personalInfo.phone) newErrors.phone = 'Phone is required';
      if (!personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (step === 2) {
      if (!travelDetails.travelDate) newErrors.travelDate = 'Travel date is required';
    }

    if (step === 3) {
      if (!emergencyContact.name) newErrors.emergencyName = 'Emergency contact name is required';
      if (!emergencyContact.phone) newErrors.emergencyPhone = 'Emergency contact phone is required';
    }

    if (step === 4) {
      if (!paymentInfo.cardHolder) newErrors.cardHolder = 'Cardholder name is required';
      if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
      if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) newErrors.cvv = 'Valid CVV is required';
    }

    if (step === 5) {
      if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bookingData: BookingData = {
      tourId: tour.id,
      tourTitle: tour.title,
      tourImage: tour.image,
      tourLocation: tour.location,
      tourDuration: tour.duration,
      tourPrice: tour.price,
      personalInfo,
      travelDetails,
      emergencyContact,
      paymentInfo,
      totalAmount: calculateTotal(),
    };

    setIsProcessing(false);
    onComplete(bookingData);
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Travel Details', icon: '✈️' },
    { number: 3, title: 'Emergency', icon: '🚨' },
    { number: 4, title: 'Payment', icon: '💳' },
    { number: 5, title: 'Review', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-800">
          <div className="flex items-center space-x-4">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{tour.title}</h1>
              <p className="text-gray-400">📍 {tour.location} • ⏱️ {tour.duration}</p>
              <p className="text-orange-400 font-semibold">{formatCurrency(tour.price)} per person</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-800">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-lg transition-all ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-slate-800 text-gray-500 border border-slate-700'
                    }`}
                  >
                    {currentStep > step.number ? '✓' : step.icon}
                  </div>
                  <p className={`text-xs mt-2 ${currentStep >= step.number ? 'text-orange-400' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      currentStep > step.number ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-slate-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">👤</span> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.firstName ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.lastName ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.phone ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.dateOfBirth ? 'border-red-500' : 'border-slate-700'}`}
                  />
                  {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nationality</label>
                  <select
                    value={personalInfo.nationality}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, nationality: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Indian">Indian</option>
                    <option value="American">American</option>
                    <option value="British">British</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Travel Details */}
          {currentStep === 2 && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">✈️</span> Travel Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Travel Date *</label>
                  <input
                    type="date"
                    value={travelDetails.travelDate}
                    onChange={(e) => setTravelDetails({ ...travelDetails, travelDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.travelDate ? 'border-red-500' : 'border-slate-700'}`}
                  />
                  {errors.travelDate && <p className="text-red-400 text-sm mt-1">{errors.travelDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Travelers</label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setTravelDetails({ ...travelDetails, travelers: Math.max(1, travelDetails.travelers - 1) })}
                      className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white hover:border-orange-500 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold text-white w-8 text-center">{travelDetails.travelers}</span>
                    <button
                      type="button"
                      onClick={() => setTravelDetails({ ...travelDetails, travelers: Math.min(10, travelDetails.travelers + 1) })}
                      className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white hover:border-orange-500 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Travel Style</label>
                  <select
                    value={travelDetails.travelStyle}
                    onChange={(e) => setTravelDetails({ ...travelDetails, travelStyle: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="solo">Solo</option>
                    <option value="couple">Couple</option>
                    <option value="family">Family</option>
                    <option value="group">Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Accommodation</label>
                  <select
                    value={travelDetails.accommodation}
                    onChange={(e) => setTravelDetails({ ...travelDetails, accommodation: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="budget">Budget (-15%)</option>
                    <option value="standard">Standard</option>
                    <option value="luxury">Luxury (+40%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Dietary Requirements</label>
                  <select
                    value={travelDetails.dietaryRequirements}
                    onChange={(e) => setTravelDetails({ ...travelDetails, dietaryRequirements: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="none">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="jain">Jain</option>
                    <option value="halal">Halal</option>
                    <option value="gluten-free">Gluten-Free</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests</label>
                  <textarea
                    value={travelDetails.specialRequests}
                    onChange={(e) => setTravelDetails({ ...travelDetails, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Any special requirements..."
                  />
                </div>
              </div>
              
              {/* Price Preview */}
              <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Estimated Total</span>
                  <span className="text-2xl font-bold text-orange-400">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Emergency Contact */}
          {currentStep === 3 && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">🚨</span> Emergency Contact
              </h2>
              <p className="text-gray-400 mb-4">Someone we can contact in case of emergency.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name *</label>
                  <input
                    type="text"
                    value={emergencyContact.name}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.emergencyName ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="Jane Doe"
                  />
                  {errors.emergencyName && <p className="text-red-400 text-sm mt-1">{errors.emergencyName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Relationship</label>
                  <select
                    value={emergencyContact.relationship}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select</option>
                    <option value="spouse">Spouse</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={emergencyContact.phone}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.emergencyPhone ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.emergencyPhone && <p className="text-red-400 text-sm mt-1">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">💳</span> Payment Information
              </h2>
              <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl p-4 mb-6 border border-orange-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Amount:</span>
                  <span className="text-2xl font-bold text-orange-400">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardHolder}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.cardHolder ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="Name on card"
                  />
                  {errors.cardHolder && <p className="text-red-400 text-sm mt-1">{errors.cardHolder}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Card Number *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.cardNumber ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.expiryDate ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">CVV *</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.cvv ? 'border-red-500' : 'border-slate-700'}`}
                    placeholder="123"
                  />
                  {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 flex items-center">
                <span className="mr-2">🔒</span>
                Your payment information is encrypted and secure
              </p>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="animate-slide-up">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">✅</span> Review Your Booking
              </h2>
              
              {/* Tour Summary */}
              <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
                <div className="flex items-center space-x-4">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-white text-lg">{tour.title}</h3>
                    <p className="text-gray-400">📍 {tour.location}</p>
                    <p className="text-gray-400">⏱️ {tour.duration}</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-orange-400 mb-2">👤 Personal Info</h4>
                  <p className="text-gray-300 text-sm">{personalInfo.firstName} {personalInfo.lastName}</p>
                  <p className="text-gray-400 text-sm">{personalInfo.email}</p>
                  <p className="text-gray-400 text-sm">{personalInfo.phone}</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <h4 className="font-semibold text-orange-400 mb-2">✈️ Travel Details</h4>
                  <p className="text-gray-300 text-sm">Date: {travelDetails.travelDate}</p>
                  <p className="text-gray-400 text-sm">Travelers: {travelDetails.travelers}</p>
                  <p className="text-gray-400 text-sm capitalize">Accommodation: {travelDetails.accommodation}</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-xl p-4 border border-orange-500/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Total Amount:</span>
                  <span className="text-3xl font-bold text-orange-400">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-600 bg-slate-800 text-orange-500 focus:ring-orange-500 mt-0.5"
                  />
                  <span className="ml-3 text-sm text-gray-300">
                    I agree to the <button type="button" className="text-orange-400 hover:underline">Terms and Conditions</button> and <button type="button" className="text-orange-400 hover:underline">Cancellation Policy</button>
                  </span>
                </label>
                {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms}</p>}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={currentStep === 1 ? onCancel : handleBack}
              className="px-6 py-3 text-gray-300 border border-slate-600 rounded-xl hover:border-gray-400 hover:text-white transition-all font-medium"
            >
              {currentStep === 1 ? 'Cancel' : '← Back'}
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all font-semibold shadow-lg shadow-orange-500/30"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all font-semibold shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Confirm & Pay ${formatCurrency(calculateTotal())}`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
