import React, { Component } from 'react';
import { Fade } from 'react-reveal';

import FormField from '../../utils/FormFields';
import { Validate } from '../../utils/Misc';
import { func } from 'prop-types';

class Enroll extends Component {
  
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email address'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  }
  
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if(formIsValid) {
      console.log(dataToSubmit)
    } else {
      this.setState({
        formError: true
      })
    }
    
  }

  

  updateForm = element => {
    const newFormData = {...this.state.formData}
    const newElement = {...newFormData[element.id]}

    newElement.value = element.event.target.value;

    let validData = Validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitForm(event)}>
            <div className="enroll_title">
              Enter your email
            </div>
            <div className="enroll_input">
              {this.state.formError ? <div className="error_label">Something went wrong!</div> : null}
              <FormField
                id="email"
                formData={this.state.formData.email}
                change={(element) => this.updateForm(element)}
              />
              <button>Enroll</button>
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}

export default Enroll;