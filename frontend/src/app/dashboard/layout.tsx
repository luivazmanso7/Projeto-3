import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <DashboardSidebar />
            <div className="flex-1 ml-56 min-h-screen bg-[#F6F6DE]">
                <DashboardTopbar />
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
} 