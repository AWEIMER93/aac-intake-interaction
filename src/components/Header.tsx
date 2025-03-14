
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="w-full py-6 px-6 sm:px-8 flex items-center justify-between z-10 appear-animate" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 13C9 11.3431 10.3431 10 12 10V10C13.6569 10 15 11.3431 15 13V13C15 14.6569 13.6569 16 12 16H9V13Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 7L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-medium leading-none">AAC Customization</h1>
          <p className="text-sm text-secondary-foreground mt-1">SLP Intake Portal</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 flex items-center justify-center btn-hover"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
}

export default Header;
