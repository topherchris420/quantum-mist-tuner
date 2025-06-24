
import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200/20 px-4">
              <SidebarTrigger className="text-white hover:bg-gray-800/50" />
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-white">Quantum Vacuum Manipulator</h1>
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
