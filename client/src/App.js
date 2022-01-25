import React from 'react';
import ResponsiveAppBar from './components/AppBar.js';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import {asyncConnectServer} from './features/msgSlice'
import { Outlet } from 'react-router';


function App() {
  // let [msg, setMsg] = React.useState(null);
  const msg = useSelector((state)=> state.msg.value);
  const dispatch = useDispatch()
  React.useEffect(
    () => {
      dispatch(asyncConnectServer())
    }, [dispatch])

  return (
    <Box className="App">
      <header className="App-header">
        <ResponsiveAppBar />
      </header>
      <Outlet context={msg}/>
    </Box>
  );
}

export default App;
