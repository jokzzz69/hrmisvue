import moment from 'moment'

export function formatDate(value){

	if(value){
		return moment(new Date(value)).format('MMMM D, YYYY');
	}
}