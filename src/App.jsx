import React, { useState, useEffect } from 'react';
import axios from 'axios';

  const PokemonApp = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
      const fetchPokemons = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
          const pokemonDetails = await Promise.all(
            response.data.results.map(async (pokemon) => {
              const details = await axios.get(pokemon.url);
              return { name: pokemon.name, image: details.data.sprites.front_default };
            })
          );
          setPokemons(pokemonDetails);
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        } setLoading(false);

      };

      fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toUpperCase())
    );

    return (
      <div className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPokemons.map((pokemon, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-lg text-center">
                <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto" />
                <h3 className="mt-2 font-semibold text-lg">{pokemon.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

export default PokemonApp;
