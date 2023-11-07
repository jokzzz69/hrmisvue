import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'

export default function useNotes(){
	const notes = ref([]);
	const note = ref([]);
	const router = useRouter();
	const errors = ref('');

	const getNotes = async () => {
		axios.defaults.withCredentials = true;
		let response = await axios.get('/v1/api/csnotes')
		notes.value = response.data.data;		
	}
	const getNote = async (id) => {
		axios.defaults.withCredentials = true;
        let response = await axios.get(`/v1/api/csnotes/${id}`)
        note.value = response.data.data
    }
	const storeNote = async (data) => {
		axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.post('/v1/api/csnotes/', data)
            await router.push({name: 'notes.index'})
            
        } catch (e) {
        	console.error(e.response.data);
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const updateNote = async (id) => {
    	axios.defaults.withCredentials = true;
        errors.value = ''
        try {
            await axios.patch(`/v1/api/csnotes/${id}`, note.value)
            await router.push({ name: 'notes.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

	const destroyNote = async (id) => {
		axios.defaults.withCredentials = true;
		await axios.delete('/v1/api/csnotes/' + id)
	}

	

	return {
		errors,
		note,
		notes,
		getNote,
		getNotes,
		storeNote,
		destroyNote,
		updateNote
		
		
	}
}

