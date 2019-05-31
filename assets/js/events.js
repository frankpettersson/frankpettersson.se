//DEFAULT SETTINGS
var activeLink = 0;
const defaultUIColor = '#ff009d',
    defaultProject = 'projects/graphics/js_canvas/flowing_squares/index.html',
    defaultProjectLabel = 'FLOWING SQUARES',
    defaultProjectImage = 'assets/images/thumbnails/flowing squares.png',
    defaultLandingPage = 'PROJECTS',
    defaultDarkMode = false;

//GET SETTINGS
var DEFAULT_PROJECT = localStorage.getItem('DEFAULT_PROJECT'),
    DEFAULT_PROJECT_LABEL = localStorage.getItem('DEFAULT_PROJECT_LABEL'),
    DEFAULT_PROJECT_IMAGE = localStorage.getItem('DEFAULT_PROJECT_IMAGE'),
    LANDING_PAGE = localStorage.getItem('LANDING_PAGE'),
    UI_COLOR = localStorage.getItem('UI_COLOR'),
    DARK_MODE = localStorage.getItem('DARK_MODE'),
    ACTIVE_LINK = localStorage.getItem('ACTIVE_LINK');

//SAVE SETTINGS
document.querySelector('#save').addEventListener('click', () => {
    //SET UI COLOR
    let newUIColor = document.querySelector('#select-ui-color').value;
    document.querySelectorAll('.link a')[activeLink].style.color = newUIColor;
    localStorage.setItem('UI_COLOR', newUIColor);
    updateUI(newUIColor);
    //DARK MODE
    localStorage.setItem('DARK_MODE', document.querySelector('#dark-mode-toggle').checked);
    toggleDarkMode(document.querySelector('#dark-mode-toggle').checked);
    //SET LANDING PAGE
    let newLandingPage = document.querySelector('#select-landing-page').value;
    document.querySelector('#current-landing-page').innerText = newLandingPage;
    document.querySelector('#select-landing-page').value = newLandingPage;
    localStorage.setItem('LANDING_PAGE', newLandingPage);
    //SET DEFAULT PROJECT
    let newDefaultProject = document.querySelector('#select-default-project').value;
    let newDefaultProjectLabel = document.querySelector('#select-default-project').options[document.querySelector('#select-default-project').selectedIndex].label;
    let newDefaultProjectImage = 'assets/images/thumbnails/'+document.querySelector('#select-default-project').options[document.querySelector('#select-default-project').selectedIndex].label.toLowerCase()+'.png';
    localStorage.setItem('DEFAULT_PROJECT', newDefaultProject);
    localStorage.setItem('DEFAULT_PROJECT_LABEL', newDefaultProjectLabel);
    localStorage.setItem('DEFAULT_PROJECT_IMAGE', newDefaultProjectImage);
    updateDefaultProject(newDefaultProject, newDefaultProjectLabel, newDefaultProjectImage);
    //NOTIFY SETTINGS SAVED
    notifySettings('SETTINGS SAVED', newUIColor);
});

//RESET SETTINGS
document.querySelector('#reset').addEventListener('click', () => {
    //RESET UI COLOR
    document.querySelectorAll('.link a')[activeLink].style.color = '#ff009d';
    updateUI('#ff009d');
    //RESET LANDING PAGE
    document.querySelector('#current-landing-page').innerText = 'PROJECTS';
    document.querySelector('#select-landing-page').value = 'PROJECTS';
    localStorage.setItem('LANDING_PAGE', 'PROJECTS');
    //RESET DEFAULT PROJECT
    updateDefaultProject('projects/graphics/js_canvas/flowing_squares/index.html', 'FLOWING SQUARES', 'assets/images/thumbnails/flowing squares.png');
    //NOTIFY SETTINGS RESET
    notifySettings('SETTINGS RESET', '#ff009d');
});

