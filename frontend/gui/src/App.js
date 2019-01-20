import React, { Component } from 'react';
import SaldoUsers from './components/Saldo/SaldoUsers';
import SaldoUserAdd from './components/Saldo/SaldoUserAdd';
import Header from './components/layout/Header';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  state = {
    users: [],
    articles: [],

  }

  componentDidMount() {
    axios.get("http://192.168.2.10:8000/api/v1/client/")
      .then(res => this.setState({ users: res.data }))

    axios.get('http://192.168.2.10:8000/api/v1/artikel/')
     .then(res => this.setState({ articles: res.data }))
  }

  addUser = (client_voornaam, client_achternaam) => {
    axios.post('http://192.168.2.10:8000/api/v1/client/', {
      client_voornaam,
      client_achternaam
    })
      .then(res => this.setState({users: [ res.data, ...this.state.users]}))
  }

  delUser = (id, url) => {
    axios.delete(url)
      .then(res => this.setState({ users: [...this.state.users.filter(user => user.id !== id)] }))
  }

  updateSaldo = (id, amount) => {
    axios.put(`http://192.168.2.10:8000/api/v1/saldo/${id}/`, {
      saldo_aantal: amount
    })
      .then(res => this.setState({ users: this.state.users.map(user => {
        if (user.id === id) {
          user.saldo = "€" + res.data.saldo_aantal
        }
        return user;
      }) }))
  }
  
  render() {
    return (
      <div>
        <Header />
        <div className="container">
        <SaldoUserAdd addUser={this.addUser}/>
        <SaldoUsers users={this.state.users} articles={this.state.articles} delUser={this.delUser} updateSaldo={this.updateSaldo}/>
        </div>
      </div>
    );
  }
}

export default App;
