export default function({ app, redirect, route }) {
    if (!app.$cookies.get('user_id') && route.name !== 'Login') {
        redirect('login')
    } else if (app.$cookies.get('user_id') && route.name === 'Login') {
        redirect('/')
    }
}