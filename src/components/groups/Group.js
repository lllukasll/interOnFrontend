import React from 'react';
import { groupActions } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';

class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };

  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.dispatch(groupActions.getGroup(this.props.id));
    this.setState({isLoading:false});
  }

  render() {
    const { groups } = this.props;
    const { isLoading } = this.state;

    if(isLoading) {
      return <p>Loading ...</p>;
    }

    return (

      <section className="container">
        <div className="row ">

          <SideBar />
          <div class="col-md-9 content profile-changes">
          {groups.loadingGroup ? (<em>Ładowanie grupy <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </em>) : (
            <div >
              <div class="row">
                <div class="col-md-12">
                  <h1>{groups.group.name}</h1>
                  <p id="group-name">Kategorie: {groups.group.subcategories}</p>
                  <hr />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 ">
                  <img src="/images/ogorkowa.jpg" alt="img"  class="group-photo" />
                </div>
                <div class="col-md-7 ">
                  <div class="row">
                    <div class="col-md-12 members-a ">
                      <p> {groups.group.description}</p>
                      <span class="members" id="modalBtn"> Liczba członków: 123 </span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <span><a href="#" id="email">administrator</a></span>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row" >
                <div class="col-md-5 offset-md-7 ">
                  <div class="btn-group dropright">
                    <button type="button" class="btn btn-secondary dropdown-toggle" id="dropRightEvents" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Wydarzenia Grupy
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Zobacz istniejące wydarzenia</a>
                      <a class="dropdown-item" href="#">Utwórz nowe wydarzenie</a>
                    </div>
                  </div>
                  <div class="btn-group dropright">
                    <button type="button" class="btn btn-secondary dropdown-toggle" id="dropRightExit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-sign-out-alt"></i>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Opuść grupę</a>
                    </div>
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
    const { groups } = state;
    return {
        groups,
        id: ownProps.match.params.id
    };
}

const connectedGroup = connect(mapStateToProps)(Group);
export { connectedGroup as Group };
