import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import qrImg from '../assets/imgs/krishnaprakash sir.jpeg';

const Tickets: React.FC = () => {
    const { theme, colors } = useTheme();

    return (
        <section className={`relative min-h-screen ${colors.bgPrimary} pt-32 pb-24 px-4 overflow-hidden transition-colors duration-300`}>
            {/* Animated background elements */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/15 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
            </div>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row items-center justify-center gap-8 mb-10"
            >
                <div className="text-center md:text-right">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-xs uppercase tracking-[0.3em] ${theme === 'light' ? 'text-violet-600' : 'text-violet-400'} mb-3`}
                    >
                        🎫 Secure Your Spot
                    </motion.p>
                    <h1 className={`text-4xl sm:text-5xl font-extrabold ${colors.textPrimary} mb-3 transition-colors duration-300`}>
                        Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Tickets</span>
                    </h1>
                    <p className={`${colors.textTertiary} text-sm max-w-md transition-colors duration-300`}>
                        Choose your experience below and book your pass for PORT'26
                    </p>
                </div>

                {/* QR Image */}
                <motion.img
                    src={qrImg}
                    alt="Registration QR Code"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`w-40 h-40 md:w-48 md:h-48 object-contain rounded-2xl border ${theme === 'light' ? 'border-slate-200 shadow-lg' : 'border-white/10 shadow-xl shadow-violet-900/20'}`}
                />
            </motion.div>

            {/* Important note (highlighted) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto mb-8"
            >
                <div className={`rounded-2xl p-[1px] ${"bg-gradient-to-r " + colors.gradientFrom + " " + colors.gradientTo}`}>
                    <div className={`rounded-2xl p-4 md:p-6 shadow-lg ${colors.cardBg}`}>
                        <p className={`${colors.textPrimary} text-sm md:text-base font-semibold`}>
                            <span className="inline-block mr-2">⚠️</span>
                            Registration fee of <span className="font-extrabold">₹350</span> must be paid separately for each day, and the Google Form must be submitted separately for each day.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Two cards for Day 1 and Day 2 forms */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className={`relative rounded-2xl overflow-hidden ${colors.cardBg} p-6 shadow-2xl ${colors.border}`}>
                    <h2 className={`text-xl font-bold ${colors.textPrimary} mb-2`}>Day 1 — Workshop</h2>
                    <p className={`${colors.textTertiary} text-sm mb-4`}>Submit the workshop registration form for Day 1. Fee: ₹350 (pay separately).</p>
                    <a
                        href="https://forms.gle/A9fhoXCPQ8WaAiWD6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2.5 rounded-lg bg-violet-600 text-white font-semibold shadow hover:brightness-105 transition"
                    >
                        Open Workshop Form
                    </a>
                </div>

                <div className={`relative rounded-2xl overflow-hidden ${colors.cardBg} p-6 shadow-2xl ${colors.border}`}>
                    <h2 className={`text-xl font-bold ${colors.textPrimary} mb-2`}>Day 2 — Events</h2>
                    <p className={`${colors.textTertiary} text-sm mb-4`}>Submit the events registration form for Day 2. Fee: ₹350 (pay separately).</p>
                    <a
                        href="https://forms.gle/FieyYtkUPKyumf3W7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:brightness-105 transition"
                    >
                        Open Events Form
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Tickets;
