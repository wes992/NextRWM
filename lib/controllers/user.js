"use server";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { User } from "../models";
import { cookies } from "next/headers";
import { encrypt } from "../auth";

export const loginUser = async ({ email, password }) => {
  try {
    if (!password || !email) {
      return NextResponse.json(
        {
          title: "Data is Missing!",
          detail: "Please provide email and password",
        },
        { status: 422 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          title: "no user found",
          message: "There was no user found with the given credentials",
        },
        { status: 404 }
      );
    }

    const correctPW = await user.isSamePassword(password);

    if (correctPW) {
      const jwtAuth = await encrypt(user);

      // Save the session in a cookie
      cookies().set("session", jwtAuth, { httpOnly: true });

      return NextResponse.json({ auth: user }, { status: 200 });
    } else {
      return NextResponse.json(
        {
          title: "Invalid Credentials",
          message: "The provided credentials did not work. Please try again.",
        },
        { status: 401 }
      );
    }
  } catch (e) {
    throw e;
  }
};

export const registerUser = async ({
  username,
  email,
  password,
  passwordConfirmation,
}) => {
  if (!password || !email) {
    return NextResponse.json(
      {
        title: "Data is Missing!",
        detail: "Please provide email and password",
      },
      { status: 422 }
    );
  }

  if (password != passwordConfirmation) {
    return NextResponse.json(
      {
        title: "Invalid password",
        detail: "Please provide matching passwords",
      },
      { status: 422 }
    );
  }

  const user = new User({
    username,
    email,
    password,
  });
  try {
    const savedUser = await user.save();
    return NextResponse.json({ savedUser }, { status: 201 });
  } catch (err) {
    throw err;
    // const { status, ...rest } = getErrorMessage(err.code);
    // res.status(status).json(rest);
  }
};

// exports.authMiddleware = async function (req, res, next) {
//   const token = req.headers.authorization;
//   if (token) {
//     const user = parseToken(token);
//     try {
//       const foundUser = await User.findById(user.userId);

//       if (foundUser) {
//         res.locals.user = user;
//         next();
//       } else {
//         return notAuthorized(res);
//       }
//     } catch (err) {
//       const { status, ...rest } = getErrorMessage(err.code);
//       res.status(status).json(rest);
//     }
//   } else {
//     return notAuthorized(res);
//   }
// };

// function parseToken(token) {
//   return jwt.verify(token.split(" ")[1], process.env.SECRET);
// }

// function notAuthorized(res) {
//   const { status, ...rest } = getErrorMessage(401);
//   res.status(status).json(rest);
// }
