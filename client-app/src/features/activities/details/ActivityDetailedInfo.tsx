import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity;
}

const ActivityDetailedInfo = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar alternate outline' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {/* {format(activity.date!, 'dd MMM yyyy h:mm aa')} */}
              {activity.date}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='map marker alternate' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {activity.venue}, {activity.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedInfo);
