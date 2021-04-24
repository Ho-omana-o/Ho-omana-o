import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
        <Menu style={{ marginBottom: '10px', backgroundColor: '#1a2626' }} attached="top" borderless>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h1' style={{ backgroundColor: '#1a2626', color: 'white' }}>
            HO&apos;OMANA&apos;O
          </Header>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/calendar" key='calendar'>
              <h4 style={{ backgroundColor: '#1a2626', color: 'white' }}>Calendar</h4>
            </Menu.Item>]
        ) : ''}
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/calendar" key='calendar'>Calendar</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/help" key='help'>Help</Menu.Item>]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
              <Dropdown text="Login " pointing="top right" icon={'user'}
                        style={{ backgroundColor: '#1a2626', color: 'white' }}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/login"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                  <Dropdown.Item icon="address card outline" text="Settings" as={NavLink} exact to="/accountsettings"/>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
