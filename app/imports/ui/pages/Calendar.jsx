import React from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CalendarWidget from '../components/calendar/CalendarWidget';
import AppointmentListing from '../components/appointments/AppointmentListing';
import { Appointments } from '../../api/appointment/AppointmentCollection';

/** Renders the Calendar page. */
class Calendar extends React.Component {


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const today = new Date();
    const appointmentListings = this.props.appointments.filter(({ start }) => start > today).sort();

    return (
      <Grid container centered className="main-content" columns={2} stackable textAlign={'center'}>
        <Grid.Row>
          <Header as="h2" textAlign="center">Calendar</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <CalendarWidget appointments={this.props.appointments}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Header as="h3" textAlign="center">Upcoming Appointments</Header>
              <hr/>
            </Grid.Row>
            <Grid.Row style={{ maxHeight: '560px', overflowY: 'auto' }}>
              {appointmentListings.map(
                (value, index) => <AppointmentListing appointment={value} key={index}/>,
              )}
              <AppointmentListing/>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Calendar.propTypes = {
  appointments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub = Appointments.subscribeAppointment();
  return {
    appointments: Appointments.find({}, { sort: { start: 1 } }).fetch(),
    ready: sub.ready(),
  };
})(Calendar);
