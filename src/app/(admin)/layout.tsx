// src/app/(admin)/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarProvider, SidebarInset, SidebarHeader, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar'; // Assuming you have a Sidebar component
import { PlesGroupLogo } from '@/components/logo';
import { LayoutDashboard, Users, Package, ShoppingCart, Workflow, LogOut } from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase-config';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);
  const { toast } = useToast();

  useEffect(() => {
    // If not loading and no user is found, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
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


  // Show loading state or nothing while checking auth
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
                         <SidebarMenuItem>
                             <SidebarMenuButton asChild>
                                <Link href="/admin/dashboard">
                                     <LayoutDashboard />
                                     <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                         </SidebarMenuItem>
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
                          <SidebarMenuItem>
                             <SidebarMenuButton asChild>
                                <Link href="/admin/bpm/processes">
                                     <Workflow />
                                     <span>BPM Processes</span>
                                </Link>
                            </SidebarMenuButton>
                         </SidebarMenuItem>
                        {/* TODO: Add Manage Users link */}
                         {/* <SidebarMenuItem>
                            <SidebarMenuButton asChild><Link href="/admin/users">...</Link></SidebarMenuButton>
                         </SidebarMenuItem> */}
                    </SidebarMenu>
                 </SidebarGroup>
            </SidebarContent>
             <SidebarFooter>
                <SidebarMenu>
                     <SidebarMenuItem>
                         <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10">
                             <LogOut />
                             <span>Logout</span>
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
