import React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  DateField,
  BoolField,
  SubmitField,
  TextField,
  ListItemField,
  SelectField, NumField, LongTextField, ListField,
} from 'uniforms-semantic';
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
    minCount: 0,
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
class EditAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  submit = (data) => {
    console.log(data);
  };

  render() {
    return (
      <Modal as={AutoForm}
             className={'reminder-fields'}
             schema={bridge}
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
          <BoolField name='allDay'/>
          <TextField name='extraInfo'/>
          <LongTextField name='extraInfo'/>
          <ListField name="reminders" label={'Reminders'}>
            <ListItemField name="$">
              <SelectField name='type'/>
              <NumField name='number'/>
              <SelectField name='time' />
            </ListItemField>
          </ListField>
          <ErrorsField/>
        </Modal.Content>
        <Modal.Actions>
          <SubmitField value='Submit'/>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default EditAppointment;
