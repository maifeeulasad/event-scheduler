import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { CustomLayout } from './layout/CustomLayout';
import { Landing } from './component/landing/Landing';
import { Page2 } from './component/Page2';
import { Page3 } from './component/Page3';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://api.react-finland.fi/graphql',
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename="/event-scheduler">
      <CustomLayout>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route
            path="*"
            element={<Navigate to="/landing" replace />}
          />
        </Routes>
      </CustomLayout>
    </BrowserRouter>
  </ApolloProvider>
);

// eslint-disable-next-line import/no-default-export
export default App;