//NOTIFY SETTINGS STATE
var opacityFade = 0;
function notifySettings(notifyText, color) {
    document.querySelector('#setting-state').innerText = notifyText;
    document.querySelector('#setting-state').style.color = color;
    document.querySelector('#setting-state').style.opacity = 1;
    opacityFade = 20;
    fadeLoop();
}
//NOTIFICATION FADE
function fadeLoop() {
    if (opacityFade > 0) requestAnimationFrame(fadeLoop);
    opacityFade -= 0.1;
    document.querySelector('#setting-state').style.opacity = opacityFade;
}

//DARK MODE VARIABLES
var defaultLinkColor = 'rgb(30, 30, 30)',
    logoHoverColor = 'black';

//DARK MODE
function toggleDarkMode(state) {
    if (state === true || state === 'true') {
        document.querySelector('#dark-mode-toggle').checked = true;
        document.querySelector('#current-dark-mode-state').innerText = 'ENABLED';
        document.body.classList.add('dark-toggle');
        defaultLinkColor = 'rgb(230, 230, 230)';
        logoHoverColor = 'white';
    } else {
        document.querySelector('#dark-mode-toggle').checked = false;
        document.querySelector('#current-dark-mode-state').innerText = 'DISABLED';
        document.body.classList.remove('dark-toggle');
        defaultLinkColor = 'rgb(30, 30, 30)',
        logoHoverColor = 'black';
    }
    document.querySelectorAll('.link a')[0].style.color = defaultLinkColor;
    document.querySelectorAll('.link a')[1].style.color = defaultLinkColor;
    document.querySelectorAll('.link a')[2].style.color = defaultLinkColor;
    document.querySelectorAll('.mobile-link a')[0].style.color = defaultLinkColor;
    document.querySelectorAll('.mobile-link a')[1].style.color = defaultLinkColor;
    document.querySelectorAll('.mobile-link a')[2].style.color = defaultLinkColor;
    document.querySelectorAll('.link a')[activeLink].style.color = UI_COLOR;
    document.querySelectorAll('.mobile-link a')[activeLink].style.color = UI_COLOR;
}

//UPDATE DEFAULT PROJECT
function updateDefaultProject(project, label) {
    document.getElementById('frontframe').src = project;
    document.getElementById('project-title').innerHTML = label+`<a href="${project}", target="_blank", rel="noopener noreferrer"><img id="project-ext" src="assets/images/util/external.svg" alt="open in new tab"></a>`;
    document.querySelector('#current-default-project').innerText = label;
    document.querySelector('#select-default-project').value = project;
}

//UPDATE LANDING PAGE
function updateLandingPage(page) {
    document.querySelector('#current-landing-page').innerText = page;
    if (page === 'PROJECTS') {
        document.querySelector('#select-landing-page').value = page;
        document.querySelectorAll('.link a')[0].style.color = UI_COLOR;
        document.querySelectorAll('.mobile-link a')[0].style.color = UI_COLOR;
        document.querySelector('#projects').style.display = 'block';
        document.querySelector('#descriptions').style.display = 'none';
        document.querySelector('#settings').style.display = 'none';
        localStorage.setItem('ACTIVE_LINK', 0);
        activeLink = ACTIVE_LINK = 0;
    } else if (page === 'DESCRIPTIONS') {
        document.querySelector('#select-landing-page').value = page;
        document.querySelectorAll('.link a')[1].style.color = UI_COLOR;
        document.querySelectorAll('.mobile-link a')[1].style.color = UI_COLOR;
        document.querySelector('#projects').style.display = 'none';
        document.querySelector('#descriptions').style.display = 'block';
        document.querySelector('#settings').style.display = 'none';
        localStorage.setItem('ACTIVE_LINK', 1);
        activeLink = ACTIVE_LINK = 1;
    } else if (page === 'SETTINGS') {
        document.querySelector('#select-landing-page').value = page;
        document.querySelectorAll('.link a')[2].style.color = UI_COLOR;
        document.querySelectorAll('.mobile-link a')[2].style.color = UI_COLOR;
        document.querySelector('#projects').style.display = 'none';
        document.querySelector('#descriptions').style.display = 'none';
        document.querySelector('#settings').style.display = 'block';
        localStorage.setItem('ACTIVE_LINK', 2);
        activeLink = ACTIVE_LINK = 2;
    }
}

