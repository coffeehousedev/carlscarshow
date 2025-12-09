const navItems = [
            { text: 'Registration', url: '../index.html' },
            { text: 'Garage', url: 'pages/garage.html' },
];

/**
 * @param {string} location
 * @returns {HTMLElement}
 */
function createNavBar(location = 'root') {
    const nav = document.createElement('nav');
    nav.className = 'main-navigation';

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰'
    hamburger.setAttribute('aria-label', 'Toggle menu');

    const ul = document.createElement('ul');

    navItems.forEach(item => {
        const li = document.createElement('li');
        
        const a = document.createElement('a');

        if (location === 'pages') {                    
            if (item.url === 'index.html') {
                a.href = '../' + item.url;
            } else {
                a.href = item.url.replace('pages/', '');
            }
        } else {
            a.href = item.url;
        }
        
        a.textContent = item.text;
        
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(hamburger);
    nav.appendChild(ul);
    
    hamburger.addEventListener('click', function() {
        ul.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    return nav;
}

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    
    const location = window.location.pathname.includes('/pages/') ? 'pages' : 'root';
    
    const navBar = createNavBar(location);
    
    header.appendChild(navBar);
});
