
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

interface CitizenLayoutProps {
  children: React.ReactNode;
  title: string;
  userName?: string;
}

const CitizenLayout: React.FC<CitizenLayoutProps> = ({ 
  children, 
  title, 
  userName = 'John' 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title={title} userType="citizen" userName={userName} />
      
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      <Navigation userType="citizen" />
    </div>
  );
};

export default CitizenLayout;
