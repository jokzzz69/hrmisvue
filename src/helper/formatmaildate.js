import moment from 'moment'

export function formatmaildate(value){

	if(value){
		const dateNow = new Date();
		const newDate = new Date(value);

		let returndate = '';

		if(dateNow.getFullYear() == newDate.getFullYear()){
			if(dateNow.getDate() == newDate.getDate()){
				returndate = moment(newDate).format('hh:mm A');
			}else{
				returndate = moment(newDate).format('MMM D');
			}
			
		}else{
			returndate = moment(newDate).format('MMM D, YYYY');	
		}
		return returndate;

	}

	
}