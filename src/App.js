// importerar det som behövs appen

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'


function App() {

  // Sätter states

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Sökning med tomt fält ger Error

  const handleSearch = async () => {
    if (!searchTerm) {
      setErrorMessage('Vänligen ange ett ord att söka efter.');
      setResults([]);
      document.getElementById('info').style.display = 'block';
      return;
    }

    //Sökning med ord/bokstav hämtar ordet ifrån api
    // Ifall try misslyckas carchar med Error

    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
      );
      setResults(response.data);
      setErrorMessage('');
      document.getElementById('info').style.display = 'block';
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Ett fel uppstod vid hämtning av data, ordet finns inte.');
      
    }
  };

// Inputsfält och knapp kopplat till ovanstående funktioner.

  return (
    <div>
      <div id='serch'>
      <h1>Engelsk ordbok</h1>
      <input 
        type="text"
        placeholder="Sök efter ett ord"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <button onClick={handleSearch}>Sök</button>
      </div>

       {/* Efter sökt ord kommer all information upp, mapar resultat (text) och ljudfiler. Detta visas upp i denna div.
       Först ljudfiler och sedan text, se nedan */}

      <div id='info'>

         {/* Error meddelande ifall man sökt med tomt fält kommer här */}

      {errorMessage && <div>{errorMessage}</div>}
      {results.map((result, index) => (
        <div key={index}>
          <h2>{result.word}</h2>
          {result.phonetics.map((phonetic, phoneticIndex) => (
            <div key={phoneticIndex}>
              <p>Phonetic: {phonetic.text}</p>
              {phonetic.audio && (
                <audio controls>
                  <source src={phonetic.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}
          {result.meanings.map((meaning, meaningIndex) => (
            <div key={meaningIndex}>
              <h3>{meaning.partOfSpeech}</h3>
              <ul>
                {meaning.definitions.map((definition, defIndex) => (
                  <li key={defIndex}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;

