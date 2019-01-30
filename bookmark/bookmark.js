const webName = document.querySelector('.js-form'),
    inputSite = document.querySelector('.name-input'),
    inputUrl = document.querySelector('.url-input'),
    siteList = document.querySelector('.js-siteList');

const SITE = 'site';

let list = [];

function deleteSite(event){    
    const target = event.target;
    const parent = target.parentNode;
    
    siteList.removeChild(parent);
    list.splice(parent.id,1);
    saveList();
}

function saveList(){
    localStorage.setItem(SITE, JSON.stringify(list));
}

function paintList(siteName, siteUrl){
    const li = document.createElement('li');
    const linkBtn = document.createElement('a');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    const id = list.length;
    delBtn.innerText = '❌';
    linkBtn.classList.add('link');
    linkBtn.innerText = 'link';
    linkBtn.href = ''+siteUrl;
    span.innerText = siteName;
    delBtn.addEventListener('click', deleteSite);
    console.log(siteUrl);
    li.id = id;
    li.appendChild(span);
    li.appendChild(linkBtn);
    li.appendChild(delBtn);
    siteList.appendChild(li);
    const siteObj = {
        name: siteName,
        url: siteUrl
    };
    list.push(siteObj);
    saveList();
}

function validateForm(name, url){
    if(!name || !url) {
        alert('please fill in the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!url.match(regex)){
        alert('please type right url');
        return false;
    }
    return true;
}

function handleSubmit(event){
    event.preventDefault();
    const siteName = inputSite.value;
    const siteUrl = inputUrl.value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }
    paintList(siteName, siteUrl);
    inputSite.value = '';
    inputUrl.value = '';
}

function loadSite() {
    const loadedSite = localStorage.getItem(SITE);
    if(loadedSite !== null) {
        const parsedSite = JSON.parse(loadedSite);
        parsedSite.forEach(function(parsed){
            paintList(parsed.name,parsed.url);
        });
    }
}

function init(){
    loadSite();
    webName.addEventListener('submit', handleSubmit);
}

init();