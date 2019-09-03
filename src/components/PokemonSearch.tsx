import React, { Component } from 'react';
import User from '../interfaces/User.interface';
import SearchState from '../interfaces/SearchState.interface';

class PokemonSearch extends Component<User, SearchState> {
    pokemonRef: React.RefObject<HTMLInputElement>;
    constructor(props: User) {
        super(props);
        this.pokemonRef = React.createRef();
        this.state = {
            name: "",
            numberOfAbilities: 0,
            imageUrl: "",
            error: false
        }
    }

    onSearchClick = () => {
        const inputValue = this.pokemonRef.current.value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(res => {
                if(res.status !== 200) {
                    this.setState({error: true})
                    return
                }
                res.json().then(data => {
                    this.setState({
                        error: false,
                        name: data.name,
                        numberOfAbilities: data.abilities.length,
                        imageUrl: data.sprites.front_default
                    })
                })
            })
    }
    render() {
        const {userName, pokemonNumber} = this.props;
        const {error, imageUrl, name, numberOfAbilities} = this.state;

        let resultMarkup;

        if(error) {
            resultMarkup = <p>Pokemon not found, please try again</p>
        }else {
            resultMarkup = <div>
                <img src={imageUrl} alt="pokemon" className="pokemon-image"/>
                <p>
                    {name} has {numberOfAbilities} abilities
                </p>
            </div>
        }

        return (
            <div>
                <p>User {userName} has {pokemonNumber} pokemons</p>
                <input type="text" ref={this.pokemonRef}/>
                <button onClick={this.onSearchClick} className="my-button">
                    Search
                </button>
                {resultMarkup}
            </div>
        );
    }
}

export default PokemonSearch;