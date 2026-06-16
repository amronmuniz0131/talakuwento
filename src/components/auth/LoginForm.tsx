import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';
import { login, register } from '@/services/authService';

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !username)) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    console.log(`--- ${isLogin ? 'LOGIN' : 'REGISTER'} ATTEMPT ---`);
    console.log('Sending data:', isLogin ? { email } : { username, email });

    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        if (data.role === 'admin') {
          toast.success("Admin account detected");
        } else {
          toast.success("Welcome back to Talakuwento!");
        }
      } else {
        // Automatically default to 'user' role, or change to admin if needed later
        data = await register(username, email, password, 'user');
        if (data.role === 'admin') {
          toast.success("Admin account detected");
        } else {
          toast.success("User account created");
        }
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect based on role
      if (data.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/roadmap");
      }
    } catch (error: any) {
      console.error('Authentication Error:', error);
      toast.error(typeof error === 'string' ? error : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Username Input (Only for Registration) */}
      {!isLogin && (
        <div className="flex flex-col gap-2">
          <label className="text-white/90 text-sm font-medium tracking-wide">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="USERNAME"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#e83e4a] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            disabled={isLoading}
          />
        </div>
      )}

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label className="text-white/90 text-sm font-medium tracking-wide">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email: "
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#e83e4a] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
          disabled={isLoading}
        />
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-2 relative">
        <label className="text-white/90 text-sm font-medium tracking-wide">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password: "
            className="w-full px-4 py-3 pr-12 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#e83e4a] focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/90 transition-colors"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-4 w-full py-3.5 px-6 bg-gradient-to-r from-[#9b1b22] to-[#e83e4a] hover:from-[#b9212a] hover:to-[#f05560] text-white rounded-xl font-bold tracking-wider shadow-[0_0_20px_rgba(232,62,74,0.4)] hover:shadow-[0_0_30px_rgba(232,62,74,0.6)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          isLogin ? "Enter World" : "Create Account"
        )}
      </motion.button>

      {/* Extra Links */}
      <div className="flex justify-between items-center mt-2 text-sm text-white/70">
        {isLogin && (
          <button type="button" className="hover:text-white transition-colors duration-300">
            Forgot Password?
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            // Optional: reset fields on toggle
            // setEmail(''); setPassword(''); setUsername('');
          }}
          className={`hover:text-[#e83e4a] transition-colors duration-300 ${!isLogin ? 'w-full text-center' : ''}`}
        >
          {isLogin ? "Create New Account" : "Already have an account? Log In"}
        </button>
      </div>
    </form>
  );
};
