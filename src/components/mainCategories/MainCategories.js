import React from 'react';
import { mainCategoryActions } from '../../actions';
import { connect } from 'react-redux';

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

      <div>
        {mainCategories.loading ? (<em>Loading categories...</em>) : (
          <div>
          {mainCategories &&
            <ul>
              {mainCategories.category.map((cat, index) =>
                <li key={index}>{cat.name}</li>
              )}
            </ul>
          }
          </div>
        )}
      </div>

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
