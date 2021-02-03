import React from 'react';

class Header extends React.Component {

  render() {

    return (
      <div className='header'>
        <h4>{this.props.user}</h4>
      </div>
    )
  }
};

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <p>Hello {this.props.user}</p>
        <p>Thanks for coming back</p>
      </div>
    )
  }
};

function withUser(Component) {
  return class extends React.Component {
    render() {
      return <Component {...this.props} />
    }
  }
}

const WelcomeWithUser = withUser(Welcome);
const HeaderWithUser = withUser(Header);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Dan Abramov'
    };
  };

  render() {
    
    return (
      <div className=''>
        <HeaderWithUser user={this.state.user} />
        <WelcomeWithUser user={this.state.user} />
      </div>
    )
  }
};

export default App;