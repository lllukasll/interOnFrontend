import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

import './LoginPage.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if(username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
        const { alert } = this.props;
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        
        return (
          <section className="container fill-screen main">
            <div className="row">
              <div className="col-md-6 offset-md-2 content margin-login " >
                <div className="row forms ">
                  <form className="margins-form" name="form" onSubmit={this.handleSubmit}>
                    <h3> Zaloguj się w inter-on </h3>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <input type="text" className="form-control margin-top" aria-describedby="emailHelp" placeholder="Login" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div style={{color: 'red'}} className="help-block">Login jest wymagany</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control margin-top" aria-describedby="emailHelp" placeholder="Hasło" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div style={{color: 'red'}} className="help-block">Hasło jest wymagane</div>
                        }
                    </div>
                    <small id="emailHelp" className="form-text text-muted">Zapomniałem Hasła</small>
                    <div className="form-group">
                        <button className="btn btn-secondary">Zaloguj się</button>
                        {loggingIn &&
                            <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }

                        {alert.message &&
                            <div style={{marginTop: '10px'}} className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                    </div>
                  </form>
                </div>
            </div>
          </div>
        </section>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { alert } = state;
    return {
        loggingIn,
        alert
    };
}


const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
