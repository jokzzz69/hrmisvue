<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 fs-5 p-4">     
               <p>The <strong>Human Resource Management Information System</strong> (HRMIS) is an online system designed and developed by BFAR-CAR RFIMC personnel to manage human resource information within the Regional Office. It allows HR staff to manage employees data in a centralized database. The system encompasses several key areas of HR management, including:</p>
               <ol>
                    <li class="ps-2 mt-2">
                        Employee Information Management: HRMIS stores comprehensive employee records, including personal details, employment history, skills, training, performance evaluations, benefits, and compensation information. It serves as a centralized database for managing employee information.
                    </li>
                    <li class="ps-2 mt-2">
                        Recruitment and Onboarding: HRMIS assists in automating the recruitment process, including job postings, applicant tracking, resume screening, and interview scheduling. It can also facilitate the onboarding process by providing digital forms, orientation materials, and training modules.
                    </li>
                    <li class="ps-2 mt-2">
                        Time and Attendance Tracking: HRMIS allows employees to record their working hours, leaves, and absences electronically. It automates the calculation of attendance, tracks overtime, and generates reports for payroll processing.
                    </li>
                    <li class="ps-2 mt-2">
                        Performance Management: HRMIS enables the management of employee performance evaluation processes. It helps set goals, track progress, document performance reviews, and provide feedback. The system may include features such as 360-degree feedback, goal alignment, and performance appraisal templates.
                    </li>
                    <li class="ps-2 mt-2">
                        Training and Development: HRMIS assists in managing employee training programs and professional development activities. It tracks training needs, schedules training sessions, records participation, and monitors the effectiveness of training initiatives.
                    </li>
                    <li class="ps-2 mt-2">
                        Payroll and Benefits Administration: HRMIS integrates with payroll systems to manage employee compensation, tax deductions, and benefits administration. It automates payroll calculations, generates pay slips, and ensures compliance with relevant regulations.
                    </li>
                    <li class="ps-2 mt-2">
                        Employee Self-Service: HRMIS offers self-service portals where employees can access and update their personal information, submit leave requests, view pay stubs, enroll in benefits, and access company policies and documents.
                    </li>
                    <li class="ps-2 mt-2">
                        Analytics and Reporting: HRMIS provides data analysis and reporting capabilities, allowing HR professionals to generate reports, analyze workforce trends, monitor key metrics, and make data-driven decisions. It helps identify areas for improvement, manage workforce planning, and support strategic HR initiatives.
                    </li>
               </ol>

            </div>
        </div>
    </div>
    
</template>

<script>
    import { useHead } from '@unhead/vue'

	export default{
		setup(){
            useHead({
                title: 'About | HRMIS | '+import.meta.env.VITE_BFAR_AGENCY
            })
		}
	}
</script>