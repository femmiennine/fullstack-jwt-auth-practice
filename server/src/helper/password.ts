import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashedPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (Error) {
    console.log(Error);
  }
};
