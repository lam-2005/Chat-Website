import React from "react";
import useAuthStore from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { sisLoggingIn, login } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div
      className="bg-card w-full max-w-[450px]  absolute top-1/2 left-1/2 -translate-1/2
    shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-2xl bg-white p-5 flex gap-4 flex-col
    "
    >
      <h1 className="text-4xl text-pink-600">HELLO, FRIEND!</h1>
      <div className="w-1/2 bg-gradient-to-l from-orange-400  to-pink-300 h-0.5 self-end"></div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-4">
        <Input
          label={"Email"}
          value={formData.email}
          name={"email"}
          id={"email"}
          onChange={handleChange}
        />
        <Input
          label={"Password"}
          value={formData.password}
          name={"password"}
          id={"password"}
          onChange={handleChange}
          type="password"
        />

        <Button className={"text-xl"}>
          {sisLoggingIn ? (
            <LoaderIcon className="w-full h-5 animate-spin text-center" />
          ) : (
            <span>SIGN IN!</span>
          )}
        </Button>
      </form>
      <div className="flex gap-1 mt-5 self-center">
        <p>Don't have an account?</p>
        <Link
          to={"/signup"}
          className="text-pink-600 hover:underline font-bold"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Login;
