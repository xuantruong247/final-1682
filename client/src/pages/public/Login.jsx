import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "../../components";
import {
  apiLogin,
  apiRegister,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user";
import Swal from "sweetalert2";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import path from "../../utils/path";
import { login } from "../../redux/user/userSlice";
import { showModal } from "../../redux/category/categorySlide";
import { useDispatch } from "react-redux";
import { validate } from "../../utils/helpers";

const Login = () => {
  const dispacth = useDispatch();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const [invalidFields, setInvalidFields] = useState([]);

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [searchParams] = useSearchParams();
  const handleForgotPassword = async () => {
    dispacth(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiForgotPassword({ email });
    dispacth(showModal({ isShowModal: false, modalChildren: null }));
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        text: "Please check your email to active account",
      }).then(() => {
        setIsForgotPassword(false);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email not found!!!",
      });
    }
  };

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [isRegister, setIsRegister] = useState(false);

  const [isVeryfiedEmail, setIsVeryfiedEmail] = useState(false);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  // SUBMIT Login and register
  const handlerSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;

    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispacth(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispacth(showModal({ isShowModal: false, modalChildren: null }));
        if (response.data.success) {
          setIsVeryfiedEmail(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response?.data?.message,
          });
        }
      } else {
        const resp = await apiLogin(data);
        if (resp.data.success) {
          dispacth(
            login({
              isLogindIn: true,
              token: resp?.data?.accessToken,
              userData: resp?.data?.userData,
            })
          );
          // searchParams.get("redirect")
          //   ? navigate(searchParams.get("redirect"))
          //   :
          window.location.replace(`/${path.HOME}`);
          Swal.fire({
            icon: "success",
            title: "Login is successfully!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: resp?.data?.message,
          });
        }
      }
    }
  }, [payload, isRegister]);
  // finalRegister
  const finalRegister = async () => {
    const res = await apiFinalRegister(token);
    if (res.data.success) {
      Swal.fire({
        icon: "success",
        text: res?.data?.response,
      }).then(() => {
        setIsRegister(false), resetPayload();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res?.data?.response,
      });
      setIsVeryfiedEmail(true);
    }
    setIsVeryfiedEmail(false);
    setToken("");
  };

  return (
    <div className="w-screen h-screen relative">
      {isVeryfiedEmail && (
        <div className="absolute top-0 left-0 z-10 right-0 bottom-0 bg-overlay flex flex-col justify-center items-center ">
          <div className="bg-white w-[500px] rounded-sm p-8">
            <h4 className="">
              We sent a code to your email. Please check your email and enter
              your code:
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
              className="p-2 border rounded-sm outline-none"
            />
            <Button
              className="px-4 py-2 bg-green-500 rounded-md font-medium text-white ml-3"
              type="submit"
              handlerOnclick={finalRegister}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
              placeholder="example: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end items-center w-full gap-4">
              <Button handlerOnclick={handleForgotPassword}>Submit</Button>
              <Button
                handlerOnclick={() => {
                  setIsForgotPassword(false);
                }}
                style="px-4 py-2 rounded-md text-white bg-green-500 text-semibold w-full"
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
      <img
        src="https://img.freepik.com/premium-photo/shopping-trolley-with-makeup-pink-background-perfume-brush-mascara_343283-573.jpg?w=2000"
        alt=""
        className="w-full h-full "
      />
      <div className="absolute top-0 left-0 right-1/2 bottom-0 flex items-center justify-center">
        <div className="p-8 bg-white rounded-md min-w-[500px]">
          <h1 className="font-semibold text-[35px] flex justify-center mb-5 text-main">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <>
              <div className="flex gap-2">
                <InputField
                  value={payload.firstname}
                  setValue={setPayload}
                  nameKey="firstname"
                  invalidFields={invalidFields}
                  setInvalidFieds={setInvalidFields}
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayload}
                  nameKey="lastname"
                  invalidFields={invalidFields}
                  setInvalidFieds={setInvalidFields}
                />
              </div>
              <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey="mobile"
                type="Number"
                invalidFields={invalidFields}
                setInvalidFieds={setInvalidFields}
              />
            </>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFieds={setInvalidFields}
          />
          <Button handlerOnclick={handlerSubmit}>
            {isRegister ? "Register" : "Login"}
          </Button>
          <div className="flex justify-between my-2">
            {!isRegister && (
              <span
                onClick={() => {
                  setIsForgotPassword(true);
                }}
                className="text-blue-500 hover:text-main hover:underline cursor-pointer text-[14px]"
              >
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:text-main hover:underline cursor-pointer text-[14px]"
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:text-main hover:underline cursor-pointer text-[14px] w-full text-center"
                onClick={() => {
                  setIsRegister(false);
                }}
              >
                Go Login
              </span>
            )}
          </div>
          <Link
            to={`/${path.HOME}`}
            className="text-blue-500 hover:text-main hover:underline cursor-pointer text-[14px] w-full text-center flex items-center justify-center "
          >
            Go Home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
