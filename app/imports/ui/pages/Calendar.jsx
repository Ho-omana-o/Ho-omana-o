import React from 'react';
import { Grid, Segment, Header, Label, Button } from 'semantic-ui-react';
import CalendarWidget from '../components/CalendarWidget';

/** Renders the Page for adding stuff. */
class Calendar extends React.Component {

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered className="main-content" columns={2} stackable textAlign={'center'}>
        <Grid.Row>
          <Header as="h2" textAlign="center">Calendar</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header as="h3" textAlign="center">Upcoming Appointments</Header>
            <Segment vertical>
              Dr Smith: Thursday, 11th April
              <br/>
              <Label>11:30am</Label>
              <Label icon='edit' content={'Edit'} as={'a'}/>
              <Label icon='trash can' content={'Delete'} color={'red'} as={'a'}/>
            </Segment>
            <Segment vertical>Pellentesque habitant morbi tristique senectus.</Segment>
            <Segment vertical>
              Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id.
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <CalendarWidget/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Calendar;
