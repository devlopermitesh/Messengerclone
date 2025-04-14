import React from 'react';
import Featurelink from './Featurelink';
import useMenuStore from '@/hooks/uihooks/useMenustate';

const FeaturesMenu: React.FC = () => {
  const { featureMenuOpen } = useMenuStore();

  return (
    <div
      className={`w-full bg-white backdrop-blur-md transition-all duration-300 ease-in-out ${
        featureMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } lg:absolute lg:top-16 lg:flex lg:flex-row lg:justify-around lg:py-5 h-auto`} // Up-to-bottom animation
    >
      <div className="flex flex-col lg:flex-row lg:justify-around w-full space-y-4 lg:space-y-0 lg:space-x-4 py-4 px-4">
        <Featurelink
          title="User"
          description="Show up for your family and friends with everyday connection"
          href=""
          className="transition-all duration-500 ease-in-out"
        />
        <Featurelink
          title="Social"
          description="Build community with the peoples who share your passion and interests"
          href=""
          className="transition-all duration-500 ease-in-out"
        />
        <Featurelink
          title="Expressive"
          description="Let your personality shine and express yourself beyond words"
          href=""
          className="transition-all duration-500 ease-in-out"
        />
      </div>
    </div>
  );
};

export default FeaturesMenu;