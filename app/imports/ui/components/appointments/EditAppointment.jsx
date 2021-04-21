import React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { AutoForm, ErrorsField, DateField, BoolField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
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

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Modal as={AutoForm}
             schema={bridge}
             onSubmit={(data) => this.submit(data) }
             size={'mini'}
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
        <Modal.Content>
          <TextField name='title'/>
          <DateField name='start'/>
          <DateField name='end'/>
          <BoolField name='allDay'/>
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