//UPDATE UI COLOR
function updateUI(color) {
    document.querySelector('#current-ui-color').innerText = color;
    document.querySelector('#current-ui-color').style.color = color;
    document.querySelector('#select-ui-color').value = color;

    //LOGO COLOR CHANGE
    let logo = document.querySelector('#logo');
    logo.style.backgroundColor = color;
    logo.addEventListener('mouseover', e => {if(e.target === logo) e.target.style.backgroundColor = logoHoverColor});
    logo.addEventListener('mouseout', e => {if(e.target === logo) e.target.style.backgroundColor = color});
    let footerLogo = document.querySelector('#footer-logo');
    footerLogo.style.backgroundColor = color;
    footerLogo.addEventListener('mouseover', e => {if(e.target === footerLogo) e.target.style.backgroundColor = logoHoverColor});
    footerLogo.addEventListener('mouseout', e => {if(e.target === footerLogo) e.target.style.backgroundColor = color});

    //THUMBNAIL HOVER CHANGE
    let thumbnailOver = e => e.addEventListener('mouseover', e => {
        e.target.parentElement.style.border = '5px double '+color;
        e.target.parentElement.nextElementSibling.style.color = color;
    }); 
    [...document.querySelectorAll('.project .thumbnail img')].forEach(thumbnailOver);
    let thumbnailOut = e => e.addEventListener('mouseout', e => {
        e.target.parentElement.style.border = '5px double #787878';
        e.target.parentElement.nextElementSibling.style.color = defaultLinkColor;
    }); 
    [...document.querySelectorAll('.project .thumbnail img')].forEach(thumbnailOut);

    //PROJECT TEXT HOVER COLOR CHANGE
    let textOver = e => e.addEventListener('mouseover', e => e.target.style.color = color);
    [...document.querySelectorAll('.project p')].forEach(textOver);
    let textOut = e => e.addEventListener('mouseout', e => e.target.style.color = defaultLinkColor);
    [...document.querySelectorAll('.project p')].forEach(textOut);

    //MOBILE ONTOUCH TEXT AND THUMBNAIL COLOR CHANGE
    let mobileTouchStart = e => e.addEventListener('touchstart', e => e.target.style.color = color, {passive: true});
    [...document.querySelectorAll('.project')].forEach(mobileTouchStart);
    let mobileTouchEnd = e => e.addEventListener('touchend', e => e.target.style.color = defaultLinkColor, {passive: true});
    [...document.querySelectorAll('.project')].forEach(mobileTouchEnd);

    //NAVBAR PAGE SELECTION
    //NAVBAR LINK COLOR CHANGES
    let linkClick = e => e.addEventListener('click', e => {
        let target = e.target.getAttribute('data-show');
        document.querySelector('#menu-btn').checked = false;
        document.querySelectorAll('.link a')[0].style.color = defaultLinkColor;
        document.querySelectorAll('.link a')[1].style.color = defaultLinkColor;
        document.querySelectorAll('.link a')[2].style.color = defaultLinkColor;
        document.querySelectorAll('.mobile-link a')[0].style.color = defaultLinkColor;
        document.querySelectorAll('.mobile-link a')[1].style.color = defaultLinkColor;
        document.querySelectorAll('.mobile-link a')[2].style.color = defaultLinkColor;
        if (target == 0) {
            document.querySelectorAll('.link a')[0].style.color = color;
            document.querySelectorAll('.mobile-link a')[0].style.color = color;
            document.querySelector('#projects').style.display = 'block';
            document.querySelector('#descriptions').style.color = defaultLinkColor;
            document.querySelector('#descriptions').style.display = 'none';
            document.querySelector('#settings').style.color = defaultLinkColor;
            document.querySelector('#settings').style.display = 'none';
            localStorage.setItem('ACTIVE_LINK', 0);
            activeLink = ACTIVE_LINK = 0;
        } else if (target == 1) {
            document.querySelectorAll('.link a')[1].style.color = color;
            document.querySelectorAll('.mobile-link a')[1].style.color = color;
            document.querySelector('#project-iframe').style.color = defaultLinkColor;
            document.querySelector('#projects').style.color = defaultLinkColor;
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#descriptions').style.display = 'block';
            document.querySelector('#settings').style.color = defaultLinkColor;
            document.querySelector('#settings').style.display = 'none';
            localStorage.setItem('ACTIVE_LINK', 1);
            activeLink = ACTIVE_LINK = 1;
        } else if (target == 2) {
            document.querySelectorAll('.link a')[2].style.color = color;
            document.querySelectorAll('.mobile-link a')[2].style.color = color;
            document.querySelector('#project-iframe').style.color = defaultLinkColor;
            document.querySelector('#projects').style.color = defaultLinkColor;
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#descriptions').style.display = 'none';
            document.querySelector('#settings').style.display = 'block';
            localStorage.setItem('ACTIVE_LINK', 2);
            activeLink = ACTIVE_LINK = 2;
        }
    });
    [...document.querySelectorAll('.link a')].forEach(linkClick);
    [...document.querySelectorAll('.mobile-link a')].forEach(linkClick);

    let linkOver = e => e.addEventListener('mouseover', e => {if (e.target.getAttribute('data-show') != activeLink) e.target.style.color = color});
    [...document.querySelectorAll('.link a')].forEach(linkOver);
    [...document.querySelectorAll('.mobile-link a')].forEach(linkOver);
    let linkOut = e => e.addEventListener('mouseout', e => {if (e.target.getAttribute('data-show') != activeLink) e.target.style.color = defaultLinkColor});
    [...document.querySelectorAll('.link a')].forEach(linkOut);
    [...document.querySelectorAll('.mobile-link a')].forEach(linkOut);
}

