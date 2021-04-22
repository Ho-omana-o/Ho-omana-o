import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import CalendarWidget from '../components/calendar/CalendarWidget';
import AppointmentListing from '../components/appointments/AppointmentListing';

/** Renders the Calendar page. */
class Calendar extends React.Component {

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered className="main-content" columns={2} stackable textAlign={'center'}>
        <Grid.Row>
          <Header as="h2" textAlign="center">Calendar</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <CalendarWidget/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Header as="h3" textAlign="center">Upcoming Appointments</Header>
              <hr/>
            </Grid.Row>
            <Grid.Row style={{ maxHeight: '560px', overflowY: 'scroll' }}>
              {[...Array(10)].map(
                (value, index) => <AppointmentListing key={index}/>,
              )}
              <AppointmentListing/>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Calendar;
