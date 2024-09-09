import { registerUser } from "@/lib/controllers/user";

export const POST = async (req) => {
  const { email, password, passwordConfirmation, username } = await req.json();

  const result = await registerUser({
    email,
    password,
    passwordConfirmation,
    username,
  });

  return result;
};
