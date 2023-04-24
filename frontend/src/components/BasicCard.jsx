import * as React from 'react';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/*const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
*/
export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
       <CardContent>
       <Typography variant="h5" component="div">
          Title
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Description
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Price per Person
        </Typography>
        <Button className='warning'>Book Now </Button>
      </CardContent>
    </Card>
  );
}