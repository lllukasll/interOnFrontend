import React from 'react';
import { groupActions } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from '../common/sideBar/SideBar';
import { mainCategoryActions } from '../../actions';

class CreateGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      group: {
        name: '',
        description: '',
        subcategories: []
      },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.dispatch(mainCategoryActions.getAll());
    this.setState({isLoading:false});
  }

  handleChange(event) {
      const { name, value } = event.target;
      const { group } = this.state;
      this.setState({
          group: {
              ...group,
              [name]: value
          }
      });
  }

  updateInputValue(event){
    const { group } = this.state;
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      group: {
        subcategories: value
      }
    })
  }

  handleSubmit(event) {
      event.preventDefault();

      this.setState({ submitted: true });
      const { group } = this.state;
      const { dispatch } = this.props;
      console.log(group.subcategories);
      if (group.name && group.description && group.subcategories) {
          dispatch(groupActions.createGroup(group));
      }
  }

  render() {
    const { isLoading } = this.state;
    const { mainCategories } = this.props;
    const { groups  } = this.props;
    const { group, submitted } = this.state;
    const { alert } = this.props;

    if(isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <section class="container margin-top main">
	<div class="row ">

		<SideBar />

		<div class="col-md-9 content profile-changes ">
			<h1> Utwórz nową grupę </h1>
			<hr />
			<div class="row profile-changes">
				<div class="col-md-5 ">
					<img src="/images/ogorkowa.jpg" class="new-group-img" />
					<div class="margin-top">
						<form>
							<label for="file" class="file-label">
							<i class="fas fa-upload"></i>
							<span id="file-span">  Wybierz Zdjęcie z Dysku </span>
							</label>
							<input type="file" id="file"/>
						</form>
					</div>
				</div>

			 <div class="col-md-7 ">
       {mainCategories.loading ? (<em>Ładowanie kategorii <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
       </em>) : (
         <div>
				<form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !group.name ? ' has-error' : '')}>
            <input type="text" class="form-control margin-top " name="name" value={group.name} onChange={this.handleChange} placeholder="Nazwa" />
            {submitted && !group.name &&
                <div className="help-block">Nazwa jest wymagana</div>
            }
          </div>
            {mainCategories &&
              <div className={'form-group' + (submitted && !group.subcategories ? ' has-error' : '')}>
                <select class="custom-select margin-top" name="subcategories" value={group.subcategories} onChange={this.updateInputValue} multiple>
                  {mainCategories.category.map((cat, index) =>
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  )}
                </select>
                {submitted && !group.subcategories &&
                    <div className="help-block">Nazwa jest wymagana</div>
                }
              </div>
            }
          <div className={'form-group' + (submitted && !group.description ? ' has-error' : '')}>
            <textarea class="form-control margin-top" rows="3" name="description" value={group.description} onChange={this.handleChange} placeholder="Opis"></textarea>
            {submitted && !group.description &&
                <div className="help-block">Opis jest wymagany</div>
            }
          </div>
          <button class="btn btn-secondary f-right ">Utwórz grupę</button>
          {groups.creating &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
        </form>

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

CreateGroup.propTypes = {
  group: PropTypes.shape({
    subcategories: PropTypes.arrayOf(PropTypes.number)
  })
}

function mapStateToProps(state) {
    const { mainCategories } = state;
    const { groups } = state;
    const { alert } = state;
    return {
        mainCategories,
        groups,
        alert
    };
}

const connectedCreateGroup = connect(mapStateToProps)(CreateGroup);
export { connectedCreateGroup as CreateGroup };
