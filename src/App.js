import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      breweries: []
    }
  }

  handleSearch = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let searchTerm = this.state.search.toLowerCase().replace(/ /g, "_");
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          breweries: data.map(brewery => {
            return {
              name: brewery.name,
              type: brewery.brewery_type,
              city: brewery.city,
              state: brewery.state,
              address: brewery.street,
              website: brewery.website_url
            }
          }) 
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    let breweryList = this.state.breweries.map((brewery, index) => {
      return <div key={index}>
        <p>{brewery.name}</p>
        <p>{brewery.type}</p>
        <p>{brewery.street}</p>
        <p>{brewery.city}</p>
        <p>{brewery.state}</p>
        <p>{brewery.website}</p>
      </div>
    })
    return (
      <main className="App">
        <header>
          <h1>Brewery Search</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="search"
            value={this.state.search}
            placeholder="Search by city..."
            onChange={this.handleSearch}
          />
          <button>Search</button>
        </form>
        { breweryList }
      </main>
    );
  }
}

export default App;
