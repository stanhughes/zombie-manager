import React from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function createZombies(count, start, location) {
  const zombies = [{id: 101, location: location}]
  return (zombies)
}

function App() {
  let showList = true;
  const hospitalCnt = createZombies(250,101, 'hospital');
  const schoolCnt = 110;
  const warehouseCnt = 98;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listZombies = (list) => {
    if (list) {
      return list.map( zombie => (
        <React.Fragment>
        <ListItem 
          button
          key={zombie.id}
          aria-controls="location-menu" aria-haspopup="true" onClick={handleClick}
        >
          <ListItemText primary={zombie.id} />
        </ListItem>
        <Menu
        id="location-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <MenuItem onClick={handleClose}>Hospital</MenuItem>
        <MenuItem onClick={handleClose}>School</MenuItem>
        <MenuItem onClick={handleClose}>Warehouse</MenuItem>
      </Menu>
      </React.Fragment>
      ));
    }
  }
  
  const list = [{id: 101, location: 'hospital'}, {id:102, location: 'hospital'}];

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth='md'>
      {(showList && 
        <List>
          {listZombies(list)}
        </List>
      )}
    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '65vh' }}>
    <Container maxWidth='sm'>
      <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }}>
        <Grid container direction='column' justify='center' alignItems='center' color='primary' > 
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '7vh' }}></Typography>
          <Grid container direction='row' justify='flex-start' alignItems='center' > 
            <Button 
              variant="contained" 
              color="primary"
              aria-controls="action-menu" aria-haspopup="true" onClick={handleClick}
            > 
              Hospital ({hospitalCnt.length} Zombies)
            </Button>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>List Zombies</MenuItem>
              <MenuItem onClick={handleClose}>Move Zombie</MenuItem>
            </Menu>
          </Grid>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '15vh' }}></Typography>
          <Grid container direction='row' justify='flex-end' alignItems='center'> 
            <Button variant="contained" color="primary"> 
              Warehouse ({warehouseCnt} Zombies) 
            </Button> 
          </Grid>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '15vh' }}></Typography>
          <Grid container direction='row' justify='flex-start' alignItems='flex-end' > 
            <Button variant="contained" color="primary"> 
              School ({schoolCnt}) Zombies
            </Button> 
          </Grid> 
        </Grid>
      </Typography>
    </Container>
    </Typography>
    </Container>
    </React.Fragment>
  );
}

export default App;
