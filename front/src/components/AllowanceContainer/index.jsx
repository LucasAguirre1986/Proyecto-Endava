import React from "react";
import { connect } from "react-redux";
import { createAllowance, sendEmailConfirm } from "../../redux/actions/allowanceActions";
import {
  MDBCard,
  MDBInput,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBAnimation,
  MDBIcon,
  MDBBtn
} from "mdbreact";
// import { TesseractWorker } from "tesseract.js";
import ModalAviso from "../ModalContainer/modalAviso";
import { openCloseNavBar } from "../../redux/actions/navbar"

// const worker = new TesseractWorker();

class AllowanceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      employeeAmount: 0,
      observation: "",
      active: "",
      modal: false,
      textMsj: "",
      titleMsj: ""
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onObservationChange = this.onObservationChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.openCloseNavBar(false)
  }
  onFormSubmit(e) {
    e.preventDefault();
    const { file, ...rest } = this.state;
    const formData = new FormData();

    // worker
    //   .recognize(this.state.file)
    //   .progress(p => {
    //   })
    //   .then(({ text }) => {
    //     var textLow = text
    //     textLow.toUpperCase()
    //     var index = text.indexOf("TOTAL" || "Total");
    //     var regex = /(\d+)/g;
    //     var firstString = text.substring(index, (index + 60));
    //     var numbers = firstString.match(regex);

    //     for (let i = 0; i < numbers.length; i++) {
    //       // if (parseInt(numbers[i]) == this.state.employeeAmount) {
  
    //       // }
    //       worker.terminate();
    //     }

    //   });
    // }
    // var finalNumber = stringResult.match(regex)[0];

    // if (finalNumber.length) {
    //   if (parseInt(finalNumber) != this.state.employeeAmount) {
    //     console.log(
    //       "el impore no es correc",
    //       parseInt(finalNumber),
    //       " el sae",
    //       this.state.employeeAmount
    //     );
    //   } else console.log("odo bieeeeeen");

    formData.append('file', file);
    formData.append('userid', this.props.user.id);
    formData.append('allowanceName', this.props.nameUrl);
    formData.append('employeeAmount', this.state.employeeAmount);
    formData.append('observation', this.state.observation);

    this.props.createAllowance(formData)
      .then((response) => {
        this.props.sendEmailConfirm(this.props.user, this.props.nameUrl)
        this.setState({ active: response.data, modal: true, textMsj: 'The file has been successfully sent', titleMsj: 'Success' });
      }).catch((error) => {
        this.setState({ modal: true, textMsj: 'An error occurred while sending the file..', titleMsj: 'Error' });
      });
  }
  onChange(e) {
    this.setState({
      file: e.target.files[0]
    });
  }
  onObservationChange(e) {
    this.setState({
      observation: e.target.value
    });
  }
  onAmountChange(e) {
    this.setState({
      employeeAmount: e.target.value
    });
  }
  // TOGGLE de MODAL
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    let maxAmount = this.props.listAllowance.find(allow => {
      return allow.name === this.props.nameUrl;
    });

    return (
      <>
        <ModalAviso
          modal={this.state.modal}
          toggle={this.toggle}
          textMsj={this.state.textMsj}
          titleMsj={this.state.titleMsj}
        />
        <h3 className="upperCaseFonts marginTextLeft" >Manage your {this.props.nameUrl} allowance.</h3>
        {/* FORMULARIO  */}
        <MDBRow className="container-banner">
          <MDBCol md="1">
          </MDBCol>
          <MDBCol md="4">
            <MDBAnimation type="fadeInUp">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={this.onFormSubmit}>
                    <p className="h4 text-center py-4">Submit your receipt
                        <label className="maxAmount"> {`(Max Amount $${maxAmount.fixedAmount})`}</label></p>
                    <div className="grey-text">
                      <MDBInput
                        label="Amount allowance..." icon="hand-holding-usd"
                        group
                        required
                        autoComplete="off"
                        type="number"
                        validate
                        name="employeeAmount"
                        onChange={this.onAmountChange}
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        label="Observation..."
                        icon="comment-alt"
                        required
                        group
                        autoComplete="off"
                        type="text"
                        name="observation"
                        onChange={this.onObservationChange}
                        validate
                        error="wrong"
                        success="right"
                      />

                      <MDBInput
                        icon="file-signature"
                        group
                        type="file"
                        name="file"
                        onChange={this.onChange}
                        required
                        validate
                        error="wrong"
                        success="right"
                      />
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn
                        color="light-blue"
                        className="mb-3 btnEv-red rounded mb-0 border-0 btnAllowance"
                        type="submit"
                      >
                        Send form <MDBIcon icon="angle-right" />
                      </MDBBtn>

                    </div>
                    <i className="textAlert">*Please note that only jpg, png and PDF files up to 10MB are accepted.</i>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBAnimation>
          </MDBCol>
          <MDBCol md="6">
            <label>preview:</label>
            {/* Visualización de archivo cargado */}
            <p>
              {((this.state.active).split('.')[1] !== 'pdf' &&
                (this.state.active).split('.')[1] !== undefined) &&
                <img src={`/assets/receipt/${this.state.active}`} width="100%" />}
            </p>
          
            {
              ((this.state.active).split('.')[1] === 'pdf') &&
              <embed src={`/assets/receipt/${this.state.active}`} width="100%" height="400px"
                type="application/pdf"></embed>
            }
          </MDBCol>
        </MDBRow>
      </>
    )
  }
}
const mapStateToProps = (state, owner) => {
  return {
    user: state.user.user,
    nameUrl: owner.match.params.name, // Extrae la url dinamica
    listAllowance: state.allowance.adminAllowances
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    createAllowance: (data) => dispatch(createAllowance(data)),
    openCloseNavBar: (val) => dispatch(openCloseNavBar(val)),
    sendEmailConfirm: (user,allowance) => dispatch(sendEmailConfirm(user, allowance))
  }
}

export default connect(
  mapStateToProps,
  MapDispatchToProps
)(AllowanceContainer);
