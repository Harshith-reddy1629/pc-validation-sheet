import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import verifiedImg from "../../assets/verified.png";
import vrfying from "../../assets/ver.png";
import verificationerror from "../../assets/Error.webp";
import pc from "../../assets/pc.png";

import { MagnifyingGlass } from "react-loader-spinner";

function EmailVerify() {
  const { id } = useParams();

  const [verifyingStatus, setVerifyingStatus] = useState({
    status: "initial",
    errMsg: "",
  });

  const verifyemail = async () => {
    setVerifyingStatus({ status: "verifying" });

    const Url = `https://sheets-njt7.onrender.com/user/verify/${id}`;

    try {
      const response = await fetch(Url);

      const result = await response.json();

      if (response.ok) {
        setVerifyingStatus({ status: "success" });
      } else {
        setVerifyingStatus({ status: "failed", errMsg: result.errMsg });
      }
    } catch (error) {
      setVerifyingStatus({
        status: "failed",
        errMsg: "Something went wrong",
      });
    }
  };

  return (
    <div className="h-[100dvh] w-full flex items-center justify-center p-4 ">
      <div className="flex flex-col justify-center items-center gap-7 p-6 bg-white rounded text-center max-w-[400px] w-full shadow-md ">
        <Link to="/">
          <img src={pc} alt="." className="h-[45px]" />
        </Link>
        {verifyingStatus.status === "initial" && (
          <>
            <h4>Click here to verify Your email</h4>
            <button
              onClick={verifyemail}
              type="button"
              className="bg-slate-800 w-full    text-white shadow-md rounded p-[6px_20px]"
            >
              VERIFY
            </button>
          </>
        )}
        {verifyingStatus.status === "verifying" && (
          <>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
            <h4>Verifying...</h4>
          </>
        )}{" "}
        {verifyingStatus.status === "success" && (
          <>
            <img
              height={65}
              style={{ objectFit: "contain" }}
              src={verifiedImg}
              className="h-[65px]"
              alt=".."
            />
            <h4>Your email is verified</h4>
            <Link
              to="/login"
              style={{ paddingInline: "30px" }}
              className="no-underline p-[6px_20px] rounded text-white w-full bg-slate-800"
            >
              Login
            </Link>
          </>
        )}
        {verifyingStatus.status === "failed" && (
          <>
            <img className="h-[55px]" src={verificationerror} alt=".." />
            {/* <h4>Invalid link address </h4> */}
            <h4>{verifyingStatus.errMsg}</h4>
            <button
              className="text-white border-none p-2.5 rounded-md w-full font-bold bg-red-700"
              onClick={() =>
                setVerifyingStatus({ status: "initial", errMsg: "" })
              }
            >
              {/* background-color:rgb(192, 28, 28);
    color: #ffffff;
    border: none;
    padding: 12px;
    width: 100%;
    border-radius: 6px;
    font-weight: bolder; */}
              Retry
            </button>
          </>
        )}{" "}
      </div>
    </div>
  );
}

export default EmailVerify;
