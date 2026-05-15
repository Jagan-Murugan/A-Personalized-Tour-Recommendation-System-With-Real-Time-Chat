import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Floating elements for background
  const floatingElements = [
    { icon: '✈️', size: 'text-4xl', top: '10%', left: '10%', delay: '0s' },
    { icon: '🌍', size: 'text-5xl', top: '20%', right: '15%', delay: '1s' },
    { icon: '🏝️', size: 'text-3xl', bottom: '30%', left: '8%', delay: '2s' },
    { icon: '⛰️', size: 'text-4xl', top: '60%', right: '10%', delay: '0.5s' },
    { icon: '🎒', size: 'text-3xl', bottom: '15%', right: '25%', delay: '1.5s' },
    { icon: '🗺️', size: 'text-4xl', top: '40%', left: '5%', delay: '2.5s' },
    { icon: '🌅', size: 'text-3xl', bottom: '40%', right: '5%', delay: '3s' },
    { icon: '🏛️', size: 'text-4xl', top: '75%', left: '15%', delay: '0.8s' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-orange-900/60" />
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((el, idx) => (
        <div
          key={idx}
          className={`absolute ${el.size} animate-float opacity-30`}
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
            animationDelay: el.delay,
          }}
        >
          {el.icon}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo & Title */}
          <div className="text-center mb-8 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 shadow-2xl mb-4 animate-bounce-in">
              <span className="text-4xl">🌎</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Wanderlust
            </h1>
            <p className="text-orange-200/80">Your journey begins here</p>
          </div>

          {/* Login Card */}
          <div className="glass rounded-3xl p-8 shadow-2xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold text-white text-center mb-6">Welcome Back</h2>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-4 animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-400 transition-colors">
                    ✉️
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-400 transition-colors">
                    🔒
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-white/10 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <button type="button" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-orange-500/30 btn-shine"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <span className="ml-2">→</span>
                  </span>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-400 bg-transparent">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105"
                >
                  <span className="text-xl">🔵</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105"
                >
                  <span className="text-xl">🍎</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105"
                >
                  <span className="text-xl">📧</span>
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-gray-300 mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Create one
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 glass rounded-xl animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="text-sm text-gray-400 text-center mb-2">✨ Demo Credentials</p>
            <div className="text-xs text-gray-300 space-y-1 text-center">
              <p><span className="text-orange-400">Admin:</span> admin@tourbot.com / admin123</p>
              <p><span className="text-orange-400">User:</span> Register a new account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
