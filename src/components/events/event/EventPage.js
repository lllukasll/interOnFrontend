import React from 'react';
import Sidebar from '../../common/sideBar/SideBar.js'
import EventContent from './EventContent.js'
import { eventActions } from '../../../actions'
import { connect } from 'react-redux';

class Event extends React.Component {
    componentDidMount(){
        this.props.dispatch(eventActions.getOne(this.props.id));
    }

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

