import React, { useState } from "react";
import { Button } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import Swal from "sweetalert2";
import path from "../../utils/path";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    const res = await apiResetPassword({ password, token });
    if (res?.data?.success) {
      Swal.fire({
        icon: "success",
        text: "Change password succeessfully",
      });
      navigate(`/${path.LOGIN}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res?.data?.message,
      });
    }
  };
  return (
    <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Enter your new password:</label>
        <input
          type="password"
          id="password"
          className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end items-center w-full gap-4">
          <Button handlerOnclick={handleResetPassword}> Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
