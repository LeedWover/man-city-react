import React, { Component } from "react";

import { firebasePlayers, firebaseDB, firebase } from "../../../firebase";
import AdminLayout from "../../../hoc/AdminLayout";
import FormField from "../../utils/FormFields";
import { Validate } from "../../utils/Misc";
import FileUploader from "../../utils/FileUploader";

class AddEditPlayer extends Component {
  state = {
    playerId: "",
    formType: "",
    formError: false,
    formSuccess: "",
    defaultImg: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Player First Name",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "Player Last Name",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      number: {
        element: "input",
        value: "",
        config: {
          label: "Player number",
          name: "number_input",
          type: "number"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      position: {
        element: "select",
        value: "",
        config: {
          label: "Select a position",
          name: "select_position",
          type: "select",
          options: [
            { key: "Keeper", value: "Keeper" },
            { key: "Defence", value: "Defence" },
            { key: "Midfield", value: "Midfield" },
            { key: "Striker", value: "Striker" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: "",
        showLabel: true
      },
      image: {
        element: "image",
        value: "",
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  updateForm = (element, content = '') => {
    const { id, event } = element;
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[id] };

    if(content === '') {
      newElement.value = event.target.value;
    } else {
      newElement.value = content
    } 

    let validData = Validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  successForm = message => {
    this.setState({
      formSuccess: message
    })
    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
      this.props.history.push('/admin_players')
    }, 2000)
  }

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (formIsValid) {
      if(this.state.formType === 'Edit player') {
        firebaseDB.ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated!')
          })
          .catch(err => {
            this.setState({
              formError: true
            })
          })
      } else {
        firebasePlayers.push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_players')
          })
          .catch(err => {
            this.setState({
              formError: true
            })
          })
      }
    } else {
      this.setState({
        formError: true
      });
    }
  };

  resetImage = () => {
    const newFormData = {...this.state.formData}
    newFormData['image'].value = '';
    newFormData['image'].valid = false;

    this.setState({
      defaultImg: '',
      formData: newFormData
    });
  }

  storeFilename = filename => {
    this.updateForm({id:'image'}, filename)
  }

  updateFields = (player, playerId, formType, image) => {
    const newFormData = {...this.state.formData}
    for(let key in newFormData) {
      newFormData[key].value = player[key];
      newFormData[key].valid = true;
    }
    this.setState({
      playerId,
      defaultImg: image,
      formType,
      formData: newFormData
    })
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.setState({
        formType: "Add Player"
      });
    } else {
      firebaseDB.ref(`players/${playerId}`).once('value')
        .then(snapshot => {
          const playerData = snapshot.val();

          firebase.storage().ref('players').child(playerData.image).getDownloadURL()
            .then( url => {
              this.updateFields(playerData, playerId, 'Edit player', url)
            });
        });
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <FileUploader
                dir="players"
                tag="player image"
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formData.image.value}
                resetImage={() => this.resetImage()}
                filename={(filename) => this.storeFilename(filename)}
              />

              <FormField
                id="name"
                formData={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              <FormField
                id="lastname"
                formData={this.state.formData.lastname}
                change={element => this.updateForm(element)}
              />
              <FormField
                id="number"
                formData={this.state.formData.number}
                change={element => this.updateForm(element)}
              />
              <FormField
                id="position"
                formData={this.state.formData.position}
                change={element => this.updateForm(element)}
              />
              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? (
                <div className="error_label">Something went wrong!</div>
              ) : null}
              <div className="admin_submit">
                <button>{this.state.formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
