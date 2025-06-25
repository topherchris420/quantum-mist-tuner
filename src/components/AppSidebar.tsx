
import React from 'react';
import { Home, Settings, Zap, FlaskConical, BookOpen } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: "Simulation",
    url: "#",
    icon: FlaskConical,
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200/20 backdrop-blur-sm bg-black/20">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-4">
          <img 
            src="/lovable-uploads/40fda106-dc94-460e-bbc6-fd9ffec81eaa.png" 
            alt="Quantum Fun Logo" 
            className="w-16 h-16 rounded-xl object-cover shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold text-white">Quantum Fun</h2>
            <p className="text-sm text-gray-300">Vacuum Manipulator</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg p-3 transition-all duration-200">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">
          <p>Quantum Vacuum Simulation</p>
          <p>Version 1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
