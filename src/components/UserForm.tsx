import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { User } from "../lib/types";
import STRINGS from "../lib/strings";
import CONST from "../lib/const";

const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const response = await axios.post(
        "https://gorest.co.in/public/v2/users",
        {
          name: data.name,
          gender: data.gender,
          email: data.email,
          status: data.status,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${CONST.gorestAuthToken}`,
          },
        }
      );
      console.log(response.data);

      alert(STRINGS.userSuccessful);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response?.data;

        // Handle email already in use
        if (errors && Array.isArray(errors)) {
          errors.forEach((err: any) => {
            if (err.field === "email") {
              setError("email", {
                type: "manual",
                message: STRINGS.emailUsed,
              });
            }
          });
        }
      }
    }
  };

  return (
    <div className="container">
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Enter Name"
            type="text"
            {...register("name", {
              required: STRINGS.nameRequired,
              minLength: { value: 2, message: STRINGS.minName },
              maxLength: { value: 50, message: STRINGS.maxName },
            })}
          />
          {errors.name && (
            <span>
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <input
            placeholder="Enter Email"
            type="email"
            {...register("email", {
              required: STRINGS.emailRequired,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: STRINGS.emailInvalid,
              },
            })}
          />
          {errors.email && (
            <span>
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <select
            defaultValue=""
            {...register("gender", { required: STRINGS.genderRequired })}
          >
            <option value="" disabled hidden>
              Select gender...
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Not specify</option>
          </select>
          {errors.gender && (
            <span>
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.gender.message}
            </span>
          )}
        </div>

        <div>
          <select
            defaultValue=""
            {...register("status", { required: STRINGS.statusRequired })}
          >
            <option disabled hidden value="">
              Select status...
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && (
            <span>
              <i className="fa-solid fa-circle-exclamation"></i>
              {errors.status.message}
            </span>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserForm;
