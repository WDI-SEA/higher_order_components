import React from 'react';

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
        <Header />
        <Welcome />
      </div>
    )
  }
};

export default App;

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <h4>User</h4>
      </div>
    )
  }
};

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <p>Hello User</p>
        <p>Thanks for coming back</p>
      </div>
    )
  }
};

function withUser(WrappedComponent) {
  return class WrappedComponent extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
};

const HeaderWithUser = withUser(Header)