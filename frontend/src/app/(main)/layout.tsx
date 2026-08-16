import { AppSidebar } from "@/components/layout/AppSidebar";
import Navbar from "@/components/layout/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { UserProvider } from "@/context/UserContext";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <UserProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Navbar />
                    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </UserProvider>
    );
}