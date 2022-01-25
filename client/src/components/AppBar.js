import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router';

const pages = ['Sign In', 'Register', "Secret"];
const routeStor = {
    "Sign In": "/sign-in",
    "Register": "/sign-up",
    "Secret": "/secret",
}


let signoutComponent;
const ResponsiveAppBar = (props) => {
  let signoutvis = useSelector((state)=> state.vis.signout);
  let auth = useSelector((state)=> state.auth)
  let navigation = useNavigate();
  var handleSignOut = () => {
    fetch('/sign-out', {
      method:"GET"
    }).then(
      (res)=> {
        console.log(res.ok)
        if (!res.ok) {
          console.log({
            src: "sign-out",
            code: res.ok
        })
          return null
        }
        return res.json()}
    ).then(
      (res) => {
        navigation("/", {replace:true})
      }
    )
  }
  React.useEffect(() => {
    if (auth.verified) {
      signoutComponent = (<Button
        key="signout"
        onClick={handleSignOut}
        sx={{ my: 2, color: 'white', display: 'block' }}
        >
        Sign Out
        </Button>);
    } else {
      signoutComponent = null;
    }
  }, [signoutvis, auth ])
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to="/">APP</Link>
            
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Link  to={routeStor[page]}>
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  {page}
              </Button>
              </Link>
            ))}
            {signoutComponent}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
