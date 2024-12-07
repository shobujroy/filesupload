export default function ({ store, redirect, route }) {
  // If the user is practice move to doctors.
  const SUPERADMIN_ROUTES = ['/practice', '/practice/create', '/auditLogs', '/']
  console.log(route.fullPath)
  if (store?.$auth?.user?.account_type == 'practice') {
    if (SUPERADMIN_ROUTES.includes(route.fullPath)) {
      store.commit('setPrefix', 'practice')
      console.log(prefix)

      redirect('practice/dashboard')
    }
  } else if (store?.$auth?.user?.account_type == 'receptionist') {
    if (SUPERADMIN_ROUTES.includes(route.fullPath)) {
      store.commit('setPrefix', 'receptionist')

      redirect('receptionist')
    }
  } else if (store?.$auth?.user?.account_type == 'nurse') {
    if (SUPERADMIN_ROUTES.includes(route.fullPath)) {
      store.commit('setPrefix', 'nurse')

      redirect('nurse')
    }
  } else if (store?.$auth?.user?.account_type == 'express') {
    if (SUPERADMIN_ROUTES.includes(route.fullPath)) {
      store.commit('setPrefix', 'express')

      redirect('express/requests')
    }
  } else {
    store.commit('setPrefix', 'super')

    redirect('super/dashboard')
  }
}
