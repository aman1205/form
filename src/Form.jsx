import React, { useState } from "react";
import "./App.css"; // Import your CSS file
import form from "./assets/form.png";
import f2 from "./assets/form 2.png";
import ml from "./assets/ml.png";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentNo: "",
    branch: "CSE",
    gender: "Male",
    phone: "",
    place: "",
    unstop: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    studentNo: "",
    phone: "",
  });
  const [validation, setValidation] = useState(null);
  const [otpButtonLabel, setOtpButtonLabel] = useState("Send OTP");
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
  const [recaptcha_response, setCaptcha] = useState(null);

  // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailRegex = /^[A-Za-z]+21\d+@akgec\.ac\.in/;

  const studentNoRegex = /^22\d*$/;
  const phoneRegex = /^[789]\d{9}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate email
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (errors.email || errors.studentNo || errors.phone) {
      console.log("Form submission halted due to validation errors.");
      setValidation("Form submission halted due to validation errors");
      return;
    }

    // You can handle the form data submission here, for example, send it to an API.
    console.log(formData);
    toast.success("Registration successful", {
      position: "top-center",
      autoClose: 5000, // Auto close the notification after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      studentNo: "",
      branch: "CSE",
      gender: "Male",
      phone: "",
      place: "",
      unstop: "",
      otp: "",
    });
  };
  const handleOTP = async (e) => {
    e.preventDefault();
    const otData={
      email:formData.email,
      recaptcha_response
    }
    // Prevent the default scroll behavior
    const { data } = await axios.post(
      'http://13.235.142.31:8080/otp_code',
      otData
    );
    if (!isOtpButtonDisabled) {
      toast.success("OTP sent successfully", {
        position: "top-center",
        autoClose: 3000, // Auto close the notification after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setTimeout(() => {
      setOtpButtonLabel("Resend OTP");
      setIsOtpButtonDisabled(true);
    }, 30000);
    console.log(formData.email);
  };
  const HandleCaptcha = (value) => {
    setCaptcha(value);
  };

  return (
    <div className="form-container " style={{ color: "white" }}>
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
      />
      <div className="main-container">
        <h2>Hey! Get Yourself Registered</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studentNo"
              placeholder="Student Number"
              value={formData.studentNo}
              onChange={handleChange}
              required
            />
            {errors.studentNo && <p className="error">{errors.studentNo}</p>}
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div className="form-group ">
            <input
              type="text"
              name="unstop"
              placeholder="Enter UnStop Username"
              value={formData.unstop}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="CSE">CSE</option>
              <option value="CS">CS</option>
              <option value="ECE">ECE</option>
              <option value="CS-IT">CS-IT</option>
              <option value="IT">IT</option>
            </select>
          </div>
          <div className="form-group">
            <select
              name="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className=" form-radio">
            <div>
              <label htmlFor="place">Day Scholar</label>
              <input
                id="place"
                type="radio"
                name="place"
                value="day scholar"
                checked={formData.place === "day scholar"}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="hostler">Hostler</label>
              <input
                id="hostler"
                type="radio"
                name="place"
                value="hostler"
                checked={formData.place === "hostler"}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group-otp ">
            <input
              type="text"
              name="otp"
              placeholder="Enter Otp"
              value={formData.otp}
              onChange={handleChange}
              required
              maxLength={6}
            />
            <button
              className="otp-button"
              onClick={handleOTP}
              disabled={isOtpButtonDisabled}
            >
              {otpButtonLabel}
            </button>
            {/* {errors.phone && <p className="error">{errors.phone}</p>} */}
          </div>
          {validation && <p>{validation}</p>}
          <div className="submit">
            {/* <ReCAPTCHA sitekey="6Le5_kgoAAAAAIYTK41Qw4edzGVEhM7e-aR7kXBl" /> */}
            {/* <GoogleReCaptchaProvider reCaptchaKey="6Le5_kgoAAAAAIYTK41Qw4edzGVEhM7e-aR7kXBL">
              <GoogleReCaptcha onVerify={HandleCaptcha} />
            </GoogleReCaptchaProvider> */}
            <ReCAPTCHA sitekey="6LcdBUkoAAAAAMKwXGvZf_6cpMaQo6vDAXYUprT0" onChange={HandleCaptcha} />,
            <button type="submit" disabled={errors.email || errors.studentNo}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="img-wrapper">
        <img src={f2} width={"300px"} height={"300px"} alt="" />
      </div>
    </div>
  );
};

export default Form;
