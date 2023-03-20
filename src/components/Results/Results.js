import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';

import { mapExpressionToEmoji } from '../../helpers/emojis';

import './Results.css';

const Results = ({ results, processing }) => {
  if (processing && results) {
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
              <p>Vos pareces tener {Math.round(results[0].age)} años</p>
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
