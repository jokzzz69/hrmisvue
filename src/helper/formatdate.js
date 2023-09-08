import moment from 'moment'

export function formatDate(value){

	if(value){
		return moment(value).format('MMMM D, YYYY');
	}
}