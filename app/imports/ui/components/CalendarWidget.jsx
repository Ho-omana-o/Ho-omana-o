import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar';
import style from 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

const dummyEvents = [
  {
    allDay: false,
    end: new Date('April 10, 2021 11:13:00'),
    start: new Date('April 09, 2021 11:13:00'),
    title: 'hi',
  },
  {
    allDay: true,
    end: new Date('April 09, 2021 11:13:00'),
    start: new Date('April 09, 2021 11:13:00'),
    title: 'All Day Event',
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
              style={style}
              events={dummyEvents}
              // views={allViews}
              step={60}
              showMultiDayTimes
              // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
              defaultDate={new Date()}
              localizer={localizer}
            />
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CalendarWidget;
