export const routes = [
  {
    path: '/',
    icon: 'mdi-home',
    title: 'Home',
  },
  {
    path: '/build',
    icon: 'mdi-rocket',
    title: 'Build a Fleet',
  },
  {
    path: '/test',
    icon: 'mdi-gamepad-variant',
    title: 'Test',
  },
]

export const visitorRoutes = [
	{
    path: '/',
    icon: 'mdi-home',
    title: 'Home',
  },
	{
    path: '/login',
    icon: 'mdi-person',
    title: 'Login',
  },
	{
    path: '/register',
    icon: 'mdi-person-add',
    title: 'Sign Up',
  },
]

export const authenticatedRoutes = [
	{
    path: '/user/home',
    icon: 'mdi-home',
    title: 'Home',
  },
	{
    path: '/user/quiz/settings',
    icon: 'mdi-help',
    title: 'Take a Quiz',
  }
]

export const regularAdminRoutes = []