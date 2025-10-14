import React from "react";
import useAuthStore from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Full Name</label>
          <div>
            <input
              className="input input-bordered input-primary"
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label htmlFor="">Email</label>
          <div>
            <input
              className="input input-bordered input-primary"
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label htmlFor="">Password</label>
          <div>
            <input
              className="input input-bordered input-primary"
              type="text"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          {isSigningUp ? (
            <LoaderIcon className="w-full h-5 animate-spin text-center" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
