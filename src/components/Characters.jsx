import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const initialState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character/";

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [search, setSearch] = useState("");

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const searchInpunt = useRef(null);

  const characters = useCharacters(API);

  const handleClick = (favorites) => {
    dispatch({ type: "ADD_FAVORITE", payload: favorites });
  };

  const handleSearch = useCallback(() => {
    setSearch(searchInpunt.current.value);
  }, []);

  /* const handleSearch = () => {
    setSearch(searchInpunt.current.value);
  }; */

  /* const filteredCharecters = characters.filter((user) => {
    return user.name.toLowerCase().includes(search.toLowerCase());
  }); */

  const filteredCharecters = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Characters">
      <h2>Personajes favoritos</h2>
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <Search
        search={search}
        searchInpunt={searchInpunt}
        handleSearch={handleSearch}
      />

      {filteredCharecters.map((character) => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <h3>Especie: {character.species} </h3>
          <div>
            <img src={character.image} alt={character.name} />
          </div>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a favoritos
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Characters;
