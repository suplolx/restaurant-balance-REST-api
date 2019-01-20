import React, { Component } from 'react'
import SaldoUser from './SaldoUser'

export class SaldoUsers extends Component {
  render() {
    return this.props.users.map((user) => (
        <SaldoUser key={user.id} user={user} articles={this.props.articles} delUser={this.props.delUser} updateSaldo={this.props.updateSaldo} />
    ))
  }
}

export default SaldoUsers
