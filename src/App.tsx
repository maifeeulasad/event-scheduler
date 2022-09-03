import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { Landing } from './component/landing/Landing';
import { Conference } from './component/conference/Conference';
import { apolloClient } from './services/apollo-client';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename="/event-scheduler">
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/conference/:conferenceId" element={<Conference />} />
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

// eslint-disable-next-line import/no-default-export
export default App;
