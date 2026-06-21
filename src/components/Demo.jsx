import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Demo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState(null);

  return (
    <section id="demo" className="py-20 px-4 md:px-16 lg:px-24 bg-bg-primary" ref={ref}>
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-left text-accent mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        A Diferença
      </motion.h2>

      <motion.p
        className="text-text-secondary text-lg mb-12 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
      >
        Veja o que separa o comum do profissional.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {/* Site Comum */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="mb-3 px-3 py-1 rounded-full bg-red-900/40 text-red-400 text-xs font-medium w-fit">
            Site Comum
          </span>
          <div
            className={`w-full aspect-[4/3] rounded-2xl border border-border bg-bg-card p-6 flex flex-col gap-3 transition-all duration-150 ${
              hovered === 'bad' ? 'opacity-80' : ''
            }`}
            onMouseEnter={() => setHovered('bad')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="h-4 w-2/3 rounded bg-gray-600/50" />
            <div className="h-3 w-full rounded bg-gray-700/40" />
            <div className="h-3 w-5/6 rounded bg-gray-700/40" />
            <div className="h-3 w-3/4 rounded bg-gray-700/40" />
            <div className="mt-auto h-8 w-28 rounded bg-gray-600/50" />
          </div>
        </motion.div>

        {/* Site Profissional */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="mb-3 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium w-fit">
            Site Profissional
          </span>
          <motion.div
            className="w-full aspect-[4/3] rounded-2xl border border-accent/25 bg-bg-card p-6 flex flex-col gap-3 cursor-pointer transition-all duration-150"
            style={{
              borderColor: hovered === 'good' ? 'rgba(200,164,90,0.5)' : undefined,
              boxShadow: hovered === 'good' ? '0 0 30px rgba(200,164,90,0.12)' : undefined,
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
            onMouseEnter={() => setHovered('good')}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="h-5 w-2/3 rounded bg-accent/30" />
            <div className="h-3 w-full rounded bg-accent/10" />
            <div className="h-3 w-5/6 rounded bg-accent/10" />
            <div className="h-3 w-3/4 rounded bg-accent/10" />
            <div className="mt-auto flex gap-2">
              <div className="h-9 w-32 rounded-lg bg-accent/80" />
              <div className="h-9 w-24 rounded-lg border border-accent/30" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
