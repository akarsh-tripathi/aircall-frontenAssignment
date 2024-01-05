import React, { useState } from 'react';

const NumberPad = ({ onNumberClick, onDelete, onClear, onSubmit }) => {
  const [input, setInput] = useState('');

  const handleNumberClick = (number) => {
    setInput((prevInput) => prevInput + number);
    onNumberClick && onNumberClick(number);
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
    onDelete && onDelete();
  };

  const handleClear = () => {
    setInput('');
    onClear && onClear();
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(input);
    // You can perform additional actions with the entered value
    // For example, send it to a server, update state, etc.
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <button style={{ marginTop: '8px' }} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default NumberPad;
