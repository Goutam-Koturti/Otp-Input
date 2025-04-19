import React, { useEffect, useRef, useState } from "react";
import "./otp.css";

function OtpInput() {
  const [otpLength, setOtpLenth] = useState(6);
  const [inputArray, setInputArray] = useState(new Array(otpLength).fill(""));

  // This part needs to be dynamic
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e, index) => {
    const value = e.key;
    if (value === "Backspace") {
      let copyArray = [...inputArray];
      copyArray[index] = "";
      setInputArray(copyArray);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    } else if (!isNaN(value)) {
      let copyArray = [...inputArray];
      copyArray[index] = value;
      setInputArray(copyArray);
      if (value && index < otpLength - 1) {
        refs[index + 1].current.focus();
      }
    } else {
      return;
    }
  };
  const handlePaste = (e) => {
    let pastedData = e.clipboardData.getData("text");
    if (pastedData.length === 6 && !isNaN(pastedData)) {
      let splitOtp = pastedData.split("");
      setInputArray(splitOtp);
      refs[otpLength - 1].current.focus();
    }
  };

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  return (
    <div>
      <h1>Enter your OTP</h1>
      <div>
        {inputArray.map((_, i) => (
          <input
            value={inputArray[i]}
            key={i}
            type="text"
            className="input"
            onKeyDown={(e) => {
              handleChange(e, i);
            }}
            onPaste={handlePaste}
            ref={refs[i]}
          ></input>
        ))}
      </div>
      <button className="submit" disabled={inputArray.includes("")}>
        Submit
      </button>
    </div>
  );
}

export default OtpInput;
