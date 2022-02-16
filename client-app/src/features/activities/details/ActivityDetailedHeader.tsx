import React from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import { Segment, Image, Item, Header } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

const activityImageStyle = {
  filter: 'brightness(30%)',
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

interface Props {
  activity: Activity;
}

const ActivityDetailedHeader = ({ activity }: Props) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by{' '}
                  {/* <strong>
                    <Link to={`/profiles/${activity.host?.username}`}>
                      {activity.host?.displayName}
                    </Link>
                  </strong> */}
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
