import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
  MDBIcon
} from "mdbreact";

export default function ModalUser({ modal, toggle, handleSubmit, user, handleChange }) {
  return (
    <MDBContainer>
      {/* MODAL */}
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>
          <label>
            <span className="tittleModalUser">
            <MDBIcon far icon="address-card" /> {user.name} {user.surname}
            </span>
            <span className="emailModalUser"><MDBIcon far icon="envelope" /> {user.email}
            
            </span>
          </label>
          <br />
        </MDBModalHeader>
        <MDBModalBody>
          <label>Change your password</label>
          <form onSubmit={handleSubmit} /*Envio a data a updatear*/ >
            <MDBInput 
              icon="lock"
              group
              name="newPassword"
              type="password"
              validate
              error="wrong"
              success="right"
              onChange = {handleChange}
            />
            <MDBBtn
              color="light-blue"
              className="mb-3 btnEv-red rounded mb-0 border-0"
              type="submit"
              onClick={toggle}  //llamo al boton de cierre de ese modal, a la vez que confirmo el submit
            >
              Save
            </MDBBtn>
          </form>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
}
