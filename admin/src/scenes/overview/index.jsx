import React, { useState} from 'react';
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material';
import Header from '../../components/Header';
import OverviewChart from '../../components/OverviewChart';

function Overview() {
    const [view, setView] = useState('units');
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Vue d'ensemble" />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>Affichage</InputLabel>
          <Select
            value={view}
            label="Affichage"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Total des recettes</MenuItem>
            <MenuItem value="units">Nombre de produits</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;