import React, { useEffect, useState } from 'react';
import './App.css';
import { Header, List } from 'semantic-ui-react';
import axios from 'axios';

const {Item} = List;

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(res => {
      setActivities(res.data);
    })
  },[]);
  
  return (
    <div>
      <Header as='h2' icon="users" content="Reactivities" />
      <List>
        {activities.map((activity:any) => (
          <Item key={activity.Id}>
            {activity.title}
          </Item>
        ))}
      </List>
    </div>
  );
}

export default App;
