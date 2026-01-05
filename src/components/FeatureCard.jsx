import React from 'react';


const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-xl hover:bg-white hover:shadow-lg transition duration-300 border border-transparent hover:border-orange-100">
    <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-orange-600">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default FeatureCard;