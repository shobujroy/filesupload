export default function ({ store, $auth, redirect, route }) {
  if (!$auth.loggedIn) return;
  else if ($auth.loggedIn) {
    if ($auth?.user?.role_id === 1) {
      redirect("/admin/dashboard");
    }
    if ($auth?.user?.role_id === 2) {
      redirect("/user/dashboard");
    }
  } else {
    redirect("/login");
  }
}
