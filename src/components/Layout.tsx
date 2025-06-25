
import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Zap, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/ecb935b6-e63d-4d0f-a3f3-be156475a385.png)',
            backgroundAttachment: 'fixed'
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
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-3 h-3 text-blue-400 animate-bounce" />
                  </div>
                </div>
                <h1 className="text-xl font-semibold text-white font-inter relative">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Quantum Vacuum Manipulator
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-sm animate-pulse"></div>
                </h1>
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
