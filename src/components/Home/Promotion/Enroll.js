import React, { Component } from "react";
import { Fade } from "react-reveal";

import { firebasePromotions } from '../../../firebase';
import FormField from "../../utils/FormFields";
import { Validate } from "../../utils/Misc";

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email address"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  resetForm = bool => {
    const newFormData = { ...this.state.formData };

    for (let key in newFormData) {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].validationMessage = "";
    }

    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: bool ? "Your email submitted!" : "Your email is already exist!"
    });

    this.clearMessage();
  };

  clearMessage = () => {
    setTimeout(() => {
      this.setState({
        formSuccess: ""
      });
    }, 3000);
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) { 
      firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
        .then(snapshot => {
          if(snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit)
            this.resetForm(true)
          } else {
            this.resetForm(false)
          }
        })


      //this.resetForm();
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateForm = element => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    newElement.value = element.event.target.value;

    let validData = Validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              {this.state.formError ? (
                <div className="error_label">Something went wrong!</div>
              ) : null}
              <FormField
                id="email"
                formData={this.state.formData.email}
                change={element => this.updateForm(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              <button>Enroll</button>
              <div className="enroll_discl">Lorem ipsum dolor fessaj akamacare sadmaka.</div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
