import { useState } from 'react';
import { FormControlLabel,  Typography, Container, Grid, Switch } from '@mui/material';

const BooleanSliderList = () => {
  const [options, setOptions] = useState([
    { id: 1, label: 'Auth Rep 1', value: 101 },
    { id: 2, label: 'Auth Rep 2', value: 102 },
    { id: 3, label: 'Auth Rep 3', value: 103 },
    // Add more options as needed
  ]);
  
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Auth Rep 1 Permissions
      </Typography>
      <Grid container justifyContent="flex-end">
        {options.map((option) => (
          <Grid item xs={12} key={option.id}>
            <button>Manage Authorizations</button>
          </Grid>
        ))}
      </Grid>

    </Container>
  );
};


export default BooleanSliderList;