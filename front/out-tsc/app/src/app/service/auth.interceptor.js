export const authInterceptor = (request, next) => {
    const token = localStorage.getItem('token') ?? '';
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Bearer ${token}` : ','
        }
    });
    return next(request);
};
//# sourceMappingURL=auth.interceptor.js.map