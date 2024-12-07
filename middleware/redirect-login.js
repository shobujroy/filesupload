export default async function ({ route, redirect, app }) {
  // Check if the route is /login/ and if it's not already /login
  if (route.path === '/login/') {
    // window.location.href = '/login'
    redirect('/login')
  }
}
