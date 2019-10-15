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
import FormLabel from '@material-ui/core/FormLabel';

const hospital = 'hospital';
const school = 'school';
const warehouse = 'warehouse'

let hospitalZombies = [
  101,
  102,
  103,
  104,
  105,
  106,
  107,
  108,
  109,
  110,
];
let schoolZombies = [
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  209,
  210,
];
let warehouseZombies = [
  301,
  302,
  303,
  304,
  305,
  306,
  307,
  308,
  309,
  310,
];

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentList, setCurrentList] = React.useState(null);
  const [currentZombie, setCurrentZombie] = React.useState(null);

  const handleClick = event => {
    console.log('handleClick')
    console.log('event.target.id=' + event.target.id)
    console.log('event.target=' + event.target)
    console.log('event.target.dataset=' + event.target.dataset)
    console.log('event.tartget.dataset.index=' + event.target.dataset.index)
    console.log('event.currentTarget.dataset.index=' + event.currentTarget.dataset.index)
    console.log('event.detail.index=' + event.detail.index)
    console.log('event.detail=' + event.detail)
    console.log(event)
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event, zombie) => {
    console.log('handleClick2')
    console.log('zombie=' + zombie)
    setAnchorEl(event.currentTarget);
    setCurrentZombie(zombie);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const zombieMove = (from, to) => {
    console.log('zombieMove');
    console.log(currentZombie)
    console.log(from)
    console.log(to)
    switch(from) {
      case hospital:
        hospitalZombies = hospitalZombies.filter(function(value, index, arr){
          return value != currentZombie;
        });
        break;
      case school:
        schoolZombies = schoolZombies.filter(function(value, index, arr){
          return value != currentZombie;
        });
        break;
      case warehouse:
        warehouseZombies = warehouseZombies.filter(function(value,index,arr){
          return value != currentZombie;
        })
    }
    switch(to) {
      case hospital:
        hospitalZombies.unshift(currentZombie);
        break;
      case school:
        schoolZombies.unshift(currentZombie);
        break;
      case warehouse:
        warehouseZombies.unshift(currentZombie);
        break;
    }
    setCurrentZombie(null)
    setAnchorEl(null)
  }

  const handleList = (location) => {
    if (currentList === null) {
      setCurrentList(location);
    } else if (currentList === location) {
      setCurrentList(null);
    } else {
      // point at a different location
      // point to the current location
      setCurrentList(location)
    }
  }

  const listZombies = (list, current) => {
    if (list && current) {
      return list.map( zombie => (
          <ListItem 
            button
            key={zombie.toString()}
            id={zombie.toString()}
            value={zombie}
          >
            <ListItemText 
              key={zombie.toString()}
              id={zombie.toString()}
              data-index={zombie.toString()}
              primary={'Zombie: ' + zombie} 
              onClick={ (event) => handleClick2(event, zombie)} 
              aria-controls="location-menu" aria-haspopup="true" />
            <Menu id="location-menu" 
              anchorEl={anchorEl} 
              keepMounted 
              open={Boolean(anchorEl)} 
              onClose={handleClose} > 
                {current !== hospital 
                  ? <MenuItem onClick={() => zombieMove(current, hospital)}>Hospital</MenuItem> 
                  : null}
                {current !== school 
                  ? <MenuItem onClick={() => zombieMove(current, school)}>School</MenuItem> 
                  : null} 
                {current !== warehouse 
                  ? <MenuItem onClick={() => zombieMove(current, warehouse)}>Warehouse</MenuItem> 
                  : null} 
            </Menu>
          </ListItem>
      ));
    }
  }
  
  let list
  switch (currentList) {
    case hospital:
      list = hospitalZombies;
      break;
    case warehouse:
      list = warehouseZombies;
      break;
    case school:
      list = schoolZombies;
      break;
    default:
      list = null;
  }

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth='md'>
      <FormLabel>Zombie Manager</FormLabel>
      <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '65vh' }}>
      <Container maxWidth='sm'>
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }}>
          <Grid container direction='column' justify='center' alignItems='center' color='primary' > 
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '7vh' }}></Typography>
            <Grid container direction='row' justify='flex-start' alignItems='center' > 
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => handleList(hospital)}
              > 
                Hospital ({hospitalZombies.length} Zombies)
              </Button>
            </Grid>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '15vh' }}></Typography>
            <Grid container direction='row' justify='flex-end' alignItems='center'> 
              <Button variant="contained" color="primary" onClick={() => handleList(warehouse)}> 
                Warehouse ({warehouseZombies.length} Zombies) 
              </Button> 
            </Grid>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '15vh' }}></Typography>
            <Grid container direction='row' justify='flex-start' alignItems='flex-end' > 
              <Button variant="contained" color="primary" onClick={() => handleList(school)}> 
                School ({schoolZombies.length}) Zombies
              </Button> 
            </Grid> 
          </Grid>
        </Typography>
      </Container>
      </Typography>
      {(currentList && 
        <Container>
          <FormLabel>{currentList + ' zombies: to move a zombie, select it'}</FormLabel>
          <List>
            {listZombies(list, currentList)}
          </List>
        </Container>
        )}
    </Container>
    </React.Fragment>
  );
}

export default App;
