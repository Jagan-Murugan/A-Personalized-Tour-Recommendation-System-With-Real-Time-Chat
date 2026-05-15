// API Service - Connects Frontend to Backend Server

const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('tourbot_token');
};

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      // Backend is not running, use localStorage fallback
      console.warn('Backend not available, using localStorage fallback');
      return handleOfflineRequest(endpoint, options);
    }
    throw error;
  }
};

// Offline fallback handlers
const handleOfflineRequest = async (endpoint: string, options: RequestInit = {}) => {
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body as string) : null;

  // Auth endpoints
  if (endpoint === '/auth/register' && method === 'POST') {
    return offlineRegister(body);
  }
  if (endpoint === '/auth/login' && method === 'POST') {
    return offlineLogin(body);
  }
  if (endpoint === '/auth/me' && method === 'GET') {
    return offlineGetMe();
  }

  // Tour endpoints
  if (endpoint === '/tours' && method === 'GET') {
    return { tours: getOfflineTours() };
  }

  // Booking endpoints
  if (endpoint === '/bookings' && method === 'POST') {
    return offlineCreateBooking(body);
  }
  if (endpoint === '/bookings' && method === 'GET') {
    return offlineGetBookings();
  }
  if (endpoint === '/bookings/my' && method === 'GET') {
    return offlineGetMyBookings();
  }

  // User endpoints
  if (endpoint === '/users' && method === 'GET') {
    return offlineGetUsers();
  }

  // Stats endpoint
  if (endpoint === '/stats' && method === 'GET') {
    return offlineGetStats();
  }

  throw new Error('Offline mode: This feature requires the backend server');
};

// Offline Auth Functions
const offlineRegister = (data: { email: string; password: string; name: string; phone: string }) => {
  const users = JSON.parse(localStorage.getItem('tourbot_users') || '[]');
  
  if (users.find((u: any) => u.email === data.email)) {
    throw new Error('Email already registered');
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email: data.email,
    password: data.password,
    name: data.name,
    phone: data.phone,
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem('tourbot_users', JSON.stringify(users));
  localStorage.setItem('tourbot_token', `offline-token-${newUser.id}`);
  localStorage.setItem('tourbot_current_user', JSON.stringify(newUser));

  return {
    message: 'Registration successful',
    user: { id: newUser.id, email: newUser.email, name: newUser.name, phone: newUser.phone, role: newUser.role },
    token: `offline-token-${newUser.id}`,
  };
};

const offlineLogin = (data: { email: string; password: string }) => {
  // Check for admin
  if (data.email === 'admin@tourbot.com' && data.password === 'admin123') {
    const adminUser = {
      id: 'admin-001',
      email: 'admin@tourbot.com',
      name: 'Admin User',
      phone: '+91 9876543210',
      role: 'admin' as const,
    };
    localStorage.setItem('tourbot_token', 'offline-token-admin');
    localStorage.setItem('tourbot_current_user', JSON.stringify(adminUser));
    return { message: 'Login successful', user: adminUser, token: 'offline-token-admin' };
  }

  const users = JSON.parse(localStorage.getItem('tourbot_users') || '[]');
  const user = users.find((u: any) => u.email === data.email && u.password === data.password);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  localStorage.setItem('tourbot_token', `offline-token-${user.id}`);
  localStorage.setItem('tourbot_current_user', JSON.stringify(user));

  return {
    message: 'Login successful',
    user: { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role },
    token: `offline-token-${user.id}`,
  };
};

const offlineGetMe = () => {
  const user = JSON.parse(localStorage.getItem('tourbot_current_user') || 'null');
  if (!user) {
    throw new Error('Not authenticated');
  }
  return { user };
};

const offlineCreateBooking = (data: any) => {
  const bookings = JSON.parse(localStorage.getItem('tourbot_bookings') || '[]');
  const user = JSON.parse(localStorage.getItem('tourbot_current_user') || 'null');

  const newBooking = {
    id: `TB${Date.now().toString(36).toUpperCase()}`,
    oderId: `ORD${Date.now().toString(36).toUpperCase()}`,
    oderId2: `REF${Date.now()}`,
    userId: user?.id,
    ...data,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  localStorage.setItem('tourbot_bookings', JSON.stringify(bookings));

  return { message: 'Booking successful', booking: newBooking };
};

const offlineGetBookings = () => {
  const bookings = JSON.parse(localStorage.getItem('tourbot_bookings') || '[]');
  return { bookings };
};

const offlineGetMyBookings = () => {
  const bookings = JSON.parse(localStorage.getItem('tourbot_bookings') || '[]');
  const user = JSON.parse(localStorage.getItem('tourbot_current_user') || 'null');
  const myBookings = bookings.filter((b: any) => b.userId === user?.id);
  return { bookings: myBookings };
};

const offlineGetUsers = () => {
  const users = JSON.parse(localStorage.getItem('tourbot_users') || '[]');
  return { users: users.map((u: any) => ({ id: u.id, email: u.email, name: u.name, phone: u.phone, role: u.role, createdAt: u.createdAt })) };
};

const offlineGetStats = () => {
  const bookings = JSON.parse(localStorage.getItem('tourbot_bookings') || '[]');
  const users = JSON.parse(localStorage.getItem('tourbot_users') || '[]');

  return {
    stats: {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum: number, b: any) => sum + (b.totalAmount || 0), 0),
      totalUsers: users.length,
      totalTravelers: bookings.reduce((sum: number, b: any) => sum + (b.travelDetails?.travelers || 1), 0),
      bookingsByTour: [],
      recentBookings: bookings.slice(-5).reverse(),
    },
  };
};

