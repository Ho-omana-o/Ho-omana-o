import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
      <div style={{ textAlign: 'left', maxHeight: '500px', overflowY: 'auto' }}>
        <Header>{this.props.event.title}</Header>
        <br/>
        <b>Location:</b> {this.props.event.location}
        <br/>
        <b>Time:</b> {moment(this.props.event.start).add(10, 'hours').format('LLLL')} to {moment(this.props.event.end).add(10, 'hours').format('LLLL')}
        <br/>
        <b>Reminders:</b>
        {this.props.event.reminders.map((reminder, key) => (
            <ul key={key}>
              <li>{reminder.type} {reminder.number} {reminder.time} before</li>
            </ul>
          ))}
        {this.props.event.extraInfo ? <b>Extra Info:</b> : ''}
        <br/>
        {this.props.event.extraInfo}
      </div>
    );
  }
}

/** Require an array of StudySessions in the props. */
AppointmentForm.propTypes = {
  event: PropTypes.object.isRequired,
};

export default AppointmentForm;
