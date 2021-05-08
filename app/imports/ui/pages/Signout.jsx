import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <Grid className="signup-background" centered fluid>
           <Header textAlign="center" as={'h1'} style={{
        paddingTop: '100px', fontSize: '50px', backgroundColor: '#F8F8FF' }}>
        You are signed out.
           </Header>
        </Grid>
    );
  }
}
