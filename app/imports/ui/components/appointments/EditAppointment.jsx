import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Label, Modal } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  DateField,
  BoolField,
  SubmitField,
  TextField,
  ListItemField,
  SelectField, NumField, LongTextField, ListField, HiddenField,
} from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Appointments } from '../../../api/appointment/AppointmentCollection';
import { appointmentUpdateMethod } from '../../../api/appointment/AppointmentCollection.method';

const bridge = new SimpleSchema2Bridge(Appointments.getSchema());

/** Renders the widget for editing appointments. */
class EditAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  submit = (data) => {
    const { allDay, owner, start, end, title, location, type, extraInfo, reminders } = data;
    const id = data._id;
    appointmentUpdateMethod.call({ allDay, id, owner, start, end, title, location, type, extraInfo, reminders },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Appointment updated successfully', 'success');
          this.setState({ open: false });
        }
      });
  };

  render() {
    return (
      <Modal as={AutoForm}
             className={'reminder-fields'}
             schema={bridge}
             model={this.props.appointment}
             onSubmit={(data) => this.submit(data) }
             size={'large'}
             closeIcon
             open={this.state.open}
             onClose={() => this.setState({ open: false })}
             onOpen={() => this.setState({ open: true })}
             trigger={
               <Label icon='edit' content={'Edit'} as={'a'}/>
             }
             style = {{ fontSize: '13px' }}
      >
        <Modal.Header>Edit Appointment</Modal.Header>
        <Modal.Content scrolling>
          <TextField name='title'/>
          <TextField name='location'/>
          <TextField name='type'/>
          <DateField name='start'/>
          <DateField name='end'/>
          <LongTextField name='extraInfo'/>
          <ListField name="reminders" label={'Reminders'}>
            <ListItemField name="$">
              <SelectField name='type'/>
              <NumField name='number'/>
              <SelectField name='time' />
            </ListItemField>
          </ListField>
          <HiddenField name={'owner'} value={Meteor.user().username}/>
          <HiddenField name='allDay'/>
          <ErrorsField/>
        </Modal.Content>
        <Modal.Actions>
          <SubmitField value='Submit'/>
        </Modal.Actions>
      </Modal>
    );
  }
}

EditAppointment.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default EditAppointment;
