import React from 'react';

const CurvedPath: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-0 hidden md:block">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
           Flatter Curve Logic (approximate 1000x600 view):
           Start: 0, 400
           Control: 500, 150 (Peak is lower/smoother)
           End: 1000, 400
        */}
        
        {/* Glow Layer */}
        <path
          d="M -100,420 Q 500,120 1100,420"
          fill="none"
          stroke="#ff0000"
          strokeWidth="8"
          strokeLinecap="round"
          className="opacity-20"
          filter="url(#glow-red)"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated Dashed Line */}
        <path
          d="M -100,420 Q 500,120 1100,420"
          fill="none"
          stroke="#ef4444" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="12 12"
          className="opacity-100"
          vectorEffect="non-scaling-stroke"
        >
          <animate 
             attributeName="stroke-dashoffset" 
             from="200" 
             to="0" 
             dur="20s" 
             repeatCount="indefinite" 
             calcMode="linear"
          />
        </path>
        
        {/* Solid Core Line (Thinner) */}
        <path
          d="M -100,420 Q 500,120 1100,420"
          fill="none"
          stroke="#dc2626"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Moving Particles for density/activity - White dot removed */}
        <circle r="4" fill="#ff0000">
            <animateMotion dur="5s" begin="1s" repeatCount="indefinite" path="M -100,420 Q 500,120 1100,420" />
        </circle>
      </svg>
    </div>
  );
};

export default CurvedPath;