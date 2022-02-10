import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const {
    loadingInitial,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

  return (
    <Segment>
      <Header content='Activity Details' sub color='teal' />
      <Form className='ui form' autoComplete='off'>
        <MyTextInput name='title' placeholder='Title' />
        <MyTextArea rows={3} placeholder='Description' name='description' />
        {/* <MySelectInput
          options={categoryOptions}
          placeholder='Category'
          name='category'
        /> */}
        <MyDateInput
          placeholderText='Date'
          name='date'
          showTimeSelect
          timeCaption='time'
          dateFormat='MMMM d, yyyy h:mm aa'
        />
        <Header content='Location Details' sub color='teal' />
        <MyTextInput placeholder='City' name='city' />
        <MyTextInput placeholder='Venue' name='venue' />
        <Button
          // disabled={isSubmitting || !dirty || !isValid}
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          as={Link}
          to='/activities'
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
