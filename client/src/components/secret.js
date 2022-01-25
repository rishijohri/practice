import React from 'react';
import Button from '@mui/material/Button';
import { Authenticate } from './authenticate';
export function Secret(props) {
    return (
        <Authenticate>
            <center>
                <Button variant="contained">Hello World</Button>
                <p>
                    You have arrived at a very secret location
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
        </Authenticate>
        
    );
}