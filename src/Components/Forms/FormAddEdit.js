import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    status: '',
    role: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        phonenumber: this.state.phonenumber,
        status: this.state.status,
        role: this.state.role
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        firstname: this.state.first,
        lastname: this.state.last,
        email: this.state.email,
        phonenumber: this.state.phone,
        status: this.state.status,
        role: this.state.role
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, firstname, lastname, email, phonenumber, status, role } = this.props.item
      this.setState({ id, firstname, lastname, email, phonenumber, status, role })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="firstname">First Name</Label>
          <Input type="text" name="firstname" id="firstname" onChange={this.onChange} value={this.state.firstname === null ? '' : this.state.firstname} />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input type="text" name="lastname" id="lastname" onChange={this.onChange} value={this.state.lastname === null ? '' : this.state.lastname}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phonenumber">Phone</Label>
          <Input type="text" name="phonenumber" id="phonenumber" onChange={this.onChange} value={this.state.phonenumber === null ? '' : this.state.phonenumber}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input type="text" name="status" id="status" onChange={this.onChange} value={this.state.status === null ? '' : this.state.status}  />
        </FormGroup>
        <FormGroup>
          <Label for="role">Role</Label>
          <Input type="text" name="role" id="role" onChange={this.onChange} value={this.state.role}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm