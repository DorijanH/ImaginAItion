import SidebarRoutes from './sidebar-routes';
import Logo from './logo';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 hidden h-full w-[300px] shrink-0 flex-col lg:flex">
      <Logo />

      <SidebarRoutes />
    </aside>
  );
}