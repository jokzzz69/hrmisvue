<template>
    <div class="row">
        <div class="col-sm-12 fs-4 p-4">     
           <p>The <strong>Communications Monitoring and Document Tracking System</strong> (CMDTS) is an online system designed and developed by BFAR-CAR RFIMC personnel to monitor and track various forms of communication and document exchange within the regional office. It will be used to enhance security, ensure regulatory compliance, and maintain control over sensitive information.</p>
           <ol>
                <li class="ps-2 mt-2">
                    The system operates by monitoring and recording various communication channels such as emails, and other digital communication methods. It can also track documents and files that are shared or exchanged within the agency, including attachments and other metadata.
                </li>
                <li class="ps-2 mt-2">
                    The system encompasses several key areas of the Communications Monitoring and Document Tracking System:
                </li>
                <li class="ps-2 mt-2">Real-time Monitoring: The system captures and logs communication data, including message content, timestamps, sender and recipient information, and other relevant details. It can analyze the data for security threats, compliance violations, or suspicious activities.</li>

                <li class="ps-2 mt-2">Document Tracking: The system keeps track of documents and files exchanged within the agency, providing a record of document flow, version control, and access history. It can help enforce document security policies and prevent unauthorized sharing or modifications.</li>

                <li class="ps-2 mt-2">Content Filtering and Analysis: The system may employ content filtering mechanisms to identify and flag inappropriate or sensitive content. It can also perform advanced analysis, including sentiment analysis, keyword detection, or language translation, to extract valuable insights from the communication data.</li>

                <li class="ps-2 mt-2">Search and Retrieval: The system typically provides search capabilities to enable users to retrieve specific communications or documents based on criteria such as keywords, sender/receiver details, or date ranges. This feature facilitates investigations, e-discovery, or information retrieval.</li>

                <li class="ps-2 mt-2">Compliance Management: Ensure that communication activities adhere to legal and regulatory requirements.</li>

                <li class="ps-2 mt-2">Alerts and Notifications: The system can generate alerts or notifications based on predefined rules or triggers. For example, it can notify administrators of suspicious activities, policy violations, or unusual communication patterns.</li>

                <li class="ps-2 mt-2">User Activity Tracking: Keep a log of user activities, including logins, logouts, and interactions with the system</li>

                <li class="ps-2 mt-2">User Access Controls: The system often includes role-based access controls to restrict access to sensitive communications and documents. It allows administrators to define user permissions, ensuring that only authorized personnel can view or modify certain information.</li>

                <li class="ps-2 mt-2">Integration and Archiving: The system will be integrated with other systems, such as HRMIS, to capture communication data seamlessly. It can also provide long-term archiving of communication records for compliance or historical purposes.</li>

                <li class="ps-2 mt-2">Data Encryption: Ensure that sensitive data is encrypted during storage and transmission to maintain security and privacy.</li>

                <li class="ps-2 mt-2">Collaboration Tools: Enable real-time collaboration on documents, with features like comments</li>

                <li class="ps-2 mt-2">Comprehensive Audit Trails: Maintain detailed logs of system activities for accountability and auditing purposes.</li>

                <li class="ps-2 mt-2">Document Metadata Management: Attach and manage metadata to documents for improved search and organization.</li>

                <li class="ps-2 mt-2">Content Classification: Automatically classify documents into predefined categories for easier management and retrieval.</li>

                <li class="ps-2 mt-2">Policy Enforcement: Enforce communication policies and rules to maintain compliance with organizational standards.</li>

                <li class="ps-2 mt-2">Privacy Protection: Safeguard the privacy of individuals by adhering to data protection and privacy regulations.</li>

                <li class="ps-2 mt-2">Custom Reporting: Generate custom reports on document usage, access, and compliance.</li>

           </ol>

        </div>
    </div>
    
</template>

<script>
    import { useHead } from '@unhead/vue'
    import nProgress from "nprogress";
    import {onMounted ,ref, computed, inject} from 'vue';
	export default{
		setup(){
            useHead({
                title: 'About | CMDTS'
            })
            onMounted(() =>{
                
            })
		}
	}
</script>