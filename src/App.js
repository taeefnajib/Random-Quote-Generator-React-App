import React, { Component } from 'react';
import './App.css';
import logo from './logo.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quote: '',
      author: '',
      category: '',
    };
    this.apiKey = process.env.REACT_APP_API_KEY; 
  }

  componentDidMount() {
    this.getRandomCategoryAndQuote();
  }

  getRandomCategoryAndQuote = () => {
    // eslint-disable-next-line
    const category = this.getRandomCategory();

    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': this.apiKey, // Use the apiKey state variable
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const randomQuote = data[0]; // The API response is an array with one quote
        this.setState({
          quote: randomQuote.quote,
          author: randomQuote.author,
          category,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  getRandomCategory = () => {
    const categories = [
      'age', 'alone', 'amazing', 'anger', 'art', 'attitude', 'beauty', 'change', 'communications', 'courage', 'death',
      'dreams', 'education', 'equality', 'experience', 'failure', 'faith', 'family',
      'fear', 'forgiveness', 'freedom', 'friendship', 'future', 'happiness', 'health', 'hope', 'imagination',
      'inspirational', 'intelligence', 'jealousy', 'knowledge', 'leadership', 'learning', 'life', 'love', 'marriage', 'success',
    ];


    return categories[Math.floor(Math.random() * categories.length)];
  }

  render() {
    const { quote, author} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Logo" width="200" height="200" />
          <p>"{quote}"</p>
          <p><em>- {author}</em></p>
        </header>
      </div>
    );
  }
}

export default App;