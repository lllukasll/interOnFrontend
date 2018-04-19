import React from 'react';
import { subCategoryActions } from '../../actions';
import { connect } from 'react-redux';
import SideBar from '../common/sideBar/SideBar';
class SubCategories extends React.Component {


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
    this.props.dispatch(subCategoryActions.getAllForId(this.props.id));
    this.setState({isLoading:false});
    console.log(this.props);
  }

  render() {
    const { subCategories } = this.props;
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
                <h1>Pod-Kategorie Zainteresowań</h1>
              </div>
            </div>

            <div class="row">
              <div class="col-md-10 offset-md-1 content" >
                {subCategories.loading ? (<em>Ładowanie kategorii <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </em>) : (
                  <div class="col-md-4">
                  {subCategories &&
                    <div>
                      {subCategories.category.map((cat, index) =>
                        <div key={index}>{cat.name}</div>
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

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
    const { subCategories } = state;
    return {
        subCategories,
        id: ownProps.match.params.id
    };
}

const connectedSubCategories = connect(mapStateToProps)(SubCategories);
export { connectedSubCategories as SubCategories };
