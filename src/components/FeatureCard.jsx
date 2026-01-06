import React from 'react';


const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-brand-soft rounded-xl hover:bg-surface hover:shadow-lg transition duration-300 border border-transparent hover:border-border">
    <div className="bg-surface p-4 rounded-full shadow-sm mb-4 text-brand">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
    <p className="text-text-muted">{desc}</p>
  </div>
);

export default FeatureCard;