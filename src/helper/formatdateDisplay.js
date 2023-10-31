import moment from 'moment'

export function formatDateDisplay(value){

	if(value){
		return moment(new Date(value)).format('MMMM D');
	}
}