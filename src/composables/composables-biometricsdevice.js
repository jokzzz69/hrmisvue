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
		await axios.get('http://localhost:8001/bio/api/biometricsdevice').then((response) =>{
			batch.value = response.data.data;
		});		
	}


	const getBioTimeMain = async () => {
		axios.defaults.withCredentials = true;
		await axios.get('http://localhost:8001/bio/api/getmainbiometrics').then((response) =>{
			mainbio.value = response.data.data;
		});			        
    }  	   	
    const getBioTimeRFMIC = async () => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8001/bio/api/getrfimcbiometrics').then((response) =>{
			rfimcbio.value = response.data.data; 
		});	

    }
    const getBioTimeFMRED= async () => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8001/bio/api/getfmredbiometrics').then((response) =>{
			fmredbio.value = response.data.data; 
		});	

    }
    const getBioTimeBENGUET = async () => {
    	axios.defaults.withCredentials = true;	
        await axios.get('http://localhost:8001/bio/api/getbenguetbiometrics').then((response) =>{
			benguetbio.value = response.data.data; 
		});	
    }


    const currRFMIC = async () => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8001/bio/api/currfimcbiometrics').then((response) =>{
			rfimcbio.value = response.data.data; 
		});	

    }
    const currFMRED= async () => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8001/bio/api/curfmredbiometrics').then((response) =>{
			fmredbio.value = response.data.data; 
		});	
 
    }
    const currBENGUET = async () => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8001/bio/api/curbenguetbiometrics').then((response) =>{
			benguetbio.value = response.data.data; 
		});	
    }


    const setBioTimeMain = async () => {
    	axios.defaults.withCredentials = true;	
    	await axios.get('http://localhost:8001/bio/api/biometricdevice').then((response) =>{
			mainbio.value = response.data.data; 
		});	 
    }
    const setBioTimeRFMIC = async () => {
    	axios.defaults.withCredentials = true;	

    	await axios.post('http://localhost:8001/bio/api/setrfimcbiometrics').then((response) =>{
			rfimcbio.value = response.data.data; 
		});	 


    }
    const setBioTimeFMRED = async () => {
    	axios.defaults.withCredentials = true;	

    	await axios.post('http://localhost:8001/bio/api/setfmredbiometrics').then((response) =>{
			fmredbio.value = response.data.data; 
		});	 

    }
    const setBioTimeBENGUET = async () => {
    	axios.defaults.withCredentials = true;	

    	await axios.post('http://localhost:8001/bio/api/setbenguetbiometrics').then((response) =>{
			benguetbio.value = response.data.data; 
		});	 


    }
	

	const getmainbiometricsuser = async() => {
		axios.defaults.withCredentials = true;	
		await axios.get('http://localhost:8001/bio/api/getmainbiouser').then((response) =>{
			mainbiousers.value = response.data.data; 
		});	

	
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

