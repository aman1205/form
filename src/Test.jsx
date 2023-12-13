import React, { useState, useRef } from "react";
import logo from "./assets/logo.png";
import w from "./assets/w.png";
// import "./Test.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const [recaptcha_response, setCaptchaValue] = useState(null);
  const [errors, setErrors] = useState({
    email: "",
    studentNo: "",
    phone: "",
  });
  const [validation, setValidation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNo: "",
    branch: "",
    gender: "Male",
    phone: "",
    place: "Day Schoolar",
    unstop: "",
    otp: "",
    recaptcha_response: recaptcha_response,
  });
  const [otpButtonLabel, setOtpButtonLabel] = useState("Send OTP");

  const emailRegex = /^[A-Za-z]+22\d+@akgec\.ac\.in/;
  const studentNoRegex = /^22\d*$/;
  const phoneRegex = /^[7896]\d{9}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: "Invalid email format" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    }

    // Validate student number
    if (name === "studentNo") {
      if (!studentNoRegex.test(value)) {
        setErrors({
          ...errors,
          studentNo: "Student number should start with 2210113",
        });
      } else {
        setErrors({ ...errors, studentNo: "" });
      }
    }

    if (name === "phone") {
      if (!phoneRegex.test(value)) {
        setErrors({ ...errors, phone: "Invalid number" });
      } else {
        setErrors({ ...errors, phone: "" });
      }
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setFormData({
      ...formData,
      recaptcha_response: value,
    });
  };
  const cap = useRef(null);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!recaptcha_response) {
      alert("Please complete the reCAPTCHA.");
      return;
    } else if (errors.email) {
      toast.error("Enter valid Email", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const otpData = {
        email: formData.email,
        recaptcha_response,
      };
      const { data } = await axios.post(
        "https://regis.pranavbisaria.tech/otp_code",
        otpData
      );

      if (data.message === "OTP send successful") {
        toast.success("Ckeck Your Email  for OTP", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      cap.current.reset();
      setTimeout(() => {
        setOtpButtonLabel("Resend OTP");
      }, 30000);
      console.log(data);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!recaptcha_response) {
        alert("Please complete the reCAPTCHA.");
        return;
      }

      // Check if there are any errors before submitting
      if (errors.email || errors.studentNo || errors.phone) {
        alert("Please complete all the value");
        return;
      }
      console.log(formData);
      const { data } = await axios.post(
        "https://regis.pranavbisaria.tech/form",
        formData
      );
      console.log(data.message);
      if(data.message ==="Registration successful"){
        toast.success("Registration successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          name: "",
          email: "",
          studentNo: "",
          branch: "CSE",
          gender: "Male",
          phone: "",
          place: "Day Schoolar",
          unstop: "",
          otp: "",
          recaptcha_response: recaptcha_response,
        });
      }
    } catch (error) {
      toast.error("Check Your Details and OTP", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <div className="container1">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="custom-toast"
        />
        <div className="column1">
          <div className="logo">
            <img src={logo} width="200px" height="200px" alt="Logo" />
          </div>
          <div className="form-container">
            <div className="main-container">
              <h2>
                Welcome! <br /> Get Yourself Registered
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Name"
                  className="input"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  placeholder="Email"
                  className="input"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                  placeholder="Student Number"
                  className="input"
                  name="studentNo"
                  type="number"
                  value={formData.studentNo}
                  onChange={handleChange}
                  required
                />
                {errors.studentNo && (
                  <p className="error">{errors.studentNo}</p>
                )}
                <input
                  className="input"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
                <input
                  placeholder="UnStop ID"
                  className="input"
                  name="unstop"
                  type="text"
                  value={formData.unstop}
                  onChange={handleChange}
                  required
                />
                <select
                  className=""
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="CS">CS</option>
                  <option value="CS-IT">CS-IT</option>
                  <option value="CSE-AlMl">CSE-AlMl</option>
                  <option value="IT">IT</option>
                  <option value="AIML">AIML</option>
                  <option value="ECE">ECE</option>
                  <option value="CSE-DS">CSE-DS</option>
                </select>
                <select
                  className=""
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value=""> Select Gender</option>
                  <option value="MALE">MALE</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select
                  className=""
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Day Scholar">Day Scholar</option>
                  <option value="Hostler">Hostler</option>
                </select>
                <input
                  placeholder="Enter OTP"
                  className="input"
                  name="otp"
                  type="number"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
                <div>
                  <ReCAPTCHA
                    ref={cap}
                    sitekey="6LcdBUkoAAAAAMKwXGvZf_6cpMaQo6vDAXYUprT0"
                    onChange={handleCaptchaChange}
                  />
                  <button onClick={handleSendOTP} className="otp">
                    {otpButtonLabel}
                  </button>
                </div>
                <button type="submit">
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="container">
            <img src={w} alt="Your Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
