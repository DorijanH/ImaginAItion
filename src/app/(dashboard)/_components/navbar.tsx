import UserButton from '@/features/auth/components/user-button';

export default function Navbar() {
  return (
    <div className="flex h-[68px] w-full items-center p-4">
      <div className="ml-auto">
        <UserButton />
      </div>
    </div>
  );
}