import { notFound } from 'next/navigation';

import { findUserById } from '@/utils/auth';
import { getSession } from '@/utils/session';

const ProfilePage = async () => {
  const session = await getSession();

  const user = await findUserById(session.id);

  if (!user) {
    notFound();
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-gray-100">
      <section className="h-svh flex flex-col justify-center items-center space-y-6 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="font-extrabold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            {`Welcome ${user.email}!`}
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="text-gray-700 text-lg">
            {user.bio || 'No bio available yet'}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
