class CustomRoutingProvider {
  constructor() {
    this.currentRoute = null;
    this.routeChangeCallback = null;
    console.log('CustomRoutingProvider constructor called');
  }

  // Ensure this method signature matches what Bugsnag expects
  listenForRouteChanges(callback) {
    console.log('listenForRouteChanges called with callback:', typeof callback);
    this.routeChangeCallback = callback;
    
    if (typeof window !== 'undefined' && window.history) {
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      
      window.history.pushState = (...args) => {
        console.log('pushState intercepted');
        originalPushState.apply(window.history, args);
        this.handleRouteChange();
      };
      
      window.history.replaceState = (...args) => {
        console.log('replaceState intercepted');
        originalReplaceState.apply(window.history, args);
        this.handleRouteChange();
      };
      
      window.addEventListener('popstate', () => {
        console.log('popstate event');
        this.handleRouteChange();
      });
    }
    
    // Call immediately to set initial route
    this.handleRouteChange();
  }

  handleRouteChange() {
    const pathname = window.location.pathname;
    const route = this.getRouteFromPathname(pathname);
    console.log('Route change detected:', { pathname, route, hasCallback: !!this.routeChangeCallback });
    
    if (route !== this.currentRoute) {
      this.currentRoute = route;
      if (this.routeChangeCallback) {
        console.log('Calling route change callback with:', route);
        this.routeChangeCallback(route);
      } else {
        console.log('No callback available');
      }
    }
  }

  getRouteFromPathname(pathname) {
    const routeMap = {
      '/': { name: 'HomePage', path: '/' },
      '/home': { name: 'HomePage', path: '/home' },
      '/salads': { name: 'SaladList', path: '/salads' },
      '/salads/new': { name: 'SaladForm', path: '/salads/new' },
      '/profile': { name: 'UserProfilePage', path: '/profile' },
      '/users/new': { name: 'RegistrationForm', path: '/users/new' },
      '/user-sessions/new': { name: 'SignInForm', path: '/user-sessions/new' },
      '/reviews': { name: 'Reviews', path: '/reviews' }
    };

    // Handle dynamic routes
    if (pathname.match(/^\/salads\/\d+$/)) {
      return { name: 'SaladShow', path: '/salads/:id' };
    }
    if (pathname.match(/^\/salads\/\d+\/edit$/)) {
      return { name: 'SaladEditForm', path: '/salads/:id/edit' };
    }
    if (pathname.match(/^\/salads\/\d+\/reviews$/)) {
      return { name: 'SaladReviews', path: '/salads/:id/reviews' };
    }

    return routeMap[pathname] || { name: 'Unknown', path: pathname };
  }
}

export default CustomRoutingProvider;
