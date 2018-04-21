import React from 'react';
import { mainCategoryActions } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';
import { config } from '../../helpers';

class MainCategories extends React.Component {


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
    this.props.dispatch(mainCategoryActions.getAll());
    this.setState({isLoading:false});
    console.log(this.props);
  }

  render() {
    const { mainCategories } = this.props;
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
                <h1>Kategorie Zainteresowań</h1>
              </div>
            </div>

            <div class="row">
              <div class="col-md-10 offset-md-1 content" >
                {mainCategories.loading ? (<em>Ładowanie kategorii <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </em>) : (
                  <div class="col-md-4">
                  {mainCategories &&
                    <div>
                      {mainCategories.category.map((cat, index) =>
                        <div key={index}><Link to={`/subCategories/${cat.id}`} className="col-md-4"><img src={config.apiUrl + "/api/photo/" + cat.avatarUrl} class="image-responsive img-margin" alt={cat.name} /></Link></div>
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
    const { mainCategories } = state;
    return {
        mainCategories
    };
}

const connectedMainCategories = connect(mapStateToProps)(MainCategories);
export { connectedMainCategories as MainCategories };
