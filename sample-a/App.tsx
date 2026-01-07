import React, { useEffect, useState } from 'react';
import { ROADMAP_DATA } from './constants';
import StageCard from './components/StageCard';
import Background from './components/Background';
import CurvedPath from './components/CurvedPath';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden font-sans">
      <Background />
      
      <main className="relative w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center z-10 h-screen justify-center">
        
        {/* Desktop View: The Arc */}
        <div className="hidden md:block relative w-full h-[600px]">
          
          {/* SVG Connector Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
             <CurvedPath />
          </div>

          {/* 
            Cards positioned absolutely based on the curve geometry.
            Curve: Quad Bezier from (-100, 420) to (1100, 420) with Control (500, 120).
            Height reference: 600px.
            Curve Y at t=0.5 (Center) is 270px (45%).
            Curve Y at t=0.125/0.875 (Ends 5%/95%) is approx 354px (59%).
            Curve Y at t=0.308/0.692 (Mid-ish 27%/73%) is approx 292px (49%).
            
            Transform Adjustment:
            The 'StageCard' has a red anchor dot absolute positioned at '-bottom-8' (32px).
            To place this dot exactly on the curve coordinate (top/left), we must translate the container up.
            translateY(-100%) places the bottom of the content at the coordinate.
            The dot is ~30px below that.
            So we translate Y by -100% - 30px.
          */}
          
          {/* Node 1 */}
          <div className="absolute left-[5%] top-[59%] -translate-x-1/2 transition-all duration-700 delay-[0ms] hover:z-50"
               style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translate(-50%, calc(-100% - 30px))' : 'translate(-50%, -50%)' }}>
            <StageCard data={ROADMAP_DATA[0]} isEven={false} />
          </div>

          {/* Node 2 */}
          <div className="absolute left-[27%] top-[49%] -translate-x-1/2 transition-all duration-700 delay-[200ms] hover:z-50"
               style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translate(-50%, calc(-100% - 30px))' : 'translate(-50%, -50%)' }}>
             <StageCard data={ROADMAP_DATA[1]} isEven={true} />
          </div>

          {/* Node 3 (Peak) */}
          <div className="absolute left-[50%] top-[45%] -translate-x-1/2 transition-all duration-700 delay-[400ms] hover:z-50"
               style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translate(-50%, calc(-100% - 30px))' : 'translate(-50%, -50%)' }}>
            <StageCard data={ROADMAP_DATA[2]} isEven={false} />
          </div>

          {/* Node 4 */}
          <div className="absolute left-[73%] top-[49%] -translate-x-1/2 transition-all duration-700 delay-[600ms] hover:z-50"
               style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translate(-50%, calc(-100% - 30px))' : 'translate(-50%, -50%)' }}>
             <StageCard data={ROADMAP_DATA[3]} isEven={true} />
          </div>

          {/* Node 5 */}
          <div className="absolute left-[95%] top-[59%] -translate-x-1/2 transition-all duration-700 delay-[800ms] hover:z-50"
               style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translate(-50%, calc(-100% - 30px))' : 'translate(-50%, -50%)' }}>
            <StageCard data={ROADMAP_DATA[4]} isEven={false} />
          </div>
        </div>

        {/* Mobile View: Vertical Timeline (Simpler fallback) */}
        <div className="md:hidden flex flex-col items-center space-y-12 w-full mt-10">
          {ROADMAP_DATA.map((stage, index) => (
            <div key={stage.id} className="relative w-full flex justify-center">
              {/* Vertical Connecting Line */}
              {index !== ROADMAP_DATA.length - 1 && (
                <div className="absolute h-full w-[2px] bg-red-200 left-1/2 top-1/2 -z-10" />
              )}
              <StageCard data={stage} isEven={index % 2 === 0} />
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default App;