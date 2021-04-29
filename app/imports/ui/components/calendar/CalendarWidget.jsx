import React from 'react';
import { Grid } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms;
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import swal from '@sweetalert/with-react';
import moment from 'moment';
import AppointmentForm from '../appointments/AppointmentForm';
import AddAppointment from '../appointments/AddAppointment';

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

const dummyEvents = [
  {
    allDay: false,
    start: new Date('April 21, 2021 11:13:00'),
    end: new Date('April 21, 2021 12:30:00'),
    title: 'Yearly Check Up',
    type: 'Check Up',
    location: 'Queen\'s Hospital',
    owner: 'john@foo.com',
    extraInfo: '',
    reminders: [
      {
        type: 'Email',
        time: 'Days',
        number: 4,
      },
      {
        type: 'Text',
        time: 'Minutes',
        number: 30,
      },
    ],
  },
  {
    allDay: false,
    start: new Date('April 09, 2021 9:13:00'),
    end: new Date('April 09, 2021 11:13:00'),
    title: 'Pick Up Medication',
    type: 'Medication',
    location: 'Queen\'s Hospital',
    owner: 'john@foo.com',
    extraInfo: 'Bring medicine card',
    reminders: [
      {
        type: 'Text',
        time: 'Days',
        number: 4,
      },
      {
        type: 'Email',
        time: 'Hours',
        number: 1,
      },
    ],
  },
];

/** Renders the Page for adding stuff. */
class CalendarWidget extends React.Component {

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Grid container centered className="main-content">
        <Grid.Column>
          <div>
            <Cal
              selectable
              style={style}
              events={dummyEvents}
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
                  buttons: ['Close', 'Add'],
              })}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CalendarWidget;
