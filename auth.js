/* Prototype-only browser account helper. Do not use this as production authentication. */
function getCurrentUser(){
    return JSON.parse(localStorage.getItem('grabGoUser') || 'null');
}

function requireUser(nextPage){
    if (getCurrentUser()) return true;
    const next = encodeURIComponent(nextPage || window.location.pathname.split('/').pop() || 'index.html');
    window.location.href = `login.html?next=${next}`;
    return false;
}

function accountOrdersKey(){
    const user = getCurrentUser();
    return user ? `grabGoOrders_${user.email.toLowerCase()}` : 'grabGoOrders';
}

function updateAccountLinks(){
    const user = getCurrentUser();
    document.querySelectorAll('[data-account-link]').forEach(link => {
        link.textContent = user ? `Hi, ${user.name.split(' ')[0]}` : 'Log in';
        link.href = user ? 'account.html' : 'login.html';
        link.setAttribute('aria-label', user ? 'Open account settings' : 'Log in or create an account');
    });
}

document.addEventListener('DOMContentLoaded', updateAccountLinks);
