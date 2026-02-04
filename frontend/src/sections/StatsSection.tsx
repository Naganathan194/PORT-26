import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { Calendar, Users, Trophy, Award } from 'lucide-react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-800 to-transparent" />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <StatCard label="Total Events" value="50+" icon={<Calendar className="w-6 h-6" />} delay={0} />
          <StatCard label="Participants" value="5K+" icon={<Users className="w-6 h-6" />} delay={0.1} />
          <StatCard label="Prize Pool" value="$50K" icon={<Trophy className="w-6 h-6" />} delay={0.2} />
          <StatCard label="Colleges" value="120+" icon={<Award className="w-6 h-6" />} delay={0.3} />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
