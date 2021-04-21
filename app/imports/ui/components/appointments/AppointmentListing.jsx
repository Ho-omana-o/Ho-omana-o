import React from 'react';
import { Segment, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import EditAppointment from './EditAppointment';

/** Renders the appointment listings. */
class AppointmentListing extends React.Component {

  onDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this appointment!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Your appointment was deleted.', {
            icon: 'success',
          });
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
      <Segment vertical>
        Dr Smith: Thursday, 11th April
        <br/>
        <Label>11:30am</Label>
        <EditAppointment/>
        <Label icon='trash' content={'Delete'} color={'red'} as={'a'} onClick={() => this.onDelete()}/>
      </Segment>
    );
  }
}

export default AppointmentListing;
