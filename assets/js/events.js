//DEFAULT SETTINGS
let activeLink = 0;

//GET SETTINGS
let DEFAULT_PROJECT = localStorage.getItem('DEFAULT_PROJECT');
let DEFAULT_PROJECT_LABEL = localStorage.getItem('DEFAULT_PROJECT_LABEL');
let DEFAULT_PROJECT_IMAGE = localStorage.getItem('DEFAULT_PROJECT_IMAGE');
let LANDING_PAGE = localStorage.getItem('LANDING_PAGE');
let UI_COLOR = localStorage.getItem('UI_COLOR');

//DEFAULT PROJECT
DEFAULT_PROJECT ? updateDefaultProject(DEFAULT_PROJECT, DEFAULT_PROJECT_LABEL, DEFAULT_PROJECT_IMAGE) : updateDefaultProject('projects/graphics/js_canvas/flowing_squares/index.html', 'FLOWING SQUARES', 'assets/images/thumbnails/flowing squares.png');

//LANDING PAGE
LANDING_PAGE ? updateLandingPage(LANDING_PAGE) : updateLandingPage('PROJECTS');

//UI COLOR
UI_COLOR ? updateUI(UI_COLOR) : updateUI('#ff009d');

//SAVE SETTINGS
document.querySelector('#save').addEventListener('click', () => {
    //SET UI COLOR
    let newUIColor = document.querySelector('#select-ui-color').value;
    document.querySelectorAll('.link a')[activeLink].style.color = newUIColor;
    updateUI(newUIColor);
    //SET LANDING PAGE
    let newLandingPage = document.querySelector('#select-landing-page').value;
    document.querySelector('#current-landing-page').innerText = newLandingPage;
    document.querySelector('#select-landing-page').value = newLandingPage;
    localStorage.setItem('LANDING_PAGE', newLandingPage);
    //SET DEFAULT PROJECT
    let newDefaultCanvas = document.querySelector('#select-default-project').value;
    let newDefaultCanvasLabel = document.querySelector('#select-default-project').options[document.querySelector('#select-default-project').selectedIndex].label;
    let newDefaultCanvasImage = 'assets/images/thumbnails/'+document.querySelector('#select-default-project').options[document.querySelector('#select-default-project').selectedIndex].label.toLowerCase()+'.png';
    updateDefaultProject(newDefaultCanvas, newDefaultCanvasLabel, newDefaultCanvasImage);
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
});

//UPDATE DEFAULT PROJECT
function updateDefaultProject(project, label, image) {
    document.getElementById('frontframe').src = project;
    document.getElementById('project-title').innerHTML = label+`<a href="${project}", target="_blank", rel="noopener noreferrer"><img id="project-ext" src="assets/images/util/external.svg" alt="open in new tab"></a>`;
    document.querySelector('#current-default-project').innerText = label;
    document.querySelector('#select-default-project').value = project;
    localStorage.setItem('DEFAULT_PROJECT', project);
    localStorage.setItem('DEFAULT_PROJECT_LABEL', label);
    localStorage.setItem('DEFAULT_PROJECT_IMAGE', image);
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
    } else if (page === 'DESCRIPTIONS') {
        document.querySelector('#select-landing-page').value = page;
        document.querySelectorAll('.link a')[1].style.color = UI_COLOR;
        document.querySelectorAll('.mobile-link a')[1].style.color = UI_COLOR;
        document.querySelector('#projects').style.display = 'none';
        document.querySelector('#descriptions').style.display = 'block';
        document.querySelector('#settings').style.display = 'none';
    } else if (page === 'SETTINGS') {
        document.querySelector('#select-landing-page').value = page;
        document.querySelectorAll('.link a')[2].style.color = UI_COLOR;
        document.querySelectorAll('.mobile-link a')[2].style.color = UI_COLOR;
        document.querySelector('#projects').style.display = 'none';
        document.querySelector('#descriptions').style.display = 'none';
        document.querySelector('#settings').style.display = 'block';
    }
}

