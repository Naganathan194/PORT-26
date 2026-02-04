import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, Phone, Mail } from 'lucide-react';
import { COORDINATORS } from '../constants';

const CoordinatorsSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-slate-400">Questions? Our team is here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COORDINATORS.map((coordinator, idx) => (
            <motion.div 
              key={coordinator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                {coordinator.type === 'faculty' && <Award className="w-6 h-6 text-white" />}
                {coordinator.type === 'student' && <Users className="w-6 h-6 text-white" />}
                {coordinator.type === 'college' && <Calendar className="w-6 h-6 text-white" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{coordinator.name}</h3>
              <p className="text-amber-400 text-sm font-medium mb-4">{coordinator.role}</p>
              <div className="space-y-3 text-slate-400 text-sm">
                 <p className="flex items-center"><Phone className="w-4 h-4 mr-3" /> {coordinator.contact}</p>
                 <p className="flex items-center"><Mail className="w-4 h-4 mr-3" /> {coordinator.email}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
