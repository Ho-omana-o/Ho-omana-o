import React from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className="signup-background">
        <Grid centered fluid verticalAlign='middle' textAlign='center'>
          <Grid.Row>
            <h1 style={{ fontSize: '80px', backgroundColor: '#1a2626', color: 'white' }} > WELCOME TO
              HO&apos;OMANA&apos;O </h1>
          </Grid.Row>
          <Grid.Column width={4} textAlign='center' style={{ fontSize: '80px',
            backgroundColor: '#1a2626', color: 'white' }} >
            <h2>
              Our appointment reminder software can be set up exactly how you need,
              send automatic timed reminders
            </h2>
          </Grid.Column>
          <Grid.Column width={4} textAlign='center' style={{ fontSize: '80px',
            backgroundColor: '#1a2626', color: 'white' }} >
            <h2>Reduce No-Shows and Save time with Automation
              Set up appointment reminders that replace manual tasks.</h2>
            <Button className='whtBtn' animated size="large">
              <Button.Content as={NavLink} exact to="/signup" visible>Join Now</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right'/>
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
        </div>
    );
  }
}

export default Landing;
