import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FormValidator from '../../helpers/FormValidator.js';

import { userActions } from '../../actions';
import { alertActions } from '../../actions';

class RegisterPage extends React.Component {
  constructor(props) {
        super(props);

        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Imię jest wymagane'
            },
            {
                field: 'name',
                method: 'isAlpha',
                args: ['pl-PL'],
                validWhen: true,
                message: 'Niedozwolone znaki'
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Imię jest za długie'
            },
            {
                field: 'surname',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nazwisko jest wymagane'
            },
            {
                field: 'surname',
                method: 'isAlpha',
                args: ['pl-PL'],
                validWhen: true,
                message: 'Niedozwolone znaki'
            },
            {
                field: 'surname',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Nazwisko jest za długie'
            },
            {
                field: 'username',
                method: 'isEmpty',
                validWhen: false,
                message: 'Login jest wymagany'
            },
            {
                field: 'username',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Login jest za długi'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email jest wymagany'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Nieprawidłowy format adresu email'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Hasło jest wymagane'
            },
            {
                field: 'password',
                method: 'isLength',
                args: [{min: 6, max: 50}],
                validWhen: true,
                message: 'Nieprawidłowa długość hasła (min 6 - max 50 znaków)'
            },
            {
                field: 'password2',
                method: 'isEmpty',
                validWhen: false,
                message: 'Hasło jest wymagane'
            },
            {
                field: 'password2',
                method: 'isLength',
                args: [{min: 6, max: 50}],
                validWhen: true,
                message: 'Nieprawidłowa długość hasła (min 6 - max 50 znaków)'
            },
            { 
                field: 'password2', 
                method: this.passwordMatch,
                validWhen: true, 
                message: 'Hasła się nie zgadzają'
            },
            { 
                field: 'checkbox', 
                method: this.checkboxValue,
                validWhen: false, 
                message: 'Musisz najpierw zaakceptować regulamin'
            }
        ]);

        this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            checkbox: false,
            validation: this.validator.valid()
        };

        this.submitted = false;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    }

    passwordMatch = (confirmation, state) => (state.password === confirmation)
    checkboxValue = (checkbox, state) => (state.checkbox === false ? true : false)

    updateInputValue(event){
      const { password2 } = this.state;
      this.setState({
        password2: event.target.value
      })
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
             [event.target.name]: event.target.value,
        });
    }

    handleCheckBoxChange(event) {
        this.setState({
             checkbox: !this.state.checkbox,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        
        if(validation.isValid) {
            var user = {
                name: this.state.name,
                surname: this.state.surname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
            const { dispatch } = this.props;
            dispatch(userActions.register(user));
        }
    }

    render() {
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

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
                      <div className={'form-group ' + validation.name.isInvalid && ' has-error'}>
                          <input type="text" className="form-control margin-top " name="name" placeholder="Imię" onChange={this.handleChange} />
                          <span style={{color: 'red'}}  className="help-block">{validation.name.message}</span>
                      </div>
                      <div className={'form-group' + validation.surname.isInvalid && ' has-error'}>
                          <input type="text" className="form-control margin-top" name="surname" placeholder="Nazwisko" onChange={this.handleChange} />
                          <span style={{color: 'red'}}  className="help-block">{validation.surname.message}</span>
                      </div>
                      <div className={'form-group ' + validation.username.isInvalid && ' has-error'}>
                          <input type="text" className="form-control margin-top" name="username" placeholder="Login" onChange={this.handleChange} />
                          <span style={{color: 'red'}}  className="help-block">{validation.username.message}</span>
                      </div>
                      <div className={'form-group has-error' + validation.email.isInvalid && ' has-error'}>
                          <input type="text" className="form-control margin-top" name="email" aria-describedby="emailHelp" placeholder="Adres E-mail"  onChange={this.handleChange} />
                          <div style={{color: 'red'}} className="help-block">{validation.email.message}</div>
                      </div>
                      <div className={'form-group' + validation.password.isInvalid && ' has-error'}>
                          <input type="password" className="form-control margin-top" name="password" placeholder="Hasło" onChange={this.handleChange} />
                          <span style={{color: 'red'}} className="help-block">{validation.password.message}</span>
                      </div>
                      <div className={'form-group' + validation.password2.isInvalid && ' has-error'}>
                          <input type="password" className="form-control margin-top" name="password2" placeholder="Powtórz Hasło" onChange={this.updateInputValue} />
                          <span style={{color: 'red'}}  className="help-block">{validation.password2.message}</span>
                      </div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" checked={this.state.checkbox} id="regulamin-check" name="checkbox" onChange={this.handleCheckBoxChange}/>
                        <label className="form-check-label regulamin" for="regulamin-check" >Zapoznałem się z <a href="#">regulaminem</a> serwisu</label>
                      </div>
                      <span style={{color: 'red'}}  className="help-block">{validation.checkbox.message}</span>
                      <div className="form-group">
                          <button className="btn btn-secondary">Zarejestruj się</button>
                          {registering &&
                              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
    const { registering } = state.registration;
    const { alert } = state;
    return {
        registering,
        alert
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
