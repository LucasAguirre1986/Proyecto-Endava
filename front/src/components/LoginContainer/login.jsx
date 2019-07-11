
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBAnimation,
  MDBBtn,
  MDBInput
} from "mdbreact";


export default function login({handleChange, handleSubmit}) {
  return (
    <div>
      <MDBContainer>
      <MDBRow>
      <MDBCol md="7">
      </MDBCol>
        <MDBCol md="5">
        
        <MDBAnimation type="fadeInLeftBig">
          <MDBCard className="transparenciaCard">
            <MDBCardBody>
            <p className="h5 text-center mb-4">
            <img className="logoLogin" 
                  src="https://careers.endava.com/en/-/media/EndavaDigital/Endava/Images/MetaDataImages/preview-image.ashx"
                  alt="Endava" /><br/><br/></p>
              <form onSubmit= {handleSubmit}>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    name = "email"
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange = {handleChange}

                  />
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    group
                    name= "password"
                    type="password"
                    validate
                    onChange = {handleChange}
                  />
                </div>

              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  className="mb-3 btnEv-red rounded mb-0 border-0"
                  type="submit"
                >
                  Login
                </MDBBtn>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Forgot Password?</p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
          </MDBAnimation>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      
    </div>
  );
};
