import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../../common/sideBar/SideBar';
import { mainCategoryActions } from '../../../actions'

class CreateMainCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      mainCategory: {
          name: ''
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { mainCategory } = this.state;
    this.setState({
        mainCategory: {
            ...mainCategory,
            [name]: value
        }
    });
}

handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { mainCategory } = this.state;
    const { dispatch } = this.props;
    if (mainCategory.name) {
        dispatch(mainCategoryActions.createMainCategory(mainCategory));
    }
}

  render() {
    const { mainCategory, submitted } = this.state;
    const { mainCategories } = this.props;

    return (
    <section className="container margin-top main">
	    <div className="row ">

            <SideBar />

            <div className="col-md-9 content profile-changes ">
                <h1> Utwórz podkategorie </h1>
                <hr />
                    <div className="row profile-changes">
                        <div className="col-md-5 ">
                            <img alt="desery" src="/images/desery.jpg" />
                            <div className="margin-top">
                                <form>
                                    <label for="file">
                                        <input type="file"/>
                                    </label>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-7 ">
                            <div>
                                <form name="form" onSubmit={this.handleSubmit}>
                                     <div className={'form-group' + (submitted && !mainCategory.name ? ' has-error' : '')}>
                                        <input type="text" className="form-control margin-top " name="name" value={mainCategory.name} onChange={this.handleChange} placeholder="Nazwa" />
                                        {submitted && !mainCategory.name &&
                                            <div className="help-block">Nazwa jest wymagane</div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-secondary f-right ">Utwórz grupę</button>
                                    {mainCategories.creating &&
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
	    </div>
    </section>
    );
  }
}


function mapStateToProps(state) {
    const { mainCategories, alert } = state;
    return {
        mainCategories,
        alert
    };
}

const connectedCreateMainCategory= connect(mapStateToProps)(CreateMainCategory);
export { connectedCreateMainCategory as CreateMainCategory };