//HIDE/SHOW PROJECT CATEGORY ARROW
const arrowClick = e => e.addEventListener('click', e => {
    e.target.classList.toggle('arrow-off');
    e.target.parentElement.nextElementSibling.classList.toggle('hide');
});
[...document.querySelectorAll('.arrow')].forEach(arrowClick);

//PREVIEW PROJECT CHANGER
const projectClick = e => e.addEventListener('click', e => {
    if (e.target.nodeName.toLowerCase() === "img") {
        let src = e.target.getAttribute('data-src');
        document.getElementById('frontframe').src = src;
        document.getElementById('project-title').innerHTML = e.target.parentElement.nextElementSibling.innerText+`<a href="${src}", target="_blank", rel="noopener noreferrer"><img id="project-ext" src="assets/images/util/external.svg" alt="open in new tab"></a>`;
        window.scrollTo(0, 0);
    }
});
[...document.querySelectorAll('#projects .category .grid .project .thumbnail')].forEach(projectClick);

//SET DEFAULT PROJECT
DEFAULT_PROJECT ? updateDefaultProject(DEFAULT_PROJECT, DEFAULT_PROJECT_LABEL, DEFAULT_PROJECT_IMAGE) 
                : updateDefaultProject(defaultProject, defaultProjectLabel, defaultProjectImage);
                
//SET LANDING PAGE
updateLandingPage(LANDING_PAGE ? LANDING_PAGE : defaultLandingPage);

//SET ACTIVE LINK
activeLink = ACTIVE_LINK ? parseInt(ACTIVE_LINK, 10) : 0;

//SET UI COLOR
updateUI(UI_COLOR ? UI_COLOR : defaultUIColor);

//SET DARK MODE
toggleDarkMode(DARK_MODE ? DARK_MODE : defaultDarkMode);