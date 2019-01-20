import React, { Component } from 'react'

export class SaldoUserAdd extends Component {
  
  state = {
      client_voornaam: '',
      client_achternaam: '',
  }
  
  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
      e.preventDefault();
      this.props.addUser(this.state.client_voornaam, this.state.client_achternaam)
      this.setState({ client_achternaam: '', client_voornaam: '' })
  }

  render() {
    return (
      <div className="row">
      <form onSubmit={this.onSubmit} className="col s12">
        <div className="row">
            <div className="input-field col m3">
                <input
                type="text"
                name="client_voornaam"
                placeholder="Voornaam.."
                value={this.state.client_voornaam}
                onChange={this.changeHandler} />
            </div>
            <div className="input-field col m3">
                <input
                type="text"
                name="client_achternaam"
                placeholder="Achternaam.."
                value={this.state.client_achternaam}
                onChange={this.changeHandler} />
            </div>
            <div className="col m12">
                <input type="submit" value="Toevoegen" className="input-field btn blue-grey" />
            </div>
        </div>
      </form>
      </div>
    )
  }
}

export default SaldoUserAdd
