import React, { Component } from "react";
import { firebase } from "../../firebase";

import FormField from "../utils/FormFields";
import { Validate } from "../utils/Misc";

class SignIn extends Component {
  state = {
    formError: false,
    formErrorMessage: '',
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
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
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

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch(err => {
          this.setState({
            formError: true,
            formErrorMessage: err.message
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div
          className="signin_wrapper"
          style={{
            margin: "100px"
          }}
        >
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login</h2>
            <FormField
              id="email"
              formData={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
            <FormField
              id="password"
              formData={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
            {this.state.formError ? (
              <div className="error_label">{this.state.formErrorMessage ? <div>{this.state.formErrorMessage}</div> :'Something went wrong!'}</div>
            ) : null}
            <button>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
