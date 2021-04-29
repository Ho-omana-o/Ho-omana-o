import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Form, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  DateField,
  BoolField,
  TextField,
  LongTextField,
  NumField,
  ListField,
  ListItemField,
  SelectField, SubmitField, HiddenField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Appointments } from '../../../api/appointment/AppointmentCollection';
import { appointmentDefineMethod } from '../../../api/appointment/AppointmentCollection.method';

const bridge = new SimpleSchema2Bridge(Appointments.getSchema());

/** Renders the widget for editing appointments. */
class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  submit = (data) => {
    const { allDay, owner, start, end, title, location, type, extraInfo, reminders } = data;
    appointmentDefineMethod.call({ allDay, owner, start, end, title, location, type, extraInfo, reminders },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');

        }
      });
  };

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    return (
      <div>
        <Header>Add Appointment</Header>
        <Form as={AutoForm}
              className={'reminder-fields'}
              onSubmit={(data) => this.submit(data) }
              model={this.props.event}
              style={{ textAlign: 'left', maxHeight: '500px', overflowY: 'scroll' }}
              schema={bridge}>
          <TextField name='title'/>
          <TextField name='location'/>
          <TextField name='type'/>
          <DateField name='start'/>
          <DateField name='end'/>
          <BoolField name='allDay'/>
          <LongTextField name='extraInfo' />
          <ListField name="reminders">
            <ListItemField name='$'>
              <SelectField name='type'/>
              <NumField name='number'/>
              <SelectField name='time'/>
            </ListItemField>
          </ListField>
          <HiddenField name={'owner'} value={Meteor.user().username}/>
          <SubmitField value='Submit'/>
          <ErrorsField/>
        </Form>
      </div>
    );
  }
}

/** Require an array of StudySessions in the props. */
AppointmentForm.propTypes = {
  event: PropTypes.object.isRequired,
};

export default AppointmentForm;
