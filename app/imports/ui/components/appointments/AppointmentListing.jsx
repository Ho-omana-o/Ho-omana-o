import React from 'react';
import { Segment, Label } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import moment from 'moment';
import EditAppointment from './EditAppointment';
import { appointmentRemoveItMethod } from '../../../api/appointment/AppointmentCollection.method';

/** Renders the appointment listings. */
class AppointmentListing extends React.Component {

  onDelete = (appointment) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this appointment!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          appointmentRemoveItMethod.call(appointment._id,
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                swal('Your appointment was deleted.', {
                  icon: 'success',
                });
              }
            });
        }
      });
  }

  render() {
    if (this.props.appointment !== undefined) {
      return (
        <Segment vertical className={'appointment-list'}>
          <b>Title</b>: {this.props.appointment.title}
          <br/>
          <b>Day</b>: {moment(this.props.appointment.start).add(10, 'hours').format('LLLL')}
          <br/>
          <b>Location</b>: {this.props.appointment.location}
          <br/>
          <EditAppointment appointment={this.props.appointment}/>
          <Label icon='trash' content={'Delete'} color={'red'} as={'a'}
                 onClick={() => this.onDelete(this.props.appointment)}/>
        </Segment>
      );
    }
    return (<div/>);
  }
}

AppointmentListing.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default AppointmentListing;
