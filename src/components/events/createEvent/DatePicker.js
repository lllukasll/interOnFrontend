import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class DatePicker extends React.Component {
    render(){
        const WEEKDAYS_SHORT = [
            'niedz',
            'pon',
            'wt',
            'śr',
            'czw',
            'pt',
            'sob'
        ]

        const WEEKDAYS_LONG = [
            'Niedziela',
            'Poniedziałek',
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota'
        ]        

        const Months = [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień'
        ]

        return(
            <div className="form-control margin-top">
                <div>Data wydarzenia : </div>
                <DayPicker 
                    selectedDays={this.props.selectedDays}
                    onDayClick={this.props.onDayClick} 
                    months={Months}
                    weekdaysShort={WEEKDAYS_SHORT}
                    weekdaysLong={WEEKDAYS_LONG}/>
            </div>
        );
    }
}

export default DatePicker;

