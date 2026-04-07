import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
  const [phase, setPhase] = useState('entrance'); // entrance, stay, exit, slideUp

  useEffect(() => {
    // 1. Entrance finishes, stay for a bit
    const stayTimer = setTimeout(() => {
      setPhase('stay');
    }, 800);

    // 2. Start Exit animation (text fades/scales)
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1400);

    // 3. Start Slide Up animation (entire container moves)
    const slideTimer = setTimeout(() => {
      setPhase('slideUp');
    }, 1800);

    // 4. Finish entirely
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(stayTimer);
      clearTimeout(exitTimer);
      clearTimeout(slideTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const isExiting = phase === 'exit' || phase === 'slideUp';

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-ivory flex items-center justify-center overflow-hidden
        ${phase === 'slideUp' ? 'animate-[slide-up_0.6s_cubic-bezier(0.77,0,0.175,1)_forwards]' : ''}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glow behind text */}
        <div 
          className={`absolute w-64 h-64 bg-maroon/10 rounded-full blur-3xl 
            ${isExiting ? 'animate-[loader-exit_0.4s_forwards]' : 'animate-[glow-pulse_1.5s_ease-in-out_infinite_alternate]'}`}
        ></div>

        {/* Brand Text */}
        <h1 
          className={`relative font-serif italic text-5xl md:text-7xl text-charcoal tracking-tight drop-shadow-sm
            ${phase === 'entrance' ? 'animate-[loader-reveal_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards]' : ''}
            ${phase === 'exit' || phase === 'slideUp' ? 'animate-[loader-exit_0.4s_cubic-bezier(0.7,0,0.84,0)_forwards]' : ''}
          `}
        >
          <span className="text-maroon">V</span>eilux
        </h1>
      </div>
    </div>
  );
};

export default Loader;
