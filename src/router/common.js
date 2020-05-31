const NotFound = <template> <p>Page not found</p></template>
const Home = <template> <p>home page</p></template>
const About = <template> <p>about page</p></template>

const routes = [
    {
        path: '/',
        name: 'home',
        component:() => Home || NotFound,
    },
    {
        path: '/about',
        name: 'about',
        component: () => About || NotFound,
    }
]
export default routes
