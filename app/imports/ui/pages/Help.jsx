import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
/** import HelpPage from 'app/public/images/HelpPage.png';
<img className="ui centered large image" src={HelpPage} alt={' '}/> */
/** Renders the Calendar page. */
class Help extends React.Component {

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    render() {
        return (
            <div className="helppage-background" style={{ backgroundRepeat: 'repeat-y' }}>
                <Grid container centered className="main-content" textAlign={'center'}>
                    <Grid.Row>
                        <Header as="h1" textAlign="center"><br/>Help Page</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <Grid.Row>
                                <div className="ui segment">
                                    <Header as="h2" textAlign="left"> How to make an appointment reminder </Header>
                                    <p style={{ fontSize: '16px' }}> Head over to your <b>calendar</b> page.</p>
                                    <img className="ui centered large image" src="../images/click.png" alt={' '}/>
                                    <br/>
                                    <p style={{ fontSize: '16px' }}>You can click on the date which
                                        your appointment is scheduled.<br/>You can click on the <b>add</b> button under
                                        the <b>Upcoming Appointments</b> on the right side of your screen.</p>
                                </div>
                                <div className="ui segment">
                                    <Header as="h2" textAlign="left"> How to edit an appointment reminder </Header>
                                    <p style={{ fontSize: '16px' }}>  Head over to your <b>calendar</b> page.</p>
                                    <img className="ui centered large image" src="../images/click.png" alt={' '}/>
                                    <br/>
                                    <p style={{ fontSize: '16px' }}> Under the <b>Upcoming Appointments</b> on the right
                                        side of your screen.<br/>
                                        Click the <b>Edit</b> button under the appointment you want to edit.</p>
                                    <img className="ui centered image" src="../images/edit.png" alt={' '}/><br/>
                                    <p style={{ fontSize: '16px' }}> Once you are done, click the <b>Edit</b> button at
                                        the bottom to finalize your changes.</p>
                                    <img className="ui centered image" src="../images/finedit.png" alt={' '}/>
                                </div>
                                <div className="ui segment">
                                    <Header as="h2" textAlign="left"> How to remove an appointment reminder </Header>
                                    <p style={{ fontSize: '16px' }}> Head over to your <b>calendar</b> page.</p>
                                    <img className="ui centered large image" src="../images/click.png" alt={' '}/>
                                    <br/>
                                    <p style={{ fontSize: '16px' }}> Under the <b>Upcoming Appointments</b> on the right
                                        side of your screen.<br/>
                                        Click the <b>Delete</b> button under the appointment you want to remove.</p>
                                    <img className="ui centered image" src="../images/delete.png" alt={' '}/>
                                </div>
                                <div className="ui segment">
                                    <Header as="h2" textAlign="left"> How to view your settings </Header>
                                    <p style={{ fontSize: '16px' }}>You can find your profile settings by clicking on
                                        your email on the top right corner and clicking the <b>Settings</b> option.</p>
                                    <img className="ui centered large image" src="../images/Settings.png" alt={' '}/>
                                    <p style={{ fontSize: '16px' }}> In your settings you can change: </p>
                                    <div className="ui bulleted list">
                                        <div className="item" style={{ fontSize: '16px' }}> your name</div>
                                        <div className="item" style={{ fontSize: '16px' }}> your email</div>
                                        <div className="item" style={{ fontSize: '16px' }}> your phone number</div>
                                    </div>
                                    <p style={{ fontSize: '16px' }}> Once you are doing changing your account settings,
                                        click the <b>Save Changes</b> button to finalize your changes.</p>
                                    <img className="ui centered image" src="../images/changesets.png" alt={' '}/>
                                </div>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Help;
