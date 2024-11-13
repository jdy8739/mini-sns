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

const findUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    return user;
  } catch (e) {
    return null;
  }
};

const checkDuplicateEmail = async (email: string) => {
  return !!(await findUserByEmail(email));
};

const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return false;
  }

  const doesUserExist = await bcrypt.compare(password, user.password);

  return doesUserExist;
};

export { hashPassword, createUser, checkDuplicateEmail, login };
