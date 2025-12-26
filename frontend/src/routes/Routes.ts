import { AuthPage } from "../view/pages/AuthPage.js";
import { MainPage } from "../view/pages/MainPage.js";

interface Route {
    path: string,
    component: new (containerId: string) => any;
    requiresAuth: boolean;
}

export class Router {
    private containerId: string;
    private routes: Route[] = [];
    private currentPage: any = null;

    constructor(containerId: string) {
        this.containerId = containerId;
        this.initRoutes();
        this.initEventListeners();
        this.navigate(window.location.pathname);
    }

    private initRoutes() {
        this.routes = [
            { path: '/main', component: MainPage, requiresAuth: true},
            { path: '/auth', component: AuthPage, requiresAuth: false}
        ];
    }

    private initEventListeners(){
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;

            if(target.matches('[data-nav]')) {
                e.preventDefault();
                const path = target.dataset.nav!;
                this.navigate(path);
            }
        });

        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname)
        })
    }

    private navigate(path: string) {
        const token = localStorage.getItem('token');
        const route = this.routes.find(r => r.path === path)!;

        if(!route) {
            path = '/';
            window.history.pushState({}, '', path);
        } else if (route.requiresAuth && !token) {
            path = '/auth';
            window.history.pushState({}, '', path);
        }

        const container = document.getElementById(this.containerId)!;
        container.innerHTML = '';

        this.currentPage = new route.component(this.containerId);

        window.history.pushState({}, '', path);
    }

    public go(path: string) {
        this.navigate(path);
    }
}