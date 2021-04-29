import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

export const appointmentPublications = {
  appointment: 'appointment',
  appointmentAdmin: 'AppointmentAdmin',
};

class AppointmentCollection extends BaseCollection {
  constructor() {
    super('Appointment', new SimpleSchema({
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
    }));
  }

  /**
   * Defines a new appointment.
   * @param name the name of the item.
   * @param start start time
   * @param end end time
   * @param owner the owner of the item.
   * @param title the appointment title
   * @param location the location of the appointment
   * @param type type of appointment (eg. check up, shot, etc)
   * @param extraInfo any extra info
   * @param reminders reminders set
   * @return {String} the docID of the new document.
   */
  define({ allDay = false, start, end, owner, title, location, type, extraInfo, reminders }) {
    console.log('...');
    const docID = this._collection.insert({
      allDay,
      owner,
      start,
      end,
      title,
      location,
      type,
      extraInfo,
      reminders,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the name of the item.
   * @param start start time
   * @param end end time
   * @param title the appointment title
   * @param location the location of the appointment
   * @param type type of appointment (eg. check up, shot, etc)
   * @param extraInfo any extra info
   * @param reminders reminders set
   */
  update(docID, { allDay, start, end, title, location, type, extraInfo, reminders }) {
    const updateData = {};
    if (allDay) {
      updateData.allDay = allDay;
    }
    if (_.isDate(start)) {
      updateData.start = start;
    }
    if (_.isDate(end)) {
      updateData.end = end;
    }
    if (title) {
      updateData.title = title;
    }
    if (location) {
      updateData.location = location;
    }
    if (type) {
      updateData.type = type;
    }
    if (extraInfo) {
      updateData.extraInfo = extraInfo;
    }
    if (reminders) {
      updateData.reminders = reminders;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the AppointmentCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(appointmentPublications.appointment, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeAppointment() {
    if (Meteor.isClient) {
      return Meteor.subscribe(appointmentPublications.appointment);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Appointments = new AppointmentCollection();
