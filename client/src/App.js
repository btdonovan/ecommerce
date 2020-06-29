import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users : [],
      manufacturers : [],
      customers : [],
      items : [],
      purchase_orders : [],
      sales_orders : [],
    }
    this.fetchUsers = this.fetchUsers.bind(this)
    this.fetchManufacturers = this.fetchManufacturers.bind(this)
    this.fetchCustomers = this.fetchCustomers.bind(this)
    this.fetchItems = this.fetchItems.bind(this)
    this.fetchPurchaseOrders = this.fetchPurchaseOrders.bind(this)
    this.fetchSalesOrders = this.fetchSalesOrders.bind(this)
  }

  async fetchUsers() {
    await fetch(`http://localhost:3000/users`)
      .then((response) => response.json())
      .then((json) => {this.setState({users: json})})
  }
  async fetchManufacturers() {
    await fetch(`http://localhost:3000/manufacturers`)
      .then((response) => response.json())
      .then((json) => {this.setState({manufacturers: json})})
  }
  
  async fetchCustomers() {
    await fetch(`http://localhost:3000/customers`)
      .then((response) => response.json())
      .then((json) => {this.setState({customers: json})})
  }

  async fetchItems() {
    await fetch(`http://localhost:3000/items`)
      .then((response) => response.json())
      .then((json) => {this.setState({items: json})})
  }

  async fetchPurchaseOrders() {
    await fetch(`http://localhost:3000/purchase_orders`)
      .then((response) => response.json())
      .then((json) => {this.setState({purchase_orders: json})})
  }

  async fetchSalesOrders() {
    await fetch(`http://localhost:3000/sales_orders`)
      .then((response) => response.json())
      .then((json) => {this.setState({sales_orders: json})})
  }


  render() {
    if (this.state.users.length === 0) {
      this.fetchUsers()
    }
    // if (this.state.manufacturers.length === 0) {
    //   this.fetchRows('manufacturers')
    // }
    // if (this.state.customers.length === 0) {
    //   this.fetchRows('customers')
    // }
    // if (this.state.items.length === 0) {
    //   this.fetchRows('items')
    // }
    // if (this.state.purchase_orders === 0) {
    //   this.fetchRows('purchase_orders')
    // }
    // if (this.state.sales_orders === 0) {
    //   this.fetchRows('sales_orders')
    // }
    let users = this.state.users.map(user => {
      console.log(user.address)
      return user
    })
    
    let userInfo = users.map(user => <React.Fragment><div>{user.first_name} {user.last_name}</div><div>{user.email}</div><div>{user.address}</div></React.Fragment>)
    return (
      <div className="App">
        {userInfo}
      </div>
    );
  }
}

export default App;
