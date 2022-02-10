import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {activityStore.loadingInitial ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <ActivityList />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activities Filter</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
