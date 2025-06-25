
import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/lovable-uploads/ecb935b6-e63d-4d0f-a3f3-be156475a385.png)'
          }}
        >
          {/* Dark overlay for better readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <AppSidebar />
        <SidebarInset className="flex-1 relative z-10">
          <div className="flex h-full flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/20 px-4 backdrop-blur-sm bg-black/10">
              <SidebarTrigger className="text-white hover:bg-gray-800/50" />
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-white font-inter">Quantum Vacuum Manipulator</h1>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
