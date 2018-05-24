import React from 'react';
import Sidebar from '../../common/sideBar/SideBar.js'
import EventContent from './EventContent.js'
import { eventActions } from '../../../actions'
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import MapContainer from '../../map/MapContainer';

class Event extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            isLoading: true,
            openMap: false
        }
    }
    componentDidMount(){
        this.setState({isLoading: true})
        this.props.dispatch(eventActions.getOne(this.props.id));
        this.setState({isLoading: false})
    }

    onOpenMap = () => { this.setState({ openMap: true }) };

    onCloseMap = () => { this.setState({ openMap: false }) };

    leaveGroup(){

    }

    renderSpiner(){
        return(
            <div className="spinner-field"><img alt="loading" src="/images/spinner2.gif" /></div>
        );
    }

    renderContent(event){
        console.log(event)
        return(
            <EventContent 
                title={event.name}
                date={"30.04.2018"}
                address={"Stadion Stomilu"}
                content={event.description}
                numberOfPeople={"123"}
                adminId={6026}
                leaveGroup={this.leaveGroup}
            />
            
        );
    }

    render(){
        const { events } = this.props;

        if(this.state.isLoading){
            return(
                this.renderSpiner()
            )
        }

        return(
            <div className="container">
                <div className="row">
                    <Sidebar />
                    {events && events.loadingOne ? (this.renderSpiner()) : (this.renderContent(events.event))}
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { events } = state;
    return {
        events,
        id: ownProps.match.params.id
    };
}

export default connect(mapStateToProps)(Event);