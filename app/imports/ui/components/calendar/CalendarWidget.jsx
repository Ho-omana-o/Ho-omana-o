import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms;
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import swal from '@sweetalert/with-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Appointments } from '../../../api/appointment/AppointmentCollection';
import AppointmentForm from '../appointments/AppointmentForm';
import AddAppointment from '../appointments/AddAppointment';

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

/** Renders the Page for adding stuff. */
class CalendarWidget extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
      <Grid container centered className="main-content">
        <Grid.Column>
          <div>
            <Cal
              selectable
              style={style}
              events={this.props.appointments}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              localizer={localizer}
              onSelectEvent={event => swal({
                content: <AppointmentForm event={event}/>,
                className: 'reminder-modal',
                buttons: ['Close', 'Edit'],
              })}
              onSelectSlot={
                event => swal({
                  content: <AddAppointment event={event}/>,
                  className: 'reminder-modal',
                  buttons: 'Close',
              })}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
CalendarWidget.propTypes = {
  appointments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Transaction documents.
  const sub = Appointments.subscribeAppointment();
  return {
    appointments: Appointments.find({}).fetch(),
    ready: sub.ready(),
  };
})(CalendarWidget);
