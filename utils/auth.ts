import bcrypt from 'bcrypt';
import db from '@/db/db';

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const id = await db.user.create({
      data: {
        email,
        password: await hashPassword(password),
        bio: '',
      },
      select: {
        id: true,
      },
    });

    return id;
  } catch (e) {
    return null;
  }
};

const checkDuplicateEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    return !!user?.id;
  } catch (e) {
    return null;
  }
};

export { hashPassword, createUser, checkDuplicateEmail };
