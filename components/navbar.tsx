import Link from 'next/link';
import { redirect } from 'next/navigation';

import { clearSession } from '@/utils/session';

const NavBar = () => {
  const logout = async () => {
    'use server';

    await clearSession();

    redirect('/');
  };

  return (
    <nav className="w-full bg-white shadow-lg absolute">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end gap-6">
        <Link
          href="/profile"
          className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-4 py-2 rounded-md hover:bg-gray-100"
        >
          Profile
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 px-4 py-2 rounded-md hover:bg-red-50"
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
