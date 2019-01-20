import React, { Component } from 'react'

export class SaldoUser extends Component {
  render() {
    
    const {id, client_voornaam, client_achternaam, client_saldo, saldo} = this.props.user
    
    return (
      <div className="row">
        <div className="col s12 m6">
            <div className="card hoverable blue-grey darken-1">
                <div className="card-content white-text">
                <button onClick={this.props.delUser.bind(this, id, client_saldo)} className="btn-floating right"><i className="material-icons red">delete</i></button>
                    <span className="card-title">{ client_voornaam } { client_achternaam }</span> 
                    <p className="flow-text">{ saldo } <i></i></p>
                </div>
                <div className="card-action">
                  <ul style={listStyle}>
                    <li style={btnStyle}><button onClick={this.props.updateSaldo.bind(this, id, 5)} className="btn-floating btn-large waves-effect green">€5</button></li>
                    <li style={btnStyle}><button onClick={this.props.updateSaldo.bind(this, id, 2.50)} className="btn-floating btn-large waves-effect green">€2,50</button></li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
      
    )
  }
}

const listStyle = {
  display: 'inline-flex'
}

const btnStyle = {
  padding: '5px'
}

export default SaldoUser
