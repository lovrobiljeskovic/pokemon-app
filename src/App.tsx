import React from 'react';
import PokemonSearch from './components/PokemonSearch';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <PokemonSearch userName="Lovro" pokemonNumber={5}/>
    </div>
  );
}

export default App;
