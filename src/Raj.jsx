import React from 'react'
import logo from './assets/logo.png'
import main  from './assets/main.png'
import f2 from "./assets/form 2.png";

const Raj = () => {
  return (
    <div class="register">
    <div class="div">
      <div class="form">
        <div class="frame">
          <div class="group">
            <div class="overlap-group-wrapper">
              <div class="overlap-group"><div class="text-wrapper">Name</div></div>
            </div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-group"><div class="text-wrapper">College Email ID</div></div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-group"><div class="text-wrapper">Student No,</div></div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-group"><div class="text-wrapper">Contact No,</div></div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-group"><div class="text-wrapper">Branch</div></div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-group"><div class="text-wrapper">Gender</div></div>
          </div>
          <div class="overlap-wrapper">
            <div class="overlap-group"><div class="text-wrapper">Hosteler / Day Scholar</div></div>
          </div>
        </div>
        <div class="div-wrapper">
          <div class="overlap"><div class="text-wrapper-2">Register</div></div>
        </div>
      </div>
      <div class="heading"><h1 class="welcome">WELCOME</h1></div>
      <img class="logo" src={logo} />
      <div class="image">
        <img class="free-photo-black" src={f2} />
      </div>
    </div>
  </div>
  )
}

export default Raj
