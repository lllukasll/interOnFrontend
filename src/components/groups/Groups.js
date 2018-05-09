import React from 'react';
import { groupActions } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';
import { config } from '../../helpers';

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      categoriesPerPage: 12,
      category: [],
      isLoading: true
    };
    this.changePage = this.changePage.bind(this);

  }

  changePage(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.dispatch(groupActions.getAll());
    this.setState({isLoading:false});
    console.log(this.props);
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

          <div class="col-md-10 ">
            <div class="row">
              <div class="col-md-10 offset-md-1  header ">
                <h1>Grupy</h1>
              </div>
            </div>

            <div class="row">
              <div class="col-md-10 offset-md-1 content" >
                {groups.loading ? (<em>Ładowanie grup <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </em>) : (
                  <div>
                  {groups &&
                    <div>
                      {groups.groups.map((group, index) =>
                        <div class="col-md-10 offset-md-1  group-content " key={index}>
                          <div class= "row">
                              <div class="col-md-4">
                                <img src={config.apiUrl + "/api/photo/" + group.groupPhoto} alt="img" class="image-responsive group-image img-margin" />
                              </div>
                            <div class="col-md-6 offset-md-1 group-description" >
                             <h3> {group.name}</h3>
                             <p>{group.description}</p>
                                <Link to={`/group/${group.id}`} class="btn btn-secondary details-btn"> Szczegóły </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                  </div>

                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
    const { groups } = state;
    return {
        groups
    };
}

const connectedGroups = connect(mapStateToProps)(Groups);
export { connectedGroups as Groups };
