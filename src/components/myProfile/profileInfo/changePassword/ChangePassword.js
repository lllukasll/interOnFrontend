import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../../../common/sideBar/SideBar';
import { userActions } from '../../../../actions';
import { alertActions } from '../../../../actions';

class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
        dataStructure: {
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
        },
        submitted: false,
        error: '',
        isLoading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      const { dispatch } = this.props;
      dispatch(alertActions.clear());
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { dataStructure } = this.state;
    this.setState({
         dataStructure: {
            ...dataStructure,
            [name]: value
        }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    this.setState({ error: ""})
    const { dataStructure } = this.state;
    const { dispatch } = this.props;

    if (dataStructure.oldPassword && dataStructure.newPassword && dataStructure.newPassword2 && dataStructure.newPassword === dataStructure.newPassword2) {
        dispatch(userActions.changePassword(dataStructure));
    }

    if(dataStructure.newPassword !== dataStructure.newPassword2) {
        //this.setState({ error: "Hasła nie są takie same"})
        dispatch(alertActions.error("Hasła nie są takie same"));
    }
  }

  render() {
    const { alert, changePassword } = this.props;
    const { dataStructure, submitted } = this.state;

    return (
        <section className="container margin-top main">
            <div className="row ">
                <SideBar />
                <div className="col-md-9 content profile-changes">
                    <h1> Zmień Hasło </h1>
                    <hr />
                    <div className="row profile-changes">
                        <div className="col-md-8 offset-md-2 ">
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !dataStructure.oldPassword ? ' has-error' : '')}>
                                <input type="password" class="form-control" name="oldPassword" onChange={this.handleChange} placeholder="Stare Hasło" />
                                {submitted && !dataStructure.oldPassword &&
                                    <div className="help-block">Stare hasło jest wymagane</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !dataStructure.newPassword ? ' has-error' : '')}>
                                <input type="password" class="form-control" name="newPassword" onChange={this.handleChange} placeholder="Nowe Hasło" />
                                {submitted && !dataStructure.newPassword &&
                                    <div className="help-block">Nowe Hasło jest wymagane</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !dataStructure.newPassword2 ? ' has-error' : '')}>
                                <input type="password" class="form-control" name="newPassword2" onChange={this.handleChange} placeholder="Powtórz Hasło" />
                                {submitted && !dataStructure.newPassword2 &&
                                    <div className="help-block">Powtórz Hasło jest wymagane</div>
                                }
                            </div>
                        <button type="submit" class="btn btn-secondary">Zapisz</button>
                        {changePassword.loadingChangePassword &&
                              <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        {alert.message &&
                              <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

function mapStateToProps(state) {
    const { alert, changePassword } = state;
    return {
        alert,
        changePassword
    };
}

const connectedChangePassword = connect(mapStateToProps)(ChangePassword);
export { connectedChangePassword as ChangePassword };



