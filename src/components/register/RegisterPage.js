import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { alertActions } from '../../actions';

class RegisterPage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                surname: '',
                username: '',
                email: '',
                password: ''
            },
            password2: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(event){
      const { password2 } = this.state;
      this.setState({
        password2: event.target.value
      })
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, password2 } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.surname && user.username && user.email && user.password && user.password == password2) {
            dispatch(userActions.register(user));
        }

        if(user.password != password2) {
          dispatch(alertActions.error("Hasła nie są takie same"))
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, password2 } = this.state;
        const { alert } = this.props;

        return (
            <section className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2 content forms" >
                  <div className="row forms">
                    <form className="margins-form" name="form" onSubmit={this.handleSubmit}>
                      <h3> Dołącz do inter-on </h3>
                      <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                          <input type="text" className="form-control margin-top" name="name" placeholder="Imię" value={user.name} onChange={this.handleChange} />
                          {submitted && !user.name &&
                              <div className="help-block">Imię jest wymagane</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.surname ? ' has-error' : '')}>
                          <input type="text" className="form-control margin-top" name="surname" placeholder="Nazwisko" value={user.surname} onChange={this.handleChange} />
                          {submitted && !user.surname &&
                              <div className="help-block">Nazwisko</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                          <input type="text" className="form-control margin-top" name="username" placeholder="Login" value={user.username} onChange={this.handleChange} />
                          {submitted && !user.username &&
                              <div className="help-block">Login jest wymagany</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                          <input type="text" className="form-control margin-top" name="email" aria-describedby="emailHelp" placeholder="Adres E-mail" value={user.email} onChange={this.handleChange} />
                          {submitted && !user.email &&
                              <div className="help-block">Email jest wymagany</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                          <input type="password" className="form-control margin-top" name="password" placeholder="Hasło" value={user.password} onChange={this.handleChange} />
                          {submitted && !user.password &&
                              <div className="help-block">Hasło jest wymagane</div>
                          }
                      </div>
                      <div className={'form-group' + (submitted && !password2 ? ' has-error' : '')}>
                          <input type="password" className="form-control margin-top" name="password2" placeholder="Powtórz Hasło" value={password2} onChange={this.updateInputValue} />
                          {submitted && !password2 &&
                              <div className="help-block">Hasło jest wymagane</div>
                          }
                      </div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="regulamin-check" />
                        <label className="form-check-label regulamin" for="regulamin-check">Zapoznałem się z <a href="#">regulaminem</a> serwisu</label>

                      </div>
                      <div className="form-group">
                          <button className="btn btn-secondary">Zarejestruj się</button>
                          {registering &&
                              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                          }
                          {alert.message &&
                              <div className={`alert ${alert.type}`}>{alert.message}</div>
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
    const { registering } = state.registration;
    const { alert } = state;
    return {
        registering,
        alert
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
