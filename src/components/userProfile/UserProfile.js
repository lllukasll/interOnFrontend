import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../common/sideBar/SideBar';
import { userActions } from '../../actions';

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

    componentDidMount() {
        this.setState({isLoading: true});
        this.props.dispatch(userActions.getUser(this.props.id));
        this.setState({isLoading:false});
    }

    render() {
    const { user } = this.props;
    const { isLoading } = this.state;

    if(isLoading) {
      return <p>Loading ...</p>;
    }

    return (
        <section className="container">
            <div className="row ">
                <SideBar />
                    <div className="col-md-9 content profile-changes">
                        {user.loading ? (<em>Ładowanie profilu <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        </em>) : 
                        (
                            <div className="row profile-changes">
                                <div className="col-md-4">
                                <img alt="avatar" src="/images/profilePhoto.jpg" className="profile-photo" />
                            </div>
                            <div className="col-md-8 ">
                                <div className="row">
                                    <div className="col-md-12 name  ">
                                        <p id="name">{user.userData && user.userData.name} {user.userData && user.userData.surname}</p>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <span>adres e-mail: {user.userData && user.userData.email}</span>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="button" className="btn btn-secondary  profile-buttons">Wyślij Wiadomość</button>
                                        <button type="button" className="btn btn-secondary profile-buttons">Dodaj Do Znajomych</button>
                                        <button type="button" className="btn btn-secondary profile-buttons">Usuń Ze Znajomych</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
            </div>
        </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
    const { user } = state;
    return {
        user,
        id: ownProps.match.params.id
    };
}

const connectedUserProfile = connect(mapStateToProps)(UserProfile);
export { connectedUserProfile as UserProfile };