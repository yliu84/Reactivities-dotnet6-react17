import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route
                key={location.key}
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
