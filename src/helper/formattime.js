import moment from 'moment'

export function formatTime(value){

	if(String(value) != "00:00:00.0000000"){
		return moment(value, "HH:mm").format('hh:mm A');
	}
}