"use server";

import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { User } from "../models";
import { cookies } from "next/headers";
import { encrypt } from "../auth";

export const loginUser = async ({ email, password }) => {
  try {
    if (!password || !email) {
      NextResponse.json(
        {
          title: "Data is Missing!",
          detail: "Please provide email and password",
        },
        { status: 422 }
      );
    }

    const user = await User.findOne({ email });

    const correctPW = await user.isSamePassword(password);

    if (correctPW) {
      const jwtAuth = await encrypt(user);

      // Save the session in a cookie
      cookies().set("session", jwtAuth, { httpOnly: true });
      NextResponse.json({ auth: user }, { status: 200 });
      redirect("/rentals");
    }
  } catch (e) {
    throw e;
  }
};

export const registerUser = async (formData) => {
  const { username, email, password, passwordConfirmation } = formData;

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
    NextResponse.json({ savedUser }, { status: 201 });
    redirect("/login");
  } catch (err) {
    throw err;
    // const { status, ...rest } = getErrorMessage(err.code);
    // res.status(status).json(rest);
  }
};

// exports.auth = async function (req, res) {
//   const { email, password } = req.body;

//   if (!password || !email) {
//     return res.status(422).send({
//       errors: [
//         {
//           title: "Data is Missing!",
//           detail: "Please provide email and password",
//         },
//       ],
//     });
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     const { status, ...rest } = getErrorMessage(DBErrors.EMPTY_RESULT);
//     return res.status(status).json(rest);
//   }

//   const correctPW = await user.isSamePassword(password);

//   if (correctPW) {
//     const jwtAuth = jwt.sign(
//       {
//         userId: user.id,
//         username: user.username,
//       },
//       process.env.SECRET,
//       { expiresIn: "1hr" }
//     );
//     res.headers(jwtAuth);
//     return res.status(HTTPCode.OKAY).json(jwtAuth);
//   } else {
//     return res.status(HTTPCode.NOT_FOUND).send({
//       errors: "Incorrect Data",
//       message: "Incorrect Email or Password entered",
//     });
//   }
// };

// exports.register = async function (req, res) {
//   const { username, email, password, passwordConfirmation } = req.body;

//   if (!password || !email) {
//     return res.status(422).send({
//       errors: [
//         {
//           title: "Data is Missing!",
//           detail: "Please provide email and password",
//         },
//       ],
//     });
//   }
//   if (password != passwordConfirmation) {
//     return res.status(422).send({
//       errors: [
//         {
//           title: "Invalid password",
//           detail: "Please provide matching passwords",
//         },
//       ],
//     });
//   }

//   const user = new User({
//     username,
//     email,
//     password,
//   });
//   try {
//     const savedUser = await user.save();
//     res.json({ savedUser });
//   } catch (err) {
//     const { status, ...rest } = getErrorMessage(err.code);
//     res.status(status).json(rest);
//   }
// };

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
