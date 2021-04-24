import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

/**
 * Login page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Login extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Login submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the Login form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <Grid className="taro-background" centered fluid>
          <Grid.Row className="grid-row" verticalAlign="middle" stretched columns={1}>
            <Grid.Column>
              <Header as="h1" block textAlign="center" style={ { fontSize: '2.5rem' } } >
                Login to your account
              </Header>
              <Segment attached>
                <Form className="fluid" onSubmit={this.submit}>
                  <Form.Input
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    type="email"
                    placeholder="Example@email.com"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.Button content="Login"/>
                </Form>
              </Segment>
              <Message attached="bottom">
                <Link to="/signup">Click here to Register</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                    error
                    header="Login was not successful"
                    content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Login.propTypes = {
  location: PropTypes.object,
};
