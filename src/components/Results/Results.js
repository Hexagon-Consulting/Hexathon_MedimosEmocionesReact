import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';
import { mapExpressionToEmoji } from '../../helpers/emojis';
import './Results.css';

// <p>Vos pareces tener {Math.round(results[0].age)} años</p>
const Results = ({ results, processing }) => {
  if (processing && results[0]) {
    
    let sUrl = "https://api.appery.io/rest/1/apiexpress/api/People?apiKey=6a7d771a-2d3e-4348-b3e6-de8938ec96f2";
    fetch(sUrl, 
      {method: 'POST',
      body: JSON.stringify({
        "gender":results[0].gender,
        "expressions": results[0].expressions.asSortedArray()[0].expression,
        "id": Number(new Date().getTime())
      })})
   .then(response => response.json())
   .then(data => console.log(data));
      console.log(results);
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <p>Creo que...</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: '300px' }}>
                  <p>
                    Alguno de ustedes probablemente es {result.gender}, parece {result.expressions.asSortedArray()[0].expression} and looks around{' '}
                    {Math.round(result.age)}
                  </p>
                </div>
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.expressions.asSortedArray()[0].expression)} size="4x" />
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.gender)} size="4x" />
              </div>
            ))}
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>Creo que...</p>
              <p>Pareces {results[0].expressions.asSortedArray()[0].expression}</p>
              <p>Creo que sos {results[0].gender}</p>
            </div>
            <div className="results__emoji">
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].expressions.asSortedArray()[0].expression)} size="4x" />
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} size="4x" />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;
