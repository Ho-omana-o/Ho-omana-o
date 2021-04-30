import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Appointments } from './AppointmentCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const appointmentDefineMethod = new ValidatedMethod({
  name: 'AppointmentCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      return Appointments.define(definitionData);
    }
    return '';
  },
});

export const appointmentUpdateMethod = new ValidatedMethod({
  name: 'AppointmentCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Appointments.update(updateData.id, updateData);
    return true;
  },
});

export const appointmentRemoveItMethod = new ValidatedMethod({
  name: 'AppointmentCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Appointments.removeIt(instance);
  },
});
