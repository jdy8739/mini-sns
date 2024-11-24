import bcrypt from 'bcrypt';

import db from '@/db/db';

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const createUser = async ({
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

export const findUserByEmail = async (email: string) => {
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

export const findUserById = async (id: number) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        bio: true,
      },
    });

    return user;
  } catch (e) {
    return null;
  }
};

export const checkDuplicateEmail = async (email: string) => {
  return !!(await findUserByEmail(email));
};

export const login = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const doesUserExist = await bcrypt.compare(password, user.password);

  return doesUserExist ? user.id : null;
};
