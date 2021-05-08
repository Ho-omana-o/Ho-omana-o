import React from 'react';
import { Header } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px' };
    return (
        <footer style={{ marginBottom: '10px', backgroundColor: '#1a2626' }}>
          <div style={divStyle} className="ui center aligned container">
            <Header as='h4' style={{ backgroundColor: '#1a2626', color: 'white',
                marginBottom: '50px' }}>
              ICS 464 Human-Computer Interaction I
              <br/>
              Team 2 Project
            </Header>
          </div>
        </footer>
    );
  }
}

export default Footer;
