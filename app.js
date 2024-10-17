class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isSignedIn: false,
        isSigningUp: false,
        username: '',
        dob: '',
        password: '',
        confirmPassword: '',
        location: '',
        savedCredentials: null,
      };
    }
  
    componentDidMount() {
      const savedCredentials = JSON.parse(localStorage.getItem('user'));
      if (savedCredentials) {
        this.setState({ savedCredentials });
      }
    }
  
    handleSignUp = (e) => {
      e.preventDefault();
      const { username, dob, password, confirmPassword } = this.state;
  
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
  
      localStorage.setItem('user', JSON.stringify({ username, dob, password }));
      this.setState({ isSigningUp: false, isSignedIn: true });
    };
  
    handleSignIn = (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      const savedCredentials = JSON.parse(localStorage.getItem('user'));
      if (savedCredentials && savedCredentials.username === username && savedCredentials.password === password) {
        this.setState({ isSignedIn: true });
      } else {
        alert('Incorrect username or password');
      }
    };
  
    handleLocationSubmit = (e) => {
      e.preventDefault();
      alert(`Fetching weather and humidity data for ${this.state.location}`);
    };
  
    render() {
      const { isSignedIn, isSigningUp } = this.state;
  
      if (!isSignedIn) {
        if (!isSigningUp) {
          return (
            <div className="container">
              <h2>Sign In - Passionate Engine</h2>
              <form onSubmit={this.handleSignIn}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </form>
              <button
                className="btn btn-link"
                onClick={() => this.setState({ isSigningUp: true })}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          );
        } else {
          return (
            <div className="container">
              <h2>Sign Up - Passionate Engine</h2>
              <form onSubmit={this.handleSignUp}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  required
                />
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                  onChange={(e) => this.setState({ dob: e.target.value })}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
              <button
                className="btn btn-link"
                onClick={() => this.setState({ isSigningUp: false })}
              >
                Already have an account? Sign In
              </button>
            </div>
          );
        }
      }
  
      return (
        <div className="container">
          <h2>Welcome, {this.state.username}</h2>
          <form onSubmit={this.handleLocationSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter location"
              onChange={(e) => this.setState({ location: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-success">
              Get Weather and Humidity Data
            </button>
          </form>
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));
  