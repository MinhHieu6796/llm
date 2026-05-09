import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/features/auth-by-email';
import { TiltCard } from '@/shared/ui/TiltCard';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-white selection:bg-indigo-500/30 font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-center items-center">
        {/* Primary Ambient Glows using vibrant colors */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/40 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-600/40 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-blue-500/30 blur-[120px] rounded-full mix-blend-screen" />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        {/* Bento Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl w-full items-center">

          {/* Left Bento Column - Informational (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Enterprise-grade encryption ensuring your credentials remain private and protected.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <h3 className="text-lg font-semibold mb-2">Cloud Sync</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Access your workspace from any device with real-time synchronization across the globe.
              </p>
            </motion.div>
          </div>

          {/* Central Bento Column - The Login Card */}
          <div className="col-span-1 lg:col-span-4 flex justify-center">
            <TiltCard className="w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="relative overflow-hidden rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl"
              >
                {/* Inner Glass Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                <div className="relative z-10 p-8">
                  <LoginForm onLoginSuccess={() => navigate('/dashboard')} />
                </div>
              </motion.div>
            </TiltCard>
          </div>

          {/* Right Bento Column - Branding/Social (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-white/10 backdrop-blur-xl text-center"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
                Next Gen Auth
              </h2>
              <p className="text-sm text-gray-400">
                Join 10,000+ developers building the future of the web with our advanced identity layer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-white/10" />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">Active users now</span>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
