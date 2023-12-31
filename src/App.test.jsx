import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';


// test för ifall "Engelsk ordbok" / h1 renderas

test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText('Engelsk ordbok');
  expect(headerElement).toBeInTheDocument();
});


// test för att se om man får felmeddelandet om sökfältet är tomt när man söker på det.

test('visar ett felmeddelande när sökfältet är tomt', () => {
    render(<App />);
  
    const searchButton = screen.getByText('Sök');
    fireEvent.click(searchButton);
  
    const errorMessage = screen.getByText('Vänligen ange ett ord att söka efter.');
    expect(errorMessage).toBeInTheDocument();
  });



// test för att se om när man söker på ett ord, om man får upp ordet

test('visar information när du söker med ett ord', async () => {
    render(<App />);
  
    const searchInput = screen.getByPlaceholderText('Sök efter ett ord');
    const searchButton = screen.getByText('Sök');
  
    fireEvent.change(searchInput, { target: { value: 'apple' } });
  
    fireEvent.click(searchButton);
  
    await waitFor(() => {
      const wordInfo = screen.getByText('apple');
      expect(wordInfo).toBeInTheDocument();
      
        
    });
  });


// test för att se så noun renderas på sidan

test('visar upp neon när renderas', async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText('Sök efter ett ord');
    const searchButton = screen.getByText('Sök');

    fireEvent.change(searchInput, { target: { value: 'apple' } });

    fireEvent.click(searchButton);

    await waitFor(() => {
      const audioElement = screen.getByText('noun');
      expect(audioElement).toBeInTheDocument();
    });
  });

  // test för att se så verb renderas på sidan

test('visar upp verb när renderas', async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText('Sök efter ett ord');
  const searchButton = screen.getByText('Sök');

  fireEvent.change(searchInput, { target: { value: 'apple' } });

  fireEvent.click(searchButton);

  await waitFor(() => {
    const audioElement = screen.getByText('verb');
    expect(audioElement).toBeInTheDocument();
  });
});


// test för audio

test('visar två ljudfiler när de är tillgängliga', async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText('Sök efter ett ord');
  const searchButton = screen.getByText('Sök');

  fireEvent.change(searchInput, { target: { value: 'apple' } });

  fireEvent.click(searchButton);

  await waitFor(() => {
    const audioElements = screen.queryAllByTestId('audio-element');
    expect(audioElements).toHaveLength(2);
  });
});



