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
import SimpleSchema from 'simpl-schema';

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
    type: String,
    allowedValues: ['Email', 'Text'],
  },
  'reminders.$.time': {
    type: String,
    allowedValues: ['Minutes', 'Hours', 'Days'],
  },
  'reminders.$.number': {
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
          <HiddenField name='owner' value={'test'}/>
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
