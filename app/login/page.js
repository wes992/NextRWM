"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailRegex } from "../register/utils";
import { loginUser } from "@/lib/controllers/user";
import Image from "next/image";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [submitError, setSubmitError] = useState("");

  const handleLogin = async (formData) => {
    const result = await loginUser(formData);
    // if (result.success) {
    //   setIsLoggedIn(true);
    //   navigate("/");
    // } else {
    //   setSubmitError(result.error);
    // }
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     navigate("./", { replace: true });

  //     return clearTimeout(timeout);
  //   }, 3000);
  // }, []);

  return (
    <section id="login">
      <div className="rwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1>Login</h1>
            {/* {location?.state?.notification && (
              <div className="alert alert-info">
                {location?.state?.notification}
              </div>
            )} */}
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  // type="email"
                  className="form-control"
                  id="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: emailRegex,
                      message: "Must have a valid format (user@email.com)",
                    },
                    validate: () => setSubmitError(""),
                  })}
                />
                {errors.email && (
                  <div className="alert alert-danger">
                    <p>{errors.email.message}</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password", {
                    required: "Password is required.",
                    validate: () => setSubmitError(""),
                  })}
                />
                {errors.password && (
                  <p className="alert alert-danger">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button className="btn btn-rwm" disabled={isSubmitting}>
                Submit
              </button>
              {submitError && (
                <p className="alert alert-danger">{submitError.message}</p>
              )}
            </form>
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">
                Hundreds of awesome places in reach of few clicks.
              </h2>
              <Image
                width={546}
                height={730}
                src="/assets/images/login-image.jpg"
                alt=""
                className="hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
