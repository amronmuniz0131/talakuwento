import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoginForm } from '@/components/auth/LoginForm';
import loginBg from '@/images/login-bg.jpg'; // Path based on the user's provided metadata

const LoginPage = () => {
  // Force user to login by clearing any existing tokens when the login page opens
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${loginBg})` }}
        />
        {/* Dark transparent overlay for readability */}
        <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </motion.div>

      {/* Floating particles/magic dust could go here for extra cinematic effect */}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 w-[90%] md:w-auto md:min-w-[500px] bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] flex flex-col items-center"
      >
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 
            className="text-4xl md:text-5xl font-serif tracking-widest font-bold"
            style={{
              color: '#d4212c', // deep red/crimson
              textShadow: '0 0 15px rgba(212, 33, 44, 0.4), 0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            TALAKUWENTO
          </h1>
          <p className="text-white/60 text-sm tracking-[0.2em] uppercase mt-2 font-medium">
            Enter The Realm
          </p>
        </motion.div>

        {/* Login Form */}
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;
