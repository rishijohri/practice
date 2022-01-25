import React from 'react';
import Button from '@mui/material/Button';
import { useOutletContext } from 'react-router';
import { Box } from '@mui/material';

export function Home(props) {
    var msg = useOutletContext();
    return (
      <Box
      alignItems="center"
      justifyContent="center"
      m={2}
      >
        <center>
      <Button variant="contained">Hello World</Button>
        <p>
          |||||||||||||  Edit and save to reload. HIII {msg}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </center>
        </Box>
    );
}