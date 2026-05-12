import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', style, title }) => {
  return (
    <div className={`glass-card ${className}`} style={{ padding: 'var(--spacing-md)', ...style }}>
      {title && <h3 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--primary)' }}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
