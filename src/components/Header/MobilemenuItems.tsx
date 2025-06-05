import React from 'react';
import NavMenuItem from './NavMenuItem';
import { ChevronDown } from 'lucide-react';
import FeaturesMenu from './FeaturesMenu';
import useMenuStore from '@/hooks/uihooks/useMenustate';

interface MobilemenuItemsProps {
  visible: boolean;
}

const MobilemenuItems: React.FC<MobilemenuItemsProps> = ({ visible }) => {
    const {featureMenuOpen,toggleFeatureMenu}=useMenuStore()
  return (
    <div
      className={`fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white backdrop-blur-md z-40 transition-transform duration-300 ease-in-out lg:hidden ${
        visible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col text-2xl">
        {/* Features with Chevron */}
        <div className="flex flex-row justify-between items-center py-4 px-4 border-t border-b border-border/50" onClick={toggleFeatureMenu}>
          <NavMenuItem href='/' Label="Features" className="font-normal text-primary" />
          <ChevronDown
            className="relative h-8 w-8 text-primary transition duration-200"
          />
        </div>

        {/* Features Submenu */}
        {featureMenuOpen && 
        <FeaturesMenu />}
        

        {/* Other Menu Items */}
        <NavMenuItem
        href='/'
          Label="Privacy and safety"
          className="font-normal text-primary py-4 px-4 border-t border-b border-border/50  justify-start"
        />
        <NavMenuItem
        href='/'
          Label="Mobile App"
          className="font-normal text-primary py-4 px-4 border-t border-b border-border/50 justify-start"
        />
        <NavMenuItem
        href='/'
          Label="Help Center"
          className="font-normal text-primary py-4 px-4 border-t border-b border-border/50 justify-start"
        />
      </div>
    </div>
  );
};

export default MobilemenuItems;