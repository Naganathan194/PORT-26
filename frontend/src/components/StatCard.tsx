import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="p-3 bg-violet-900/30 rounded-xl text-violet-300 mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-4xl font-serif font-bold text-white mb-2">{value}</h3>
      <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  </motion.div>
);

export default StatCard;
