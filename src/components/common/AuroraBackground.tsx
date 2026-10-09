import React from 'react';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#070A18]">
      {/* Deep Aurora Radial Blobs */}
      <div 
        className="aurora-blob-1 absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full blur-[130px] opacity-25"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, #22D3EE 60%, transparent 70%)' }}
      />
      <div 
        className="aurora-blob-2 absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, #FB7185 0%, #A855F7 50%, transparent 70%)' }}
      />
      <div 
        className="aurora-blob-3 absolute -bottom-32 left-1/4 w-[650px] h-[650px] rounded-full blur-[150px] opacity-15"
        style={{ background: 'radial-gradient(circle, #22D3EE 0%, #3B82F6 50%, transparent 70%)' }}
      />
      
      {/* Subtle Star / Noise Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
    </div>
  );
};
