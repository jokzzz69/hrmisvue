import {createRouter, createWebHistory} from 'vue-router';
import { useAuthStore } from '@/stores/store.js'

const routes = [  
  {
    path: '/dashboard',
    name: 'dashboard.index',
    component: () => import('@/components/dashboard/DashboardIndex.vue'),
    meta: {
      middleware: ['super-admin']
    }
  },
  {
    path: '/contentsoon',
    name: 'contentsoon.index',
    component: () => import('@/components/ContentSoon.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: '/cmi',
    name: 'cmi.index',
    component: () => import('@/components/contentmanager/ContentManagerIndex.vue'),
    meta: {
      middleware: ['super-admin','admin']
    }
  },

  { 
    path: '/:pathMatch(.*)*', 
    name: 'force.index', 
    component: () => import('@/components/errors/force.vue'),
  },
  { 
    path: '/403', 
    name: 'forbidden.index', 
    component: () => import('@/components/errors/forbidden.vue'),
  },
  
  {
    path: '/about',
    name: 'about.index',
    component: () => import ('@/components/staticpages/AboutIndex.vue')
  },
  {
    path: '/logs',
    name: 'logs.index',
    component: () => import('@/components/logspage/LogIndex.vue'),
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/log/:id/show',
    name: 'logs.show',
    component: () => import('@/components/logspage/LogShow.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin']
    }
  },

  {
    path: '/dtr/:id/:mf/edit',
    name: 'dtrupdating.edit',
    component: () => import('@/components/dtr/DTRUpdatingEdit.vue'),
    props: true,
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },

  {
    path: '/users',
    name: 'users.index',
    component: () => import('@/components/users/UsersIndex.vue'),
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/users/:id/edit',
    name: 'users.edit',
    component: () => import('@/components/users/UsersEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/offices',
    name: 'offices.index',
    component: () => import('@/components/offices/OfficeIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  
  {
    path: '/offices/:id/edit',
    name: 'offices.edit',
    component: () => import('@/components/offices/OfficeEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/offices/create',
    name: 'offices.create',
    component: () => import('@/components/offices/OfficeCreate.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/locations',
    name: 'locations.index',
    component: () => import ('@/components/location/LocationIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/locations/create',
    name: 'locations.create',
    component: () => import('@/components/location/LocationCreate.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/locations/:id/edit',
    name: 'locations.edit',
    component: () => import('@/components/location/LocationEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/monitoring',
    name: 'monitoring.index',
    component: () => import('@/components/monitoring/MonitoringIndex.vue'),
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
      path: '/monitoring/:id/view',
      name: 'monitoring.show',
      component: () => import('@/components/monitoring/MonitoringShow.vue'),
      props: true,
      meta: {
        middleware: ['hr','super-admin','admin','employee']
      }
  },
  {
    path: '/monitorofficeemployees',
    name: 'monitoringofficehead.index',
    component: () => import('@/components/monitoring/MonitoringOfficehead.vue'),
    meta: {
      middleware: ['office-head']
    }
  },
  
  
  {
      path: '/monitoringofficeemployee/:id/view',
      name: 'monitoringofficeemployee.show',
      component: () => import('@/components/monitoring/MonitoringOfficeheadShow.vue'),
      props: true,
      meta: {
        middleware: ['office-head']
      }
  },
  {
      path: '/mydailytimerecord',
      name: 'monitoring.employee',
      component: () => import('@/components/monitoring/MonitoringOwn.vue'),
      meta: {
        middleware: ['hr','super-admin','admin','employee','office-head']
      }
  },
  {
      path: '/updatepassword',
      name: 'changepasswordlogin.index',
      component: () => import('@/components/users/ChangePassword.vue'),
      meta: {
        middleware: ['hr','super-admin','admin','employee','office-head']
      }
  },
  {
    path: '/generatedtr',
    name: 'generatedtr.index',
    component: () => import('@/components/generatedtr/GeneratedtrIndex.vue'),
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
    path: '/generatedtrperemloyee/:id/',
    name: 'generatedtrperemployee.show',
    component: () => import('@/components/generatedtr/GeneratedtrperEmployee.vue'),
    props: true,
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
    path: '/employeetypes',
    name: 'employeetype.index',
    component: () => import('@/components/employeetypes/EmployeeTypeIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeetypes/create',
    name: 'employeetype.create',
    component: () => import('@/components/employeetypes/EmployeeTypeCreate.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeetypes/:id/',
    name: 'employeetype.edit',
    component: () => import('@/components/employeetypes/EmployeeTypeEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeestatus',
    name: 'employeestatus.index',
    component: () => import('@/components/employeestatus/EmployeeStatusIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeestatus/create',
    name: 'employeestatus.create',
    component: () => import('@/components/employeestatus/EmployeeStatusCreate.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeestatus/:id/',
    name: 'employeestatus.edit',
    component: () => import('@/components/employeestatus/EmployeeStatusEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  
  {
    path: '/employeeposition',
    name: 'employeeposition.index',
    component: () => import('@/components/employeepositions/EmployeePositionIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeeposition/create',
    name: 'employeeposition.create',
    component: () => import('@/components/employeepositions/EmployeePositionCreate.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/employeeposition/:id/',
    name: 'employeeposition.edit',
    component: () => import('@/components/employeepositions/EmployeePositionEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },

  {
    path: '/salarygrades/:id/',
    name: 'salarygrade.index',
    component: () => import('@/components/salarygrade/SalarygradeIndex.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/salarygradegroups',
    name: 'salarygradegroup.index',
    component: () => import('@/components/salarygradegroup/SalarygradegroupIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/salarygradegroups/create',
    name: 'salarygradegroup.create',
    component: () => import('@/components/salarygradegroup/SalarygradegroupCreate.vue'),
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/salarygradegroups/:id',
    name: 'salarygradegroup.show',
    component: () => import('@/components/salarygradegroup/SalarygradegroupShow.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  }, 
  {
    path: '/records',
    name: 'record.index',
    component: () => import('@/components/records/RecordIndex.vue'),
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
    path: '/record/create',
    name: 'record.create',
    component: () => import('@/components/records/RecordCreate.vue'),
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
    path: '/record/:id/edit',
    name: 'record.edit',
    component: () => import('@/components/records/RecordEdit.vue'),
    props: true,
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
    path: `/myinfo`,
    name: 'recordpersonal.show',
    component: () => import('@/components/records/RecordPersonal.vue'),
    alias: ['/'],
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: `/myinfo/name`,
    name: 'recordpersonalname.edit',
    component: () => import('@/components/records/RecordPersonalNameEdit.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: `/myinfo/birthdaygender`,
    name: 'recordpersonalbirthdaygender.edit',
    component: () => import('@/components/records/RecordPersonalBirthdayGenderEdit.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: `/myinfo/contactperson`,
    name: 'recordpersonalcontactperson.edit',
    component: () => import('@/components/records/RecordPersonalEmergencyEdit.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: `/myinfo/contact`,
    name: 'recordpersonalcontact.edit',
    component: () => import('@/components/records/RecordPersonalContactEdit.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
      path: '/profile',
      name: 'profile.edit',
      component: () => import('@/components/profile/ProfileEdit.vue'),
      meta: {
        middleware: ['hr','super-admin','admin','employee','office-head']
      }
  },
  {
    path: '/pds/:id/edit',
    name: 'pds.edit',
    component: () => import('@/components/pds/PDSEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },

  {
    path: '/pds',
    name: 'pds.index',
    component: () => import('@/components/pds/PDSIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
   {
    path: '/mypds',
    name: 'pdsmydata.show',
    component: () => import('@/components/pds/PDSMyData.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdspersonalinformation',
    name: 'pdspersonal.show',
    component: () => import('@/components/pds/PDSPersonal.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdsfamilybackground',
    name: 'pdspersonalfamilybackground.show',
    component: () => import('@/components/pds/PDSPersonalFamilyBackground.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdseducationalbackground',
    name: 'pdspersonaleducationalbackground.show',
    component: () => import('@/components/pds/PDSPersonalEducationalBackground.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdseligibility',
    name: 'pdseligibility.show',
    component: () => import('@/components/pds/PDScsc.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdsworkexperience',
    name: 'pdsworkexperience.show',
    component: () => import('@/components/pds/PDSWorkExperience.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdsvoluntarywork',
    name: 'pdsvoluntarywork.show',
    component: () => import('@/components/pds/PDSVoluntaryWork.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdslearninganddevelopment',
    name: 'pdslearninganddevelopment.show',
    component: () => import('@/components/pds/PDSLearningandDevelopment.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdsotherinformation',
    name: 'pdsotherinformation.show',
    component: () => import('@/components/pds/PDSOtherInformation.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/mypdslastinformation',
    name: 'pdslastinformation.show',
    component: () => import('@/components/pds/PDSLastInformation.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/pdspreview/:id',
    name: 'pdspreview.show',
    component: () => import('@/components/pds/PDSPreview.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/viewmydata/:id',
    name: 'viewmydata.show',
    component:  () => import('@/components/pds/PDSPreview.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin','hr','employee','office-head']
    }
  },
  {
    path: '/customreport/',
    name: 'customreport.index',
    component: () => import('@/components/generatecustomreport/CustomReportIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/roles',
    name: 'roles.index',
    component: () => import('@/components/roles/RoleIndex.vue'),
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/roles/:id/edit',
    name: 'roles.edit',
    component: () => import('@/components/roles/RoleEdit.vue'),
    props: true,
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/roles/create',
    name: 'roles.create',
    component: () => import('@/components/roles/RoleCreate.vue'),
    meta: {
      middleware: ['super-admin','admin']
    }
  },
  {
    path: '/travels',
    name: 'travels.index',
    component: () => import('@/components/travels/TravelIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr','office-head','employee']
    }
  },
  {
    path: '/travels/create',
    name: 'travel.create',
    component: () => import('@/components/travels/TravelCreate.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: '/travels/:id/edit',
    name: 'travel.edit',
    props: true,
    component: () => import('@/components/travels/TravelEdit.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: `/mytravels`,
    name: 'mytravels.index',
    component: () => import('@/components/travels/TravelEmployeeIndex.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: '/holidaylist',
    name: 'holidays.index',
    component: () => import('@/components/holidays/HolidayIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/holidaylist/create',
    name: 'holidays.create',
    component: () => import('@/components/holidays/HolidayCreate.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/holidaylist/:id/edit',
    name: 'holidays.edit',
    props: true,
    component: () => import('@/components/holidays/HolidayEdit.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/biometrics',
    name: 'biometrics.index',
    component: () => import('@/components/biometrics/BiometricsIndex.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/biometricsuser',
    name: 'biometricsuser.index',
    component: () => import('@/components/biometrics/BiometricsUser.vue'),
    meta: {
      middleware: ['super-admin','admin','hr']
    }
  },
  {
    path: '/archives',
    name: 'archives.index',
    component: () => import('@/components/archive/ArchiveIndex.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  },
  {
    path: '/archives/:id/restore',
    name: 'archives.restore',
    component: () => import('@/components/archive/ArchiveRestore.vue'),
    props: true,
    meta: {
      middleware: ['hr','super-admin','admin']
    }
  },
  {
      path: '/login',
      name: 'login.index',
      component: () => import('@/components/auth/LoginView.vue'),
  },
  {
    path: '/employeeslist',
    name: 'employeeslist.view',
    component: () => import('@/components/records/RecordEmployeeView.vue'),
    meta: {
      middleware: ['hr','super-admin','admin','employee','office-head']
    }
  }
  
]


const router = createRouter({
  history: createWebHistory('/'),
  base: `/`,
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const details = store.getdetails;


  const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
  const notfound = { path: "/ ", query: { redirect: to.fullPath } };
  const middleware = to.meta.middleware;

  let userslug = '';
  var counter = 0;

  if(!middleware){
     if(to.name == 'login.index' && details){
      next({name: 'recordpersonal.show'})
     }else{
      next()
     }
     
  }else{
    if(!details){
      return next({name: 'login.index'});
    }else{
      userslug = details[1];
      counter = 0;

      if(middleware.includes(userslug)){
        counter++;
      }      
    }

    if(counter > 0){
      next()
    }else{
      next(notfound)
    }


  }
 


});



export default router