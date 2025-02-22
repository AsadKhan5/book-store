import React, { useRef } from "react";
import TextInput from "../../TextInput/TextInput";

import { useStore } from "../../../../store/Store";
import { LoginUser } from "../../../../utils/ENE_Api";
import {
  Link,
  useNavigate,
  useLocation,
  json,
  redirect,
} from "react-router-dom";

function Login() {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const loginHandler = async () => {
    navigate("/BookDashboard");
    localStorage.setItem("token", "u83401tu83r0njef;vmlnvu3rqhg803nvjl");
    localStorage.setItem("userRole", "admin");
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex gap-5 flex-col rounded-2xl shadow-2xl p-10 w-96 border-r-2 border-t-2 border-primary">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold">Book</h2>
            <h2 className="text-sm">Management Store</h2>
          </div>
          {/* <br /> */}
          <h3 className="text-xl text-slate-500 font-bold">Signin</h3>
          <div id="login-form" className="flex flex-col gap-5">
            <TextInput placeholder=" Email/Username" type="email" ref={email} />
            <TextInput placeholder=" Password" type="password" ref={password} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ flexWrap: "wrap" }}>
                <Link to="/forgetPassword" className="btn btn-link p-0 m-0">
                  Forget Password?
                </Link>
              </label>
            </div>
            <button
              onClick={loginHandler}
              className="btn btn-primary text-white"
            >
              Login
            </button>
            <p id="error-message" style={{ color: "red" }}></p>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ flexWrap: "wrap" }}>Don't have an account?</label>
            <label style={{ flexWrap: "wrap" }}>
              You can{" "}
              <Link to="/signup" className="btn btn-link p-0">
                Sign up
              </Link>{" "}
              to create an account
            </label>
          </div>

          {/* <label>© Alpha Engineering Pvt Ltd 2018-2025</label> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
