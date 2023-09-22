import React, { useState } from 'react';
import './App.css'; // Import your CSS file

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentNo: '',
    branch: 'CSE', // Default branch
    phone: '',
    place: '',
    otp:''
  });

  const [errors, setErrors] = useState({
    email: '',
    studentNo: '',
    phone:'' ,
  });
  const [validation ,setValidation]=useState(null)

  // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailRegex = /^[A-Za-z]+22\d+@akgec\.ac\.in/ ;

  const studentNoRegex = /^22\d*$/;
  const phoneRegex = /^[789]\d{9}$/ ;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate email
    if (name === 'email') {
      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: 'Invalid email format' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }

    // Validate student number
    if (name === 'studentNo') {
      if (!studentNoRegex.test(value)) {
        setErrors({ ...errors, studentNo: 'Student number should start with 2210113' });
      } else {
        setErrors({ ...errors, studentNo: '' });
      }
    }

    if(name === 'phone'){
      if(!phoneRegex.test(value)){
        setErrors({...errors , phone :'Invalid number'})
      }else{
        setErrors({...errors , phone: ''})
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (errors.email || errors.studentNo || errors.phone) {
      console.log('Form submission halted due to validation errors.');
      setValidation("Form submission halted due to validation errors")
      return;
    }

    // You can handle the form data submission here, for example, send it to an API.
    console.log(formData);
    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      studentNo: '',
      branch: '',
      phone: '',
    });
  };
  const handleOTP = (e) => {
    e.preventDefault(); 
    // Prevent the default scroll behavior
    console.log(formData.email)
  };


  return (
    <div className="form-container">
      <h2>Student Information</h2>
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
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />{
            errors.phone && <p className='error' >{errors.phone}</p>
          }

        </div>
        <div className="form-group">
          <input
            type="text"
            name="place"
            placeholder="Day Scholar / Hostler"
            value={formData.place}
            onChange={handleChange}
            required
          />
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
          />{
            errors.phone && <p className='error' >{errors.phone}</p>
          }

        </div>
        {
            validation && <p>{validation}</p>
        }
        <div className='submit'>
        <button className='otp-button  ' onClick={handleOTP}>
          Send OTP
        </button>
        <button type="submit" disabled={errors.email || errors.studentNo}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
