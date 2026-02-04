import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Music, PenTool, MapPin } from 'lucide-react';

interface TimelineItem {
  time: string;
  title: string;
  desc: string;
}

interface TrackColumnProps {
  title: string;
  icon: React.ReactNode;
  theme: {
    text: string;
    bg: string;
    border: string;
    glow: string;
    line: string;
  };
  events: TimelineItem[];
  delayBase: number;
}

const TrackColumn: React.FC<TrackColumnProps> = ({ title, icon, theme, events, delayBase }) => {
  return (
    <div className="relative flex flex-col h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delayBase }}
        className="flex items-center justify-center mb-6 md:mb-8 z-10"
      >
        <div className={`p-2.5 md:p-3 rounded-xl border ${theme.border} ${theme.bg} backdrop-blur-md shadow-lg`}>
          {React.cloneElement(icon as React.ReactElement, { className: `w-4 h-4 md:w-5 md:h-5 ${theme.text}` })}
        </div>
        <h3 className="ml-2 md:ml-3 text-base md:text-lg font-serif font-bold text-white tracking-wide">{title}</h3>
      </motion.div>

      {/* Track Line - Responsive positioning */}
      <div className={`absolute top-12 md:top-14 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b ${theme.line} to-transparent opacity-40`} />

      {/* Events */}
      <div className="space-y-3 md:space-y-4 relative z-10 flex-grow px-2 md:px-4">
        {events.map((evt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: delayBase + (idx * 0.1),
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`relative bg-slate-900/80 backdrop-blur-md border border-white/5 p-3 md:p-4 rounded-lg md:rounded-xl hover:border-opacity-50 transition-all duration-500 group overflow-hidden ${theme.glow}`}
            style={{ borderColor: 'rgba(255,255,255,0.05)' }} 
          >
            {/* Hover Gradient Border Effect */}
            <div className={`absolute inset-0 rounded-lg md:rounded-xl border border-transparent ${theme.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            
            {/* Connector Dot */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delayBase + (idx * 0.1) + 0.2 }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-[50%] md:-ml-[calc(50%+0.5rem)] w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${theme.bg.replace('/10', '')} border-2 border-slate-950 shadow-[0_0_8px_currentColor] z-20`} 
            />
            
            <div className="flex flex-col relative z-10">
              <span className={`text-[9px] md:text-[10px] font-bold ${theme.text} mb-1 tracking-widest uppercase`}>{evt.time}</span>
              <h4 className="text-white font-bold text-sm md:text-base mb-1 group-hover:text-white transition-colors leading-tight">{evt.title}</h4>
              <div className="text-slate-500 text-[10px] md:text-xs flex items-center">
                <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 opacity-70" /> {evt.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
  const technicalTrack: TimelineItem[] = [
    { time: '09:00 AM', title: 'Hackathon Kickoff', desc: 'Innovation Hub' },
    { time: '11:00 AM', title: 'AI Innovation Summit', desc: 'Seminar Hall' },
    { time: '02:00 PM', title: 'RoboWars Round 1', desc: 'Main Arena' },
    { time: '04:00 PM', title: 'Cyber Security Talk', desc: 'Lab 304' },
  ];
  const nonTechTrack: TimelineItem[] = [
    { time: '10:00 AM', title: 'Debate League', desc: 'Lecture Hall A' },
    { time: '01:00 PM', title: 'Photography Walk', desc: 'Campus Grounds' },
    { time: '03:00 PM', title: 'Gaming Tournament', desc: 'Student Lounge' },
    { time: '06:00 PM', title: 'Neon Nights Dance', desc: 'Grand Auditorium' },
  ];
  const workshopTrack: TimelineItem[] = [
    { time: '09:30 AM', title: 'Gen AI Masterclass', desc: 'Computer Lab 1' },
    { time: '12:00 PM', title: 'UI/UX Design Systems', desc: 'Design Studio' },
    { time: '02:30 PM', title: 'Cloud Architecture', desc: 'Computer Lab 2' },
  ];

  return (
    <section className="py-24 bg-slate-950 relative">
       {/* Background noise texture */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
       
       <div className="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">
         <div className="text-center mb-16">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4"
            >
              The Journey
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
            >
              Event Timeline
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Three distinct tracks running in parallel. Curate your own experience from dawn till dusk.
            </motion.p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <TrackColumn 
              title="Technical" 
              icon={<Cpu />} 
              theme={{
                text: 'text-cyan-400',
                bg: 'bg-cyan-500/10',
                border: 'border-cyan-500/30',
                glow: 'hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]',
                line: 'from-cyan-500/50'
              }}
              events={technicalTrack}
              delayBase={0}
            />
            <TrackColumn 
              title="Non-Technical" 
              icon={<Music />} 
              theme={{
                text: 'text-fuchsia-400',
                bg: 'bg-fuchsia-500/10',
                border: 'border-fuchsia-500/30',
                glow: 'hover:shadow-[0_0_30px_-5px_rgba(232,121,249,0.15)]',
                line: 'from-fuchsia-500/50'
              }}
              events={nonTechTrack}
              delayBase={0.15}
            />
            <TrackColumn 
              title="Workshops" 
              icon={<PenTool />} 
              theme={{
                text: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/30',
                glow: 'hover:shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]',
                line: 'from-emerald-500/50'
              }}
              events={workshopTrack}
              delayBase={0.3}
            />
         </div>
       </div>
    </section>
  );
};

export default TimelineSection;
