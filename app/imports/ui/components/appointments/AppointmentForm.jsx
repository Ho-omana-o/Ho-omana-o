import React from 'react';
import { Form, Modal } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  DateField,
  TextField,
  LongTextField,
  NumField,
  ListField,
  ListItemField,
  SelectField, HiddenField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Appointments } from '../../../api/appointment/AppointmentCollection';


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
    console.log(data);
  };


  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    return (
      <div>
        <Form as={AutoForm}
              model={this.props.event}
              readOnly
              style={{ textAlign: 'left', maxHeight: '500px', overflowY: 'scroll' }}
              schema={bridge}
              className={'reminder-fields'}>
          <TextField name='title' disabled/>
          <TextField name='location' disabled/>
          <TextField name='type' disabled/>
          <DateField name='start' disabled/>
          <DateField name='end' disabled/>
          <LongTextField name='extraInfo' disabled />
          <ListField name="reminders" label={'Reminders'} disabled>
            <ListItemField name='$' disabled style={{ opacity: '1' }}>
              <SelectField name='type' disabled/>
              <NumField name='number' disabled/>
              <SelectField name='time' disabled/>
            </ListItemField>
          </ListField>
          <HiddenField name='allDay'/>
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
