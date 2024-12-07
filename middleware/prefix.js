export default function ({ store, $auth, redirect, route }) {
  if ($auth.user) {
    //console.log($auth.user.account_type, route.path)
    if ($auth.user.account_type === 'super') {
      store.commit('setPrefix', 'super')
      if (route.path.includes('/login')) {
        redirect('/super/dashboard')
      }
    }
    if ($auth.user.account_type === 'practice') {
      store.commit('setPrefix', 'practice')

      if (route.path.includes('/login') || route.path === '/') {
        redirect('/practice/dashboard')
      }
    }
    if ($auth.user.account_type === 'receptionist') {
      if (!$auth.user.is_active) return $auth.logout()

      store.commit('setPrefix', 'receptionist')
      if (route.path.includes('/login')) {
        redirect('/receptionist')
      }
    }
    if ($auth.user.account_type === 'nurse') {
      if (!$auth.user.is_active) return $auth.logout()

      store.commit('setPrefix', 'nurse')
      if (route.path.includes('login')) {
        redirect('/nurse')
      }
    }
    if ($auth.user.account_type === 'express') {
      if ($auth.user.isDeleted) return $auth.logout()

      store.commit('setPrefix', 'express')
      if (route.path.includes('login')) {
        redirect('/express/requests')
      }
    }
  }

  // else if (route.path !== '/login') {
  //   redirect('/login');
  // }
}
