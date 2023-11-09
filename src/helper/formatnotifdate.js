import moment from 'moment';

export function formatnotifdate(dateTime){
	if (!dateTime) {
		return null;
	}

	const today = moment();

	const time = moment(dateTime);

	const diff = today.diff(time);

	const duration = moment.duration(diff);
	if (duration.years() > 0) {
		if(duration.years() > 1){
			return duration.years() + ' years ago';
		}else{
			return 'a year ago';
		}
	} else if (duration.weeks() > 0) {
		if(duration.weeks() > 1){
			return duration.weeks() + ' weeks ago';
		}else{
			return 'a week ago';
		}
	} else if (duration.days() > 0) {

		if(duration.days() > 1){
			return duration.days() + ' days ago';
		}else{
			return 'a day ago';
		}
	} else if (duration.hours() > 0) {
		if(duration.hours() > 1){
			return duration.hours() + ' hours ago';
		}else{
			return 'an hour ago';
		}
		
	} else if (duration.minutes() > 0) {
		if(duration.minutes() > 1){
			return duration.minutes() + ' minutes ago';
		}else{
			return 'a minute ago';
		}
	} else if (duration.minutes() < 1) {
		return 'seconds ago';
	}
}