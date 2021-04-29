import { Appointments } from '../../api/appointment/AppointmentCollection';

/* eslint-disable no-console */

const defaultAppointments = JSON.parse(Assets.getText('defaultAppointments.json'));

/** Initialize the database with a default data document. */
function addAppointments(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Appointments.define(data);
}

/** Initialize the collection if empty. */
if (Appointments.count() === 0) {
  console.log('Creating default appointment data.');
  defaultAppointments.map(data => addAppointments(data));
}
