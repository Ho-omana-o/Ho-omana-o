import React from 'react';
import { Grid, Icon, Button, Segment, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container className="landing-background">
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column className='welcome'>
              <h1 style={{ fontSize: '80px', backgroundColor: '#1a2626', color: 'white' }} > WELCOME TO
                HO&apos;OMANA&apos;O </h1>
            </Grid.Column>
          </Grid>
          <Grid className='segments' columns={2} verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={1000}>
              <h2>
                Our appointment reminder software can be set up exactly how you need,
                send automatic timed reminders
              </h2>
            </Grid.Column>
            <Grid.Column width={80}>
              <Segment basic floated='right' compact textAlign='center'>
                <h2>Reduce No-Shows and Save time with Automation
                  Set up appointment reminders that replace manual tasks.</h2>
                <Button className='whtBtn' animated size="large">
                  <Button.Content as={NavLink} exact to="/signup" visible>Join Now</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right'/>
                  </Button.Content>
                </Button>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default Landing;
