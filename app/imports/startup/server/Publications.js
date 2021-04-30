import { Meteor } from 'meteor/meteor';
import { Appointments } from '../../api/appointment/AppointmentCollection';

/** Publish all the collections you need. */
Appointments.publish();

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