//UPDATE UI COLOR
function updateUI(color) {
    localStorage.setItem('UI_COLOR', color);
    document.querySelector('#current-ui-color').innerText = color;
    document.querySelector('#current-ui-color').style.color = color;
    document.querySelector('#select-ui-color').value = color;

    //LOGO COLOR CHANGE
    let logo = document.querySelector('#logo');
    logo.style.backgroundColor = color;
    logo.addEventListener('mouseover', e => {if(e.target === logo) e.target.style.backgroundColor = 'black'});
    logo.addEventListener('mouseout', e => {if(e.target === logo) e.target.style.backgroundColor = color});
    let footerLogo = document.querySelector('#footer-logo');
    footerLogo.style.backgroundColor = color;
    footerLogo.addEventListener('mouseover', e => {if(e.target === footerLogo) e.target.style.backgroundColor = 'black'});
    footerLogo.addEventListener('mouseout', e => {if(e.target === footerLogo) e.target.style.backgroundColor = color});

    //THUMBNAIL HOVER CHANGE
    let thumbnailOver = e => e.addEventListener('mouseover', e => {
        e.target.parentElement.style.border = '5px double '+color;
        e.target.parentElement.nextElementSibling.style.color = color;
    }); 
    [...document.querySelectorAll('.project .thumbnail img')].forEach(thumbnailOver);
    let thumbnailOut = e => e.addEventListener('mouseout', e => {
        e.target.parentElement.style.border = '5px double #787878';
        e.target.parentElement.nextElementSibling.style.color = 'rgb(30, 30, 30)';
    }); 
    [...document.querySelectorAll('.project .thumbnail img')].forEach(thumbnailOut);

    //PROJECT TEXT HOVER COLOR CHANGE
    let textOver = e => e.addEventListener('mouseover', e => e.target.style.color = color);
    [...document.querySelectorAll('.project p')].forEach(textOver);
    let textOut = e => e.addEventListener('mouseout', e => e.target.style.color = 'rgb(30, 30, 30)');
    [...document.querySelectorAll('.project p')].forEach(textOut);

    //MOBILE ONTOUCH TEXT AND THUMBNAIL COLOR CHANGE
    let mobileTouchStart = e => e.addEventListener('touchstart', e => e.target.style.color = color, {passive: true});
    [...document.querySelectorAll('.project')].forEach(mobileTouchStart);
    let mobileTouchEnd = e => e.addEventListener('touchend', e => e.target.style.color = 'rgb(30, 30, 30)', {passive: true});
    [...document.querySelectorAll('.project')].forEach(mobileTouchEnd);

    //NAVBAR PAGE SELECTION
    //NAVBAR LINK COLOR CHANGES
    let linkClick = e => e.addEventListener('click', e => {
        let target = e.target.getAttribute('data-show');
        document.querySelector('#menu-btn').checked = false;
        if (target == 0) {
            document.querySelectorAll('.link a')[0].style.color = color;
            document.querySelectorAll('.link a')[1].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.link a')[2].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.mobile-link a')[0].style.color = color;
            document.querySelectorAll('.mobile-link a')[1].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.mobile-link a')[2].style.color = 'rgb(30, 30, 30)';
            document.querySelector('#projects').style.display = 'block';
            document.querySelector('#descriptions').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#descriptions').style.display = 'none';
            document.querySelector('#settings').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#settings').style.display = 'none';
            
            activeLink = 0;
        } else if (target == 1) {
            document.querySelectorAll('.link a')[0].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.link a')[1].style.color = color;
            document.querySelectorAll('.link a')[2].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.mobile-link a')[0].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.mobile-link a')[1].style.color = color;
            document.querySelectorAll('.mobile-link a')[2].style.color = 'rgb(30, 30, 30)';
            document.querySelector('#project-iframe').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#projects').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#descriptions').style.display = 'block';
            document.querySelector('#settings').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#settings').style.display = 'none';
            activeLink = 1;
        } else if (target == 2) {
            document.querySelectorAll('.link a')[0].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.link a')[1].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.link a')[2].style.color = color;
            document.querySelectorAll('.mobile-link a')[0].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.mobile-link a')[1].style.color = 'rgb(30, 30, 30)';
            document.querySelectorAll('.mobile-link a')[2].style.color = color;
            document.querySelector('#project-iframe').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#projects').style.color = 'rgb(30, 30, 30)';
            document.querySelector('#projects').style.display = 'none';
            document.querySelector('#descriptions').style.display = 'none';
            document.querySelector('#settings').style.display = 'block';
            activeLink = 2;
        }
    });
    [...document.querySelectorAll('.link a')].forEach(linkClick);
    [...document.querySelectorAll('.mobile-link a')].forEach(linkClick);

    let linkOver = e => e.addEventListener('mouseover', e => {if (e.target.getAttribute('data-show') != activeLink) e.target.style.color = color});
    [...document.querySelectorAll('.link a')].forEach(linkOver);
    [...document.querySelectorAll('.mobile-link a')].forEach(linkOver);
    let linkOut = e => e.addEventListener('mouseout', e => {if (e.target.getAttribute('data-show') != activeLink) e.target.style.color = 'rgb(30, 30, 30)'});
    [...document.querySelectorAll('.link a')].forEach(linkOut);
    [...document.querySelectorAll('.mobile-link a')].forEach(linkOut);
}

//HIDE/SHOW PROJECT CATEGORY ARROW
let arrowClick = e => e.addEventListener('click', e => {
    e.target.classList.toggle('arrow-off');
    e.target.parentElement.nextElementSibling.classList.toggle('hide');
});
[...document.querySelectorAll('.arrow')].forEach(arrowClick);

//PREVIEW PROJECT CHANGER
let projectClick = e => e.addEventListener('click', e => {
    if (e.target.nodeName.toLowerCase() === "img") {
        let src = e.target.getAttribute('data-src');
        document.getElementById('frontframe').src = src;
        document.getElementById('project-title').innerHTML = e.target.parentElement.nextElementSibling.innerText+`<a href="${src}", target="_blank", rel="noopener noreferrer"><img id="project-ext" src="assets/images/util/external.svg" alt="open in new tab"></a>`;
        window.scrollTo(0, 0);
    }
});
[...document.querySelectorAll('#projects .category .grid .project .thumbnail')].forEach(projectClick);