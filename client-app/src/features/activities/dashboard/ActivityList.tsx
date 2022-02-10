import React, { Fragment, SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading } = activityStore;
  const [target, setTarget] = useState('');

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
    <>
      <Fragment>
        <Header sub color='teal'>
          {/* {group} */}
        </Header>
        {activitiesByDate.map((activity) => (
          <ActivityListItem key={activity.id} activity={activity} />
        ))}
      </Fragment>
    </>
  );
};

export default observer(ActivityList);