const getOfflineTours = () => {
  return [
    {
      id: 'tour-1',
      title: 'Machu Picchu Adventure',
      location: 'Peru',
      description: 'Embark on an unforgettable journey to the ancient Incan citadel of Machu Picchu.',
      price: 189999,
      duration: '8 Days',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
      category: ['adventure', 'culture', 'hiking'],
      difficulty: 'Moderate',
      bestFor: ['couples', 'solo', 'groups'],
      highlights: ['Inca Trail Trek', 'Machu Picchu Sunrise', 'Sacred Valley Tour', 'Cusco City Walk', 'Local Cuisine Experience'],
      reviews: [
        { id: 'r1', name: 'Rahul Sharma', avatar: '👨', rating: 5, date: '2024-01-15', comment: 'Absolutely breathtaking!' },
      ],
    },
    {
      id: 'tour-2',
      title: 'Japanese Cultural Immersion',
      location: 'Japan',
      description: 'Discover the perfect blend of ancient traditions and modern innovation in Japan.',
      price: 245999,
      duration: '10 Days',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
      category: ['culture', 'city', 'food'],
      difficulty: 'Easy',
      bestFor: ['couples', 'solo', 'family'],
      highlights: ['Tokyo City Tour', 'Mount Fuji Visit', 'Kyoto Temples', 'Traditional Tea Ceremony', 'Sushi Making Class'],
      reviews: [],
    },
    {
      id: 'tour-3',
      title: 'Serengeti Safari Experience',
      location: 'Tanzania',
      description: 'Witness the incredible wildlife of Africa on this safari adventure.',
      price: 324999,
      duration: '7 Days',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      category: ['wildlife', 'adventure', 'nature'],
      difficulty: 'Easy',
      bestFor: ['couples', 'family', 'groups'],
      highlights: ['Big Five Safari', 'Great Migration', 'Ngorongoro Crater'],
      reviews: [],
    },
    {
      id: 'tour-4',
      title: 'Greek Islands Paradise',
      location: 'Greece',
      description: 'Island hop through the stunning Cyclades.',
      price: 199999,
      duration: '8 Days',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
      category: ['beach', 'culture', 'romantic'],
      difficulty: 'Easy',
      bestFor: ['couples', 'solo', 'groups'],
      highlights: ['Santorini Sunset', 'Mykonos Beaches', 'Greek Cooking Class'],
      reviews: [],
    },
    {
      id: 'tour-5',
      title: 'Bali Wellness Retreat',
      location: 'Indonesia',
      description: 'Rejuvenate your mind, body, and soul in Bali.',
      price: 145999,
      duration: '7 Days',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      category: ['wellness', 'beach', 'culture'],
      difficulty: 'Easy',
      bestFor: ['solo', 'couples'],
      highlights: ['Ubud Rice Terraces', 'Yoga Sessions', 'Spa Treatments'],
      reviews: [],
    },
    {
      id: 'tour-6',
      title: 'Norwegian Fjords Cruise',
      location: 'Norway',
      description: 'Sail through the majestic Norwegian fjords and witness the Northern Lights.',
      price: 278999,
      duration: '9 Days',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800',
      category: ['nature', 'cruise', 'adventure'],
      difficulty: 'Easy',
      bestFor: ['couples', 'solo', 'family'],
      highlights: ['Fjord Cruise', 'Northern Lights', 'Bergen Old Town'],
      reviews: [],
    },
  ];
};

// ==================== API Functions ====================

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string; phone: string }) =>
    apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  getMe: () => apiRequest('/auth/me'),

  logout: () => {
    localStorage.removeItem('tourbot_token');
    localStorage.removeItem('tourbot_current_user');
  },
};

// Tours API
export const toursAPI = {
  getAll: () => apiRequest('/tours'),

  getById: (id: string) => apiRequest(`/tours/${id}`),

  addReview: (tourId: string, data: { rating: number; comment: string }) =>
    apiRequest(`/tours/${tourId}/reviews`, { method: 'POST', body: JSON.stringify(data) }),
};

// Bookings API
export const bookingsAPI = {
  create: (data: any) => apiRequest('/bookings', { method: 'POST', body: JSON.stringify(data) }),

  getMyBookings: () => apiRequest('/bookings/my'),

  getAll: () => apiRequest('/bookings'),

  update: (id: string, data: any) =>
    apiRequest(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    
  delete: (id: string) =>
    apiRequest(`/bookings/${id}`, { method: 'DELETE' }),
};

// Users API (Admin)
export const usersAPI = {
  getAll: () => apiRequest('/users'),
};

// Stats API (Admin)
export const statsAPI = {
  get: () => apiRequest('/stats'),
};

// Chat API
export const chatAPI = {
  log: (message: string, response: string) =>
    apiRequest('/chat', { method: 'POST', body: JSON.stringify({ message, response }) }),

  getHistory: () => apiRequest('/chat/history'),
};

// Activity Logs API (Admin)
export const activityAPI = {
  getLogs: () => apiRequest('/activity-logs'),
};

// Dashboard API (Admin)
export const dashboardAPI = {
  getStats: () => statsAPI.get(),
  getActivityLogs: () => activityAPI.getLogs(),
};

export default {
  auth: authAPI,
  tours: toursAPI,
  bookings: bookingsAPI,
  users: usersAPI,
  stats: statsAPI,
  chat: chatAPI,
  activity: activityAPI,
  dashboard: dashboardAPI,
};
