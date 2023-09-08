import moment from 'moment'

export function formatDateDisplay(value){

	if(value){
		return moment(value).format('MMMM D');
	}
}