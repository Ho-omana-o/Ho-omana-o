import React from 'react';
import { Form, Button, Container, Header, Grid } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
/** Renders the Page for editing a single document. */
class AccountSettings extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid className="account-settings-bg" centered fluid>
          <Grid.Row className='grid-row' style={{ marginTop: '50px' }}>
            <Grid.Column>
              <Form style={{ backgroundColor: 'white', padding: '30px' }}>
                <Header as="h2" textAlign="center">Account Settings</Header>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name'/>
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name'/>
                </Form.Field>
                <Form.Field>
                  <label>Email Address</label>
                  <input placeholder='Email Address'/>
                </Form.Field>
                <Form.Field>
                  <label>Phone Number</label>
                  <input placeholder='Phone Number'/>
                </Form.Field>
                <Button type='submit'>Save Changes</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default AccountSettings;
