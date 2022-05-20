import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "../utils/useForm";
import { AuthContext } from "../context/auth";

const REGISTER_USER_MUTATION = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const { values, loading, onChange, onSubmit, setLoading } = useForm(
    registerUser,
    {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }
  );

  const [register] = useMutation(REGISTER_USER_MUTATION, {
    update(cache, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
      setLoading(false);
    },
    variables: values,
  });

  function registerUser() {
    register();
  }

  return (
    <div
      className="w-[500px] mx-auto mt-12 px-10 py-10 bg-white rounded-lg shadow-lg overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 190, 111, 0.5), rgba(206, 182, 240, 0.5))",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-14 mx-auto mb-4 mt-2 text-[#3d405b] bg-[#ffd46f] rounded-full shadow-md animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-center font-semibold text-3xl text-[#3d405b] tracking-wide drop-shadow-md">
        Welcome to <span className="text-[#fff]">Cheer</span>
      </h2>

      <form className="mt-8" onSubmit={onSubmit} noValidate>
        {/* Username*/}
        <label
          htmlFor="username"
          className="block text-xs font-semibold text-gray-600 uppercase"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="username"
          className={`block w-full py-2 px-2 mt-2 text-[#3d405b] appearance-none border-2 border-transparent rounded-md transition duration-500 focus:outline-none focus:border-[#b7a8e8] ${
            errors.username ? "border-[#ffa718]" : ""
          }`}
          required
          value={values.username}
          onChange={onChange}
        />

        {/* Email*/}
        <label
          htmlFor="email"
          className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="e-mail"
          className={`block w-full py-2 px-2 mt-2 text-[#3d405b] appearance-none border-2 border-transparent rounded-md transition duration-500 focus:outline-none focus:border-[#b7a8e8] ${
            errors.email ? "border-[#ffa718]" : ""
          }`}
          required
          value={values.email}
          onChange={onChange}
        />

        {/* Password*/}
        <label
          htmlFor="password"
          className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className={`block w-full py-2 px-2 mt-2 text-[#3d405b] appearance-none border-2 border-transparent rounded-md transition duration-500 focus:outline-none focus:border-[#b7a8e8] ${
            errors.password ? "border-[#ffa718]" : ""
          }`}
          required
          value={values.password}
          onChange={onChange}
        />

        {/* Confirm Password*/}
        <label
          htmlFor="passwordConfirm"
          className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
        >
          Confirm Password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          placeholder="confirm password"
          className={`block w-full py-2 px-2 mt-2 text-[#3d405b] appearance-none border-2 border-transparent rounded-md transition duration-500 focus:outline-none focus:border-[#b7a8e8] ${
            errors.passwordConfirm ? "border-[#ffa718]" : ""
          }`}
          required
          value={values.passwordConfirm}
          onChange={onChange}
        />

        {/* Submit Buttton */}
        <button
          type="submit"
          className={`w-full py-3 mt-8 bg-[#585a79] transition duration-300 rounded-sm font-medium text-[#d9d9d9] uppercase tracking-wider focus:outline-none hover:bg-[#3e405b] hover:shadow-none ${
            loading ? "bg-[#3e405b] animate-pulse" : ""
          }`}
          disabled={loading}
        >
          <div className="flex justify-center gap-2">
            <span
              className={`h-6 w-6 block rounded-full border-4 border-[#88819e] border-t-[#ffd46f] animate-spin ${
                loading ? "" : "hidden"
              }`}
            ></span>
            <span>{loading ? "loading..." : "register"}</span>
          </div>
        </button>

        <div className="mt-6 text-sm text-center text-[#585a79] drop-shadow-md tracking-wider">
          <p>
            Already have an account?
            <Link
              to="/login"
              className="mx-2 text-[#f8f8f2] transition duration-500 hover:text-[#585a79]"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <ul className="bg-[#fcb09b94] px-8 py-4 mt-6 rounded-lg opacity-100 transition duration-500 text-[#585a79] border-2 border-solid border-[#ffffff85] shadow-md">
          {Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Register;
