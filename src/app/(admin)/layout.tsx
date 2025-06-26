// src/app/(admin)/layout.tsx
'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { PlesGroupLogo } from '@/components/logo';
import { LayoutDashboard, Users, Package, ShoppingCart, Workflow, LogOut, ShieldCheck, FileText } from 'lucide-react'; // Added FileText
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { hasPermission } from '@/lib/models/user';

export default function AdminLayout({ children }: PropsWithChildren) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const auth = app ? getAuth(app) : null;
  const { toast } = useToast();
  const userRole = userProfile?.role;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    if (!auth) {
        toast({ title: "Logout Failed", description: "Firebase is not configured.", variant: "destructive" });
        return;
    }
    try {
      await signOut(auth);
      document.cookie = 'firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear cookie
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
         <div className="flex h-screen">
            <div className="w-64 border-r p-4 space-y-4 hidden md:block">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" /> {/* Added for content management */}
            </div>
            <div className="flex-1 p-6 space-y-4">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-64 w-full" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        </div>
    );
  }

  if (!user) {
    return null;
  }

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

                          {hasPermission(userRole, 'manage_crm') && (
                            <>
                              <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/crm">
                                      <span className="flex items-center gap-x-2">
                                         <Users />
                                         CRM Contacts
                                      </span>
                                    </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/crm/opportunities">
                                      <span className="flex items-center gap-x-2">
                                         <Users />
                                         CRM Opportunities
                                      </span>
                                    </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            </>
                          )}

                         {hasPermission(userRole, 'manage_erp') && (
                           <>
                             <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/erp/products">
                                      <span className="flex items-center gap-x-2">
                                         <Package />
                                         ERP Products
                                      </span>
                                    </Link>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                             <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/erp/orders">
                                      <span className="flex items-center gap-x-2">
                                         <ShoppingCart />
                                         ERP Orders
                                      </span>
                                    </Link>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                           </>
                         )}

                          {(hasPermission(userRole, 'manage_bpm') || hasPermission(userRole, 'view_bpm')) && (
                              <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/bpm/processes">
                                      <span className="flex items-center gap-x-2">
                                         <Workflow />
                                         BPM Processes
                                      </span>
                                    </Link>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                          )}
                         
                         {hasPermission(userRole, 'manage_content') && (
                             <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                   <Link href="/admin/content-management">
                                     <span className="flex items-center gap-x-2">
                                        <FileText />
                                        Manage Content
                                     </span>
                                   </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem>
                         )}

                         {hasPermission(userRole, 'manage_users') && (
                             <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                   <Link href="/admin/users">
                                     <span className="flex items-center gap-x-2">
                                        <ShieldCheck />
                                        Manage Users
                                     </span>
                                   </Link>
                               </SidebarMenuButton>
                             </SidebarMenuItem>
                         )}
                    </SidebarMenu>
                 </SidebarGroup>
            </SidebarContent>
             <SidebarFooter>
                <SidebarMenu>
                     <SidebarMenuItem>
                         <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10">
                             <LogOut />
                             <span>Logout ({userProfile?.email})</span>
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
