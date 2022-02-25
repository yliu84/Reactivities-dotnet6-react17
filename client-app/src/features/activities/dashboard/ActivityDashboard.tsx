import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';
import ActivityFilters from './ActivityFilters';
import { PagingParams } from '../../../app/models/pagination';

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } =
    activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <>
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <ActivityList />
            </InfiniteScroll>
            {/* <Button
              floated='right'
              content='More...'
              positive
              onClick={handleGetNext}
              loading={loadingNext}
              disabled={pagination?.totalPages === pagination?.currentPage}
            /> */}
          </>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
