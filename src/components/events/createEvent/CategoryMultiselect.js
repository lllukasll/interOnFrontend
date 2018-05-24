import React from 'react';
import MultiSelect from "@kenshooui/react-multi-select";


class CategoryMultiselect extends React.Component {
    render(){
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
            <div className="margin-top">

            {this.props.subcategories && this.props.subcategories.loadingAll ? 
                (<MultiSelect
                    loading={true}
                />) : 
                (<MultiSelect
                    items={this.props.subcategories.categories}
                    selectedItems={this.props.selectedItems}
                    onChange={this.props.handleCategoryChange}
                    messages={messages}
                    height={400}
                />)}
                
            </div>
        );
    }
}

export default CategoryMultiselect;

