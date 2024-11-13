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
    <main>
      <section className="h-svh flex flex-col justify-center items-center">
        <div>
          <h2 className="font-extrabold text-2xl">{`Welcome ${user.email}!`}</h2>
        </div>
        <div>{user.bio || '-'}</div>
      </section>
    </main>
  );
};

export default ProfilePage;
