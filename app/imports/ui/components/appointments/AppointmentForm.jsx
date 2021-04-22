import React from 'react';
import { Form, Button } from 'semantic-ui-react';
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
  SelectField,
  NestField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Nest from 'uniforms-semantic/src/NestField';

const formSchema = new SimpleSchema({
  allDay: {
    type: Boolean,
    optional: true,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  owner: {
    type: String,
  },
  title: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: String,
  },
  extraInfo: {
    type: String,
    optional: true,
  },
  reminders: {
    optional: true,
    type: Array,
  },
  'reminders.$': {
    optional: true,
    type: Object,
  },
  'reminders.$.type': {
    optional: true,
    type: String,
    defaultValue: 'Email',
    allowedValues: ['Email', 'Text'],
  },
  'reminders.$.time': {
    optional: true,
    type: String,
    defaultValue: 'Minute',
    allowedValues: ['Minutes', 'Hours', 'Days'],
  },
  'reminders.$.number': {
    optional: true,
    type: Number,
    min: 0,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

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
          <BoolField name='allDay' disabled/>
          <LongTextField name='extraInfo' disabled />
          <ListField name="reminders" label={'Reminders'} disabled>
            <ListItemField name='$' disabled style={{ opacity: '1' }}>
              <SelectField name='type' disabled/>
              <NumField name='number' disabled/>
              <SelectField name='time' disabled/>
            </ListItemField>
          </ListField>
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
