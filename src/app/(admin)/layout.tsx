// src/app/(admin)/layout.tsx
'use client';

import type { PropsWithChildren } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { PlesGroupLogo } from '@/components/logo';
import { LayoutDashboard, LogOut, ShieldCheck, FileText, Home, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminLayout({ children }: PropsWithChildren) {
  const { userProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    toast({
      title: 'Logged Out',
      description: 'You have been logged out (Mock).',
    });
    router.push('/login');
  };

  return (
    <SidebarProvider>
        <Sidebar>
             <SidebarHeader>
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <PlesGroupLogo className="h-6 w-6" />
                        <span className="font-semibold">PLES Admin</span>
                    </Link>
                    <SidebarTrigger className="ml-auto" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Principal</SidebarGroupLabel>
                    <SidebarMenu>
                         <SidebarMenuItem>
                             <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard">
                                  <span className="flex items-center gap-x-2">
                                     <LayoutDashboard />
                                     Dashboard
                                  </span>
                                </Link>
                            </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
                 </SidebarGroup>

                 <SidebarGroup>
                    <SidebarGroupLabel>Gestión</SidebarGroupLabel>
                    <SidebarMenu>
                         <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                               <Link href="/admin/content-management">
                                 <span className="flex items-center gap-x-2">
                                    <FileText />
                                    Contenido
                                 </span>
                               </Link>
                           </SidebarMenuButton>
                         </SidebarMenuItem>

                         <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                               <Link href="/admin/users">
                                 <span className="flex items-center gap-x-2">
                                    <ShieldCheck />
                                    Usuarios
                                 </span>
                               </Link>
                           </SidebarMenuButton>
                         </SidebarMenuItem>

                         <SidebarMenuItem>
                           <SidebarMenuButton asChild disabled>
                              <Link href="#">
                                <span className="flex items-center gap-x-2 text-muted-foreground/70">
                                   <Settings />
                                   Configuración
                                </span>
                              </Link>
                           </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
                 </SidebarGroup>

                 <SidebarGroup>
                    <SidebarGroupLabel>Enlaces</SidebarGroupLabel>
                    <SidebarMenu>
                         <SidebarMenuItem>
                             <SidebarMenuButton asChild>
                                <Link href="/" target="_blank">
                                  <span className="flex items-center gap-x-2">
                                     <Home />
                                     Ver Sitio Público
                                  </span>
                                </Link>
                            </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
                 </SidebarGroup>

            </SidebarContent>
             <SidebarFooter>
                <SidebarMenu>
                     <SidebarMenuItem>
                         <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10">
                             <LogOut />
                             <span>Logout ({userProfile?.email || 'Mock Admin'})</span>
                         </SidebarMenuButton>
                     </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
         <SidebarInset>
            <div className="p-4 md:p-6 lg:p-8">
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
