'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketTab?: 'events' | 'workshop';
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, ticketTab = 'events' }) => {
    const { theme, colors } = useTheme();
    const [accepted, setAccepted] = useState(false);
    const router = useRouter();

    const handleOk = () => {
        if (accepted) {
            router.push(`/tickets?tab=${ticketTab}`);
            onClose();
            setAccepted(false);
        }
    };

    const handleClose = () => {
        onClose();
        setAccepted(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={handleClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={`relative z-10 w-full max-w-2xl rounded-3xl p-6 sm:p-8 ${colors.bgSecondary} ${colors.border} border`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose}
                            className={`absolute top-4 right-4 sm:top-6 sm:right-6 ${colors.textSecondary} hover:${colors.textPrimary} transition-colors`}
                        >
                            <X size={24} />
                        </button>

                        <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${colors.textPrimary} mb-4`}>
                            Register Now
                        </h2>

                        <p className={`${colors.textSecondary} mb-6 leading-relaxed`}>
                            Thank you for your interest in our event! By registering, you agree to the terms and conditions.
                            Please check the box below to confirm, and we'll redirect you to complete your registration.
                        </p>

                        <div className="flex items-center gap-3 mb-6">
                            <input
                                type="checkbox"
                                id="accept-terms"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                className="w-5 h-5 cursor-pointer"
                            />
                            <label htmlFor="accept-terms" className={`${colors.textSecondary} cursor-pointer`}>
                                I agree to the terms and conditions
                            </label>
                        </div>

                        <div className="flex gap-3 sm:flex-row flex-col">
                            <button
                                onClick={handleClose}
                                className={`flex-1 px-6 py-3 rounded-xl ${colors.bgTertiary} ${colors.textPrimary} hover:opacity-80 transition-opacity font-semibold`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOk}
                                disabled={!accepted}
                                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                                    accepted
                                        ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                                        : `${colors.bgTertiary} ${colors.textSecondary} cursor-not-allowed opacity-50`
                                }`}
                            >
                                Proceed to Registration
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
