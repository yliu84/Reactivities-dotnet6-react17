import React from 'react';
import { observer } from 'mobx-react-lite';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity;
}

const ActivityDetailedSidebar = ({ activity }: Props) => {
  return <div></div>;
};

export default observer(ActivityDetailedSidebar);
