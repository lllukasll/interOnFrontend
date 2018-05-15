import React from 'react';
import Sidebar from '../../common/sideBar/SideBar.js'
import { subCategoryActions } from '../../../actions'
import { connect } from 'react-redux';
import MultiSelect from "@kenshooui/react-multi-select";

class CreateEventPage extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            items: [],
            selectedItems: [],
            selectedItemsIds: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(subCategoryActions.getAll());
    }

    handleChange(selectedItems) {
        var selectedItemsIds = [];
        selectedItems.forEach((item) => {
            selectedItemsIds.push(item.id)
        });
        this.setState({ selectedItems: selectedItems, selectedItemsIds: selectedItemsIds });
    }

    renderSpiner(){
        return(
            <div className="spinner-field"><img alt="loading" src="/images/spinner2.gif" /></div>
        );
    }

    renderContent(event){
        return(
            <div></div>
        );
    }

    render(){
        const { events, subCategories } = this.props;
        const { items, selectedItems } = this.state;

        const messages = {
            searchPlaceholder: "Wyszukaj...",
            noItemsMessage: "Brak kategorii...",
            noneSelectedMessage: "Nie wybrano kategorii",
            selectedMessage: "wybrane",
            selectAllMessage: "Wybierz wszystkie",
            clearAllMessage: "Usuń wszyskie",
            disabledItemsTooltip: "Mozesz wybrać tylko jedną kategorię"
        }

        return(
            <section className="container margin-top main">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-9 content profile-changes ">
                        <h1> Utwórz nowe wydarzenie </h1>
                        <hr />
                        <div className="row profile-changes">
                            <div className="col-md-5 ">
                                <img src="/images/mecz.jpg" className="new-group-img" />
                                <div className="margin-top">
                                    <form>
                                    <label for="file" className="file-label">
                                    <i className="fas fa-upload"></i>
                                    <span id="file-span">  Wybierz Zdjęcie z Dysku </span>
                                    </label>
                                        <input type="file" id="file"/>

                                    </form>
                                </div>
                            </div>
                            <div className="col-md-7 ">
                                <form>
                                <input type="text" className="form-control margin-top " placeholder="Nazwa Wydarzenia" />
                                <div className="margin-top">

                                {subCategories && subCategories.loadingAll ? 
                                    (<MultiSelect
                                        loading={true}
                                    />) : 
                                    (<MultiSelect
                                        items={subCategories.categories}
                                        selectedItems={selectedItems}
                                        onChange={this.handleChange}
                                        messages={messages}
                                        height={300}
                                    />)}
                                    
                                </div>
                                <textarea className="form-control margin-top" rows="3" placeholder="Sczegóły Wydarzenia"></textarea>
                                <input type="text" className="form-control margin-top " placeholder="Data Wydarzenia" />
                                <input type="text" className="form-control margin-top " placeholder="Miejsce Wydarzenia" />
                                </form>
                                    <button type="button" className="btn btn-secondary f-right ">Utwórz grupę</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { subCategories } = state;
    return {
        subCategories
    };
}

export default connect(mapStateToProps)(CreateEventPage);

