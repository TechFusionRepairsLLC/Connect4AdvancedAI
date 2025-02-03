import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-white/60 hover:text-white transition-colors"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};