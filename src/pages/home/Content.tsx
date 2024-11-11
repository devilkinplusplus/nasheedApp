import React from 'react';

const Content: React.FC = () => {
  const pillars = [
    { title: 'Shahada (Faith)', description: 'The testimony of faith, declaring there is no god but Allah, and Muhammad is His messenger.' },
    { title: 'Salah (Prayer)', description: 'Performing the five daily prayers at specified times throughout the day.' },
    { title: 'Zakat (Charity)', description: 'Giving a portion of one’s wealth to those in need, usually 2.5% of savings.' },
    { title: 'Sawm (Fasting)', description: 'Fasting during the month of Ramadan from dawn till dusk, refraining from food, drink, and sinful behavior.' },
    { title: 'Hajj (Pilgrimage)', description: 'The pilgrimage to Mecca that every Muslim must perform once in a lifetime if able.' },
  ];

  return (
    <div className="h-auto p-8">
      <h2 className="text-4xl font-bold text-center mb-12 uppercase">You should know The Five Pillars of Islam</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {pillars.map((pillar, index) => (
          <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 duration-500 cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4 text-center">{pillar.title}</h3>
            <p className="text-center">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
