import React from 'react';
import Sidebar from '../../common/sideBar/SideBar.js'
import { subCategoryActions, eventActions } from '../../../actions'
import { connect } from 'react-redux';
import MultiSelect from "@kenshooui/react-multi-select";
import MapContainer from '../../map/MapContainer';
import { LocationSearchInput } from '../../map/LocationSearchInput';
import Modal from 'react-responsive-modal';
import Dropzone from 'react-dropzone'
import FormValidator from '../../../helpers/FormValidator.js';

import DatePicker from './DatePicker';
import CategoryMultiselect from './CategoryMultiselect'
import UploadPhoto from './UploadPhoto'


class CreateEventPage extends React.Component {
    constructor(props){
        super(props);

        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Nazwa jest wymagana'
            },
            {
                field: 'name',
                method: 'isLength',
                args: [{min: 0, max: 50}],
                validWhen: true,
                message: 'Nazwa jest za długia (max 50 znaków)'
            },
            {
                field: 'description',
                method: 'isEmpty',
                validWhen: false,
                message: 'Opis jest wymagany'
            },
            {
                field: 'description',
                method: 'isLength',
                args: [{min: 0, max: 250}],
                validWhen: true,
                message: 'Opis jest za długi (max 250 znaków)'
            },
            {
                field: 'fileChoosen',
                method: this.checkIfPhotoUploaded,
                validWhen: false,
                message: 'Zdjęcie jest wymagane'
            },
            {
                field: 'dateChoosen',
                method: this.checkIfDateChoosen,
                validWhen: false,
                message: 'Data jest wymagana'
            },
            {
                field: 'categoryChoosen',
                method: this.checkIfCategoryChoosen,
                validWhen: false,
                message: 'Musisz wybrać kategorię'
            }
        ]);

        this.state ={
            name: '',
            description: '',
            //category
            items: [],
            selectedItems: [],
            selectedItemsIds: [],
            categoryChoosen: false,
            //date
            dateChoosen: false,
            selectedDay: null,
            //map
            addressSelected: false,
            openMap: false,
            lng: '',
            lat: '',
            //photo
            file: '',
            imagePreviewUrl: '',
            fileChoosen: false,

            validation: this.validator.valid()
        };

        this.submitted = false;

        this.setLngAndLat = this.setLngAndLat.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    checkIfPhotoUploaded = (fileChoosen, state) => (state.fileChoosen === false ? true : false)
    checkIfCategoryChoosen = (categoryChoosen, state) => (state.categoryChoosen === false ? true : false)
    checkIfDateChoosen = (dateChoosen, state) => (state.dateChoosen === false ? true : false)
    checkIfAddressChoosen = (addressSelected, state) => (state.addressSelected === false ? true : false)

    onOpenMap = () => { this.setState({ openMap: true }) };

    onCloseMap = () => { this.setState({ openMap: false }) };

    componentDidMount(){ this.props.dispatch(subCategoryActions.getAll()) }

    handleCategoryChange(selectedItems) {
        var selectedItemsIds = [];
        selectedItems.forEach((item) => {
            selectedItemsIds.push(item.id)
        });
        this.setState({ selectedItems: selectedItems, selectedItemsIds: selectedItemsIds, categoryChoosen: true });
    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file && file.type.match('image.*'))
        {
            reader.onloadend = () => {
            this.setState({
            file: file,
            imagePreviewUrl: reader.result,
            fileChoosen: true
        });
        }
        reader.readAsDataURL(file)
        }else{
        this.setState({
            file: '',
            imagePreviewUrl: '',
            fileChoosen: false,
        })
        }
        
    }

    handleInputChange(event) {
      event.preventDefault();

      this.setState({
            [event.target.name]: event.target.value,
      });
    }

    handleDayClick(day, { selected }) {
        this.setState({
            dateChoosen: true,
            selectedDay: selected ? undefined : day,
        });
    }

    renderSpiner(){
        return(
            <div className="spinner-field"><img alt="loading" src="/images/spinner2.gif" /></div>
        );
    }

    setLngAndLat(lng, lat){
        this.setState({
            addressSelected: true,
            lng: lng,
            lat: lat
        })
    }

    handleSubmit(event) {
      event.preventDefault();

      const validation = this.validator.validate(this.state);
      this.setState({ validation });
      this.submitted = true;

      if(validation.isValid) {
        var event = {
          name: this.state.name,
          description: this.state.description,
          subcategories: this.state.selectedItemsIds,
          dateTimeEvent: this.state.selectedDay,
          address: {
              longitude : this.state.lng,
              latitude : this.state.lat 
          }
        }

        const { dispatch } = this.props;
        dispatch(eventActions.createEvent(event));
      }
  }

    render(){
        let validation = this.submitted ?
                            this.validator.validate(this.state) :
                            this.state.validation

        const { events, subCategories } = this.props;
        const { items, selectedItems, openMap, imagePreviewUrl } = this.state;

        return(
            <section className="container margin-top main">
                <div className="row">
                    <Sidebar />
                    <div className="col-md-9 content profile-changes ">
                        <h1> Utwórz nowe wydarzenie </h1>
                        <hr />
                        <div className="row profile-changes">
                            <div className="col-md-5 ">
                                
                                <UploadPhoto 
                                    handleImageChange={(e) => this.handleImageChange(e)} 
                                    imagePreviewUrl={this.state.imagePreviewUrl} />
                                <span style={{color: 'red'}}  className="help-block">{validation.fileChoosen.message}</span>

                                <DatePicker 
                                    selectedDays={this.state.selectedDay} 
                                    onDayClick={this.handleDayClick}
                                />
                                <span style={{color: 'red'}}  className="help-block">{validation.dateChoosen.message}</span>
                                
                            </div>
                            <div className="col-md-7 ">
                                <form onSubmit={this.handleSubmit}>
                                    <input type="text" className="form-control margin-top" name="name" onChange={this.handleInputChange} placeholder="Nazwa Wydarzenia" />
                                    <span style={{color: 'red'}}  className="help-block">{validation.name.message}</span>

                                    <CategoryMultiselect 
                                        subcategories={subCategories} 
                                        selectedItems={selectedItems} 
                                        handleCategoryChange={this.handleCategoryChange} 
                                    />
                                    <span style={{color: 'red'}}  className="help-block">{validation.categoryChoosen.message}</span>

                                    <textarea className="form-control margin-top" rows="5" name="description" onChange={this.handleInputChange} placeholder="Sczegóły Wydarzenia"></textarea>                                    
                                    <span style={{color: 'red'}}  className="help-block">{validation.description.message}</span>
                                    
                                    <div > 
                                        <LocationSearchInput 
                                            setLngAndLat={this.setLngAndLat} 
                                            openModal={this.onOpenMap}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-secondary f-right ">Utwórz wydarzenie</button>
                                </form>
                                
                                <Modal 
                                    open={openMap} 
                                    onClose={this.onCloseMap} 
                                    center>
                                    <div style={{width: '400px', height: '400px'}}>
                                        <MapContainer 
                                            lat={this.state.lat} 
                                            lng={this.state.lng} 
                                            width={'400px'} 
                                            height={'400px'}/>
                                    </div>
                                </Modal>
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

