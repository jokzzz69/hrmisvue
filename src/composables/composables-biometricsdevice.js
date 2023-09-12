import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useBioDevice(){
	const router = useRouter();
	const errors = ref('');
	const mainbio = ref();
	const rfimcbio = ref();
	const fmredbio = ref();
	const benguetbio = ref();
	const newtime = ref();
	const batch = ref();
	const mainbiousers = ref();

	const getPage = async() =>{
		axios.defaults.withCredentials = true;	
		let response = await axios.get('/v1/api/biometricsdevice');
		batch.value = response.data.data;
	}
	const getBioTimeMain = async () => {
		axios.defaults.withCredentials = true;	
        let response = await axios.get('/v1/api/getmainbiometrics');
		mainbio.value = response.data.data;
    }  	   	
    const getBioTimeRFMIC = async () => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/getrfimcbiometrics/`);
        rfimcbio.value = response.data.data;   
    }
    const getBioTimeFMRED= async () => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/getfmredbiometrics/`);
        fmredbio.value = response.data.data;   
    }
    const getBioTimeBENGUET = async () => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/getbenguetbiometrics/`);
        benguetbio.value = response.data.data;   
    }


    const currRFMIC = async () => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/currfimcbiometrics/`);
        rfimcbio.value = response.data.data;   
    }
    const currFMRED= async () => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/curfmredbiometrics/`);
        fmredbio.value = response.data.data;   
    }
    const currBENGUET = async () => {
    	axios.defaults.withCredentials = true;	
    	let response = await axios.get(`/v1/api/curbenguetbiometrics/`);
        benguetbio.value = response.data.data;   
    }




    const setBioTimeMain = async () => {
    	axios.defaults.withCredentials = true;	
        let response = await axios.get(`/v1/api/biometricdevice/`);
        mainbio.value = response.data.data;   
    }
    const setBioTimeRFMIC = async () => {
    	axios.defaults.withCredentials = true;	
        let response = await axios.post(`/v1/api/setrfimcbiometrics/`);
        rfimcbio.value = response.data.data;   
    }
    const setBioTimeFMRED = async () => {
    	axios.defaults.withCredentials = true;	
        let response = await axios.post(`/v1/api/setfmredbiometrics/`);
        rfimcbio.value = response.data.data;   
    }
    const setBioTimeBENGUET = async () => {
    	axios.defaults.withCredentials = true;	
        let response = await axios.post(`/v1/api/setbenguetbiometrics/`);
        rfimcbio.value = response.data.data;   
    }
	

	const getmainbiometricsuser = async() => {
		axios.defaults.withCredentials = true;	
		let response = await axios.get(`/v1/api/getmainbiouser/`);
        mainbiousers.value = response.data.data;   

        //let response = await axios.get('https://hrmis.bfarcar.da.gov.ph/v1/api/salarygradegroups');
        //console.log(response);
		//http://172.168.8.15:8080/api_v2/employees
		//https://hrmis.bfarcar.da.gov.ph/v1/api/salarygradegroups
        // await axios.get('http://172.168.8.15:8080/api_v2/employees',{
        // 	headers: {
        // 		Authorization: `Token 199e60e247a9c5792dfbb546b27541b4b7839d9004e115d6cd55bcddf734456a`
        // 	}
        // })
        // .then(res => console.log(res))
        // .catch(err => console.log(err));

	
	}

	return {
		getBioTimeMain,
		setBioTimeMain,
		mainbio,
		newtime,
		errors,
		getBioTimeRFMIC,
		setBioTimeRFMIC,
		getBioTimeFMRED,
		setBioTimeFMRED,
		getBioTimeBENGUET,
		setBioTimeBENGUET,
		rfimcbio,
		fmredbio,
		benguetbio,
		batch,
		getPage,
		currRFMIC,
		currFMRED,
		currBENGUET,
		mainbiousers,
		getmainbiometricsuser
	}
}

