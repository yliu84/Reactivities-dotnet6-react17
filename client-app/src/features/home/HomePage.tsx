import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Header, Image } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

function HomePage() {
  return (
    <Container>
      <Header as='h1' inverted>
        <Image
          size='massive'
          src='/assets/logo.png'
          alt='logo'
          style={{ marginBottom: 12 }}
        />
        Reactivities
      </Header>
    </Container>
  );
}

export default observer(HomePage);
