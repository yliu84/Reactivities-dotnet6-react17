import React from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserActivity } from '../../app/models/profile';
import { format } from 'date-fns';
import { useStore } from '../../app/stores/store';

const ProfileActivities = () => {
  return <div>ProfileActivities</div>;
};

export default observer(ProfileActivities);
