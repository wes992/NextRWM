import { loginUser } from "@/lib/controllers/user";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  const result = await loginUser({
    email,
    password,
  });

  return result;
};
