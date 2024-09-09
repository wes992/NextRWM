"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailRegex } from "./utils";
import { registerUser } from "@/lib/controllers/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const navigate = (route, options) => router.push(route, options);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    clearErrors,
  } = useForm();

  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (formData) => {
    // const result = await registerUser(formData);

    const result = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (result.ok) {
      navigate("/login");
      // , {
      //   state: { notification: "Registered successfully, go ahead and login" },
      // }
    } else {
      setSubmitError(result);
    }

    // if (result.success) {
    //   navigate("/login", {
    //     state: { notification: "Registered successfully, go ahead and login" },
    //   });
    // } else {
    //   setSubmitError(result.error);
    // }
    console.log(result);
  };

  return (
    <section id="register">
      <div className="rwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="username">Username</label>

                <input
                  name="username"
                  type="text"
                  className="form-control"
                  id="username"
                  {...register("username", {
                    required: "Username is required.",
                  })}
                />

                {errors.username && (
                  <div className="alert alert-danger">
                    <p>{errors.username.message}</p>
                  </div>
                )}
              </div>
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
                    validate: (val) => {
                      if (watch("passwordConfirmation") !== val) {
                        return "Your passwords do no match";
                      } else {
                        clearErrors(["password", "passwordConfirmation"]);
                      }
                    },
                  })}
                />
                {errors.password && (
                  <p className="alert alert-danger">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirmation">Confirm Password</label>

                <input
                  type="password"
                  className="form-control"
                  {...register("passwordConfirmation", {
                    required: "Password Confirmation is required.",
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Your passwords do no match";
                      } else {
                        clearErrors(["password", "passwordConfirmation"]);
                      }
                    },
                  })}
                />

                {errors.passwordConfirmation && (
                  <p className="alert alert-danger">
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-rwm"
                disabled={isSubmitting}
              >
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
                As our member you have access to most awesome places in the
                world.
              </h2>
              <Image
                width={546}
                height={730}
                src="/assets/images/register-image.jpg"
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

export default Register;
