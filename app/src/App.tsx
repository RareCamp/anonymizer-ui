import React from 'react';
import './App.css';

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

import WorkflowStepper from './components/WorkflowStepper/WorkflowStepper';

function App() {
  return (
    <Container maxWidth="sm">
      <AppBar>
        <Typography variant="h6" component="div" align="center">
          Connect
        </Typography>
      </AppBar>
      <WorkflowStepper></WorkflowStepper>
    </Container>
  );
}

export default App;
