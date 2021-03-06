document.addEventListener('DOMContentLoaded', function() {
    //nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, { edges: 'right' });
    //add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, { edge: 'bottom' });
});