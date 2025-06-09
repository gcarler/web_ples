// src/app/(admin)/layout.tsx
'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar'; // Assuming you have a Sidebar component
import { PlesGroupLogo } from '@/components/logo';
import { LayoutDashboard, Users, Package, ShoppingCart, Workflow, LogOut, ShieldCheck, Gem, HeartPulse, Target, Globe, Rocket, Eye } from 'lucide-react'; // Added ShieldCheck for potential admin management
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton
import { hasPermission } from '@/lib/models/user'; // Import permission checker

export default function AdminLayout({ children }: PropsWithChildren) {
  const { user, userProfile, loading } = useAuth(); // Get userProfile which contains the role
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();
  const userRole = userProfile?.role; // Get the role from the profile

  useEffect(() => {
    // If not loading and no user is found, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
    // Optional: Add role-based redirection if a user lands here without sufficient permissions
    // This might be better handled within specific pages or middleware if rules are complex
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout Error:', error);
      toast({
        title: 'Logout Failed',
        description: 'An error occurred during logout. Please try again.',
        variant: 'destructive',
      });
    }
  };


  // Show loading state or nothing while checking auth and fetching profile
  if (loading) {
    return (
         <div className="flex h-screen">
            {/* Simulate Sidebar loading */}
            <div className="w-64 border-r p-4 space-y-4 hidden md:block">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" /> {/* Added for admin management */}
            </div>
            {/* Simulate Main content loading */}
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

  // If user is not authenticated (this should theoretically be handled by the redirect, but added for safety)
  if (!user) {
    return null; // Or a message indicating redirection
  }

  // Render the admin layout if authenticated
  return (
    <SidebarProvider>
        <Sidebar>
             <SidebarHeader>
                <div className="flex items-center gap-2">
                    <PlesGroupLogo className="h-6 w-6" />
                    <span className="font-semibold">PLES Admin</span>
                    <SidebarTrigger className="ml-auto" />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Navigation</SidebarGroupLabel> */}
                    <SidebarMenu>
                         {/* Always show Dashboard */}
                         <SidebarMenuItem>
                             <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard">
                                     <LayoutDashboard />
                                     <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                         </SidebarMenuItem>

                         {/* CRM Links - Visible if user has 'manage_crm' or 'admin' role */}
                          {hasPermission(userRole, 'manage_crm') && (
                            <>
                              <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/crm">
                                         <Users />
                                         <span>CRM Contacts</span>
                                    </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                              <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/crm/opportunities">
                                         <Users /> {/* Consider diff icon */}
                                         <span>CRM Opportunities</span>
                                    </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            </>
                          )}

                         {/* ERP Links - Visible if user has 'manage_erp' or 'admin' role */}
                         {hasPermission(userRole, 'manage_erp') && (
                           <>
                             <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/erp/products">
                                         <Package />
                                         <span>ERP Products</span>
                                    </Link>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                             <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/erp/orders">
                                         <ShoppingCart />
                                         <span>ERP Orders</span>
                                    </Link>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                           </>
                         )}

                         {/* BPM Links - Visible if user has 'manage_bpm', 'view_bpm', or 'admin' role */}
                          {(hasPermission(userRole, 'manage_bpm') || hasPermission(userRole, 'view_bpm')) && (
                              <SidebarMenuItem>
                                 <SidebarMenuButton asChild>
                                    <Link href="/admin/bpm/processes">
                                         <Workflow />
                                         <span>BPM Processes</span>
                                    </Link>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                          )}

                        {/* Manage Users Link - Visible only if user has 'manage_users' (typically admin) */}
                         {hasPermission(userRole, 'manage_users') && (
                             <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                   <Link href="/admin/users">
                                        <ShieldCheck /> {/* Icon for user management */}
                                        <span>Manage Users</span>
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
                             <span>Logout ({userProfile?.email})</span> {/* Show user email */}
                         </SidebarMenuButton>
                     </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
         <SidebarInset>
            <div className="p-4 md:p-6 lg:p-8"> {/* Add padding to the main content area */}
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
  );
}
