import React from 'react';
import { Form } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  DateField,
  BoolField,
  TextField,
  LongTextField,
  ListField,
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
    defaultValue: 'Email',
    allowedValues: ['Email', 'Text'],
  },
  'reminders.$.time': {
    type: String,
    defaultValue: 'Minute',
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
        <Form as={AutoForm}
              style={{ textAlign: 'left', maxHeight: '500px', overflowY: 'scroll' }}
              schema={bridge}
              className={'reminder-fields'}>
          <TextField name='title' readOnly value={this.props.event.title}/>
          <TextField name='location' readOnly value={this.props.event.location}/>
          <TextField name='type' readOnly value={this.props.event.type}/>
          <DateField name='start' readOnly value={this.props.event.start}/>
          <DateField name='end' readOnly value={this.props.event.end}/>
          <BoolField name='allDay' readOnly/>
          <LongTextField name='extraInfo' readOnly value={this.props.event.extraInfo}/>
          <ListField name="reminders" label={'Reminders'} readOnly
                     initialCount={this.props.event.reminders.length} itemProps={this.props.event.reminders}>
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
