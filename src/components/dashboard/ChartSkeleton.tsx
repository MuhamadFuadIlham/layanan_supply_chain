import React from 'react';
import { motion } from 'framer-motion';

export type SkeletonVariant = 'area' | 'bar' | 'treemap' | 'radar' | 'gauge' | 'kpi';

interface ChartSkeletonProps {
  variant: SkeletonVariant;
  height?: number;
}

export function ChartSkeleton({ variant, height = 300 }: ChartSkeletonProps) {
  const renderShape = () => {
    switch (variant) {
      case 'kpi':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
            <div className="skeleton-shimmer" style={{ width: '40%', height: 16, borderRadius: 4 }} />
            <div className="skeleton-shimmer" style={{ width: '70%', height: 32, borderRadius: 6 }} />
            <div className="skeleton-shimmer" style={{ width: '50%', height: 14, borderRadius: 4 }} />
          </div>
        );
      
      case 'treemap':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8, height: '100%', padding: 16 }}>
            <div className="skeleton-shimmer" style={{ gridRow: 'span 2', borderRadius: 8 }} />
            <div className="skeleton-shimmer" style={{ borderRadius: 8 }} />
            <div className="skeleton-shimmer" style={{ borderRadius: 8 }} />
          </div>
        );
        
      case 'area':
      case 'bar':
        return (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: '100%', padding: '32px 16px 16px', borderLeft: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="skeleton-shimmer" 
                style={{ 
                  flex: 1, 
                  height: `${30 + Math.random() * 60}%`, 
                  borderRadius: variant === 'bar' ? '4px 4px 0 0' : '8px 8px 0 0',
                  opacity: 0.5 + (Math.random() * 0.5)
                }} 
              />
            ))}
          </div>
        );

      case 'radar':
      case 'gauge':
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div className="skeleton-shimmer" style={{ width: height * 0.7, height: height * 0.7, borderRadius: '50%' }} />
          </div>
        );

      default:
        return <div className="skeleton-shimmer" style={{ width: '100%', height: '100%', borderRadius: 8 }} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ height, width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {renderShape()}
    </motion.div>
  );
}
