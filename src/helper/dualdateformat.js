import moment from 'moment'

export function dualdateformat(start,end){
    const startARR = start.split('-');
        const endARR = end.split('-');


        var textstring = '';
        var tempdate = '';
        var year = '';
        var day = '';
        var month = '';

        if(startARR[0] == endARR[0]){
            year = endARR[0];
            if(startARR[1] == endARR[1]){
                month = endARR[1];

                if(startARR[2] == endARR[2]){
                    textstring = moment(start).format('MMMM D, Y')
                }else{
                    textstring = moment(start).format('MMMM D')+' - '+moment(end).format('D, Y');
                }

            }else{
                textstring = moment(start).format('MMMM D')+' - '+moment(end).format('MMMM D, Y');
            }
        }else{
            textstring = moment(start).format('MMMM D, Y')+' - '+moment(end).format('MMMM D, Y');
        }
        
        return textstring;
}

                
            