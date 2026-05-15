import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI, usersAPI, statsAPI, activityAPI } from '../services/api';

interface Booking {
  id: string;
  oderId?: string;
  oderId2?: string;
  oderId3?: string;
  userId: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  tourLocation: string;
  tourDuration: string;
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
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  createdAt: string;
}

interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  details: any;
  timestamp: string;
}

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalTravelers: number;
  bookingsByTour: { tour: string; count: number }[];
  recentBookings: Booking[];
}

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'customers' | 'activity'>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, usersRes, statsRes] = await Promise.all([
        bookingsAPI.getAll(),
        usersAPI.getAll(),
        statsAPI.get(),
      ]);
      setBookings(bookingsRes.bookings || []);
      setUsers(usersRes.users || []);
      setStats(statsRes.stats || null);
      
      try {
        const logsRes = await activityAPI.getLogs();
        setActivityLogs(logsRes.logs || []);
      } catch {
        setActivityLogs([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await bookingsAPI.update(bookingId, { status: newStatus });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.tourTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.personalInfo?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.personalInfo?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.personalInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-3xl">🌍</span>
            <div>
              <h1 className="text-xl font-bold">TourBot Admin</h1>
              <p className="text-emerald-200 text-sm">Management Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-medium">{user?.name}</p>
              <p className="text-emerald-200 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-white p-2 rounded-lg shadow">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'bookings', label: 'Bookings', icon: '🎫' },
            { id: 'customers', label: 'Customers', icon: '👥' },
            { id: 'activity', label: 'Activity Logs', icon: '📝' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-full">
                    <span className="text-3xl">🎫</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <div className="bg-emerald-100 p-4 rounded-full">
                    <span className="text-3xl">💰</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Travelers</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalTravelers}</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-full">
                    <span className="text-3xl">✈️</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Registered Users</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-full">
                    <span className="text-3xl">👥</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm border-b">
                      <th className="pb-3">Booking ID</th>
                      <th className="pb-3">Tour</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b last:border-0">
                        <td className="py-3 font-mono text-sm">{booking.id}</td>
                        <td className="py-3">{booking.tourTitle}</td>
                        <td className="py-3">
                          {booking.personalInfo?.firstName} {booking.personalInfo?.lastName}
                        </td>
                        <td className="py-3 font-semibold">{formatCurrency(booking.totalAmount)}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {stats.recentBookings.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">All Bookings</h3>
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3">Booking ID</th>
                    <th className="pb-3">Tour</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Travel Date</th>
                    <th className="pb-3">Travelers</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 font-mono text-sm">{booking.id}</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={booking.tourImage}
                            alt={booking.tourTitle}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <span>{booking.tourTitle}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div>
                          <p className="font-medium">
                            {booking.personalInfo?.firstName} {booking.personalInfo?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{booking.personalInfo?.email}</p>
                        </div>
                      </td>
                      <td className="py-3">{formatDate(booking.travelDetails?.travelDate)}</td>
                      <td className="py-3 text-center">{booking.travelDetails?.travelers}</td>
                      <td className="py-3 font-semibold">{formatCurrency(booking.totalAmount)}</td>
                      <td className="py-3">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className={`px-2 py-1 rounded text-sm border ${
                            booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                            booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Registered Customers</h3>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((customer) => (
                <div key={customer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t text-sm text-gray-500">
                    <p>📱 {customer.phone || 'N/A'}</p>
                    <p>📅 Joined: {formatDate(customer.createdAt)}</p>
                    <p>🏷️ Role: <span className={`${customer.role === 'admin' ? 'text-emerald-600' : 'text-blue-600'}`}>{customer.role}</span></p>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="col-span-3 py-8 text-center text-gray-500">
                  No customers found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity Logs Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Logs</h3>
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    log.action.includes('BOOKING') ? 'bg-blue-100' :
                    log.action.includes('USER') ? 'bg-green-100' :
                    log.action.includes('REVIEW') ? 'bg-yellow-100' :
                    'bg-gray-100'
                  }`}>
                    <span className="text-lg">
                      {log.action.includes('BOOKING') ? '🎫' :
                       log.action.includes('USER') ? '👤' :
                       log.action.includes('REVIEW') ? '⭐' : '📝'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{log.action.replace(/_/g, ' ')}</p>
                    <p className="text-sm text-gray-500">
                      {JSON.stringify(log.details).substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(log.timestamp)}</p>
                  </div>
                </div>
              ))}
              {activityLogs.length === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No activity logs available
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
                  <p className="text-gray-500 font-mono">{selectedBooking.id}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Tour Info */}
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <img
                  src={selectedBooking.tourImage}
                  alt={selectedBooking.tourTitle}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{selectedBooking.tourTitle}</h4>
                  <p className="text-gray-500">📍 {selectedBooking.tourLocation}</p>
                  <p className="text-gray-500">⏱️ {selectedBooking.tourDuration}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Customer Information</h5>
                  <p><span className="text-gray-500">Name:</span> {selectedBooking.personalInfo?.firstName} {selectedBooking.personalInfo?.lastName}</p>
                  <p><span className="text-gray-500">Email:</span> {selectedBooking.personalInfo?.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {selectedBooking.personalInfo?.phone}</p>
                  <p><span className="text-gray-500">DOB:</span> {selectedBooking.personalInfo?.dateOfBirth}</p>
                  <p><span className="text-gray-500">Nationality:</span> {selectedBooking.personalInfo?.nationality}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Travel Details</h5>
                  <p><span className="text-gray-500">Travel Date:</span> {formatDate(selectedBooking.travelDetails?.travelDate)}</p>
                  <p><span className="text-gray-500">Travelers:</span> {selectedBooking.travelDetails?.travelers}</p>
                  <p><span className="text-gray-500">Style:</span> {selectedBooking.travelDetails?.travelStyle}</p>
                  <p><span className="text-gray-500">Accommodation:</span> {selectedBooking.travelDetails?.accommodation}</p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mb-6 pb-6 border-b">
                <h5 className="font-semibold text-gray-700 mb-2">Emergency Contact</h5>
                <p><span className="text-gray-500">Name:</span> {selectedBooking.emergencyContact?.name}</p>
                <p><span className="text-gray-500">Relationship:</span> {selectedBooking.emergencyContact?.relationship}</p>
                <p><span className="text-gray-500">Phone:</span> {selectedBooking.emergencyContact?.phone}</p>
              </div>

              {/* Payment */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatCurrency(selectedBooking.totalAmount)}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">Booking Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
