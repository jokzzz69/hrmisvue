export function formatfilesize(size){

	if(size){

		const returnvalue = (size < 1024) ? size +' KB' : (size / (1024*1024)).toFixed(2)+' MB';
			
		return returnvalue;

	}

	
}