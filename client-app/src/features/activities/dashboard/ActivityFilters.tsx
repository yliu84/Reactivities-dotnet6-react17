import React from 'react';
import { observer } from 'mobx-react-lite';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const ActivityFilters = () => {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 30 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item
          content='All Activites'
          //   active={predicate.has('all')}
          //   onClick={() => setPredicate('all', 'true')}
        />
        <Menu.Item
          content="I'm going"
          //   active={predicate.has('isGoing')}
          //   onClick={() => setPredicate('isGoing', 'true')}
        />
        <Menu.Item
          content="I'm hosting"
          //   active={predicate.has('isHost')}
          //   onClick={() => setPredicate('isHost', 'true')}
        />
      </Menu>
      <Header />
      <Calendar
      // onChange={(date) => setPredicate('startDate', date as Date)}
      // value={predicate.get('startDate') || new Date()}
      />
    </>
  );
};

export default observer(ActivityFilters);