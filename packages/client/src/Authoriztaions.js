import { useState } from 'react';
import { FormControlLabel,  Typography, Container, Grid, Switch } from '@mui/material';

const BooleanSliderList = () => {
  const [options, setOptions] = useState([
    { id: 1, label: 'Submit Applications', value: false },
    { id: 2, label: 'View Documents', value: true },
    { id: 3, label: 'Upload Documents', value: false },
    // Add more options as needed
  ]);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSliderChange = (id) => (event, newValue) => {
    setIsButtonActive(true);
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newValue } : option
      )
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Auth Rep 1 Permissions
      </Typography>
      <Grid container justifyContent="flex-end">
        {options.map((option) => (
          <Grid item xs={12} key={option.id}>
            <FormControlLabel
              labelPlacement="end"
              control={
                <Switch
                  checked={option.value}
                  onChange={handleSliderChange(option.id)}
                  color="primary"
                />
              }
              label={option.label}
            />
          </Grid>
        ))}
      </Grid>
      <button disabled={!isButtonActive}>Save Changes</button>

    </Container>
  );
};


export default BooleanSliderList;