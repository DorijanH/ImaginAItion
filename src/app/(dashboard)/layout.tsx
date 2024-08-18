import Sidebar from './_components/sidebar';
import Navbar from './_components/navbar';

type DashboardLayoutProps = {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full bg-muted">
      <Sidebar />

      <div className="flex h-full flex-col lg:pl-[300px]">
        <Navbar />

        <main className="flex-1 overflow-auto bg-white p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}