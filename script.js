const menu = document.getElementById('menu');
const burgerMenu = document.getElementById('burgerMenu');
const planetList = document.querySelectorAll('.planetlist');
const rotation = document.getElementById('rotation');
const revolution = document.getElementById('revolution');
const radius = document.getElementById('radius');
const temp = document.getElementById('temp');
const planetName = document.getElementById('planetName');
const planetInfo = document.getElementById('planetInfo');
const review = document.querySelectorAll('.review');
const wikipedia = document.getElementById('wikipedia');
const planetImg = document.getElementById('planetimg');
const planetGeology = document.getElementById('planetGeology');
const overview = document.querySelectorAll('.overView-withNumber');


function removeColor() {
    for(let i of overview[0].childNodes) {
        if(i.tagName === "P") {
            i.classList.remove(planetName.textContent.toLocaleLowerCase());
        }
    }
}

overview[0].addEventListener('click',(event) => {
    const target = event.target;
    removeColor();
    if(target.tagName === "P") {
        target.classList.add(planetName.textContent.toLocaleLowerCase())
    }
})

menu.addEventListener('click', () => {
    burgerMenu.style.display = burgerMenu.style.display === 'flex' ? 'none' : 'flex';
    menu.style.opacity = burgerMenu.style.display === 'flex' ? .5 : 1;
})

window.addEventListener('resize', () => {
    window.innerWidth < 768 ? burgerMenu.style.display = burgerMenu.style.display : burgerMenu.style.display = "none";
    if(burgerMenu.style.display === 'none') {
        menu.style.opacity = 1;
    }
})

const planetAPI = async (planet) => {
        try {
            const api = await fetch('https://planets-api.vercel.app/api/v1/planets/'+ planet);
            const data = await api.json()
            rotation.textContent = data.rotation;
            revolution.textContent = data.revolution;
            radius.textContent = data.radius;
            temp.textContent = data.temperature;
            planetImg.classList.remove(planetName.textContent)
            planetName.textContent = data.name;
            planetImg.classList.add(planetName.textContent)
            planetInfo.textContent = data.overview.content;
            wikipedia.href = data.overview.source;
            planetImg.src = data.images.planet;
            planetGeology.style.display = 'none';

            review.forEach(i => {
                i.addEventListener('click', (event) => {
                    if(event.target.tagName === 'P') {
                        const attribute = event.target.getAttribute('value')
                        const imgAttribute = event.target.getAttribute('data')
                        planetInfo.textContent = data[attribute].content;
                        wikipedia.href = data[attribute].source;
                        planetGeology.style.display = 'none';
                        if(imgAttribute === 'planet') planetImg.src = data.images.planet;
                        else if(imgAttribute === 'internal') planetImg.src = data.images.internal;
                        else  {
                            planetImg.src = data.images.planet;
                            planetGeology.src = `assets/${planetName.textContent}.png`;
                            planetGeology.style.display = 'block';
                        }
                    }
                })
            })

        } catch (error) {
            console.log(error);
        }
    }

planetList.forEach(i => {
    i.addEventListener('click', (event) => {
        removeColor()
        const planet = event.target.getAttribute('value') === null ? event.target.textContent : event.target.getAttribute('value')
        planetAPI(planet);
        if(event.currentTarget.className.split(' ')[1] === "just") {
            burgerMenu.style.display = 'none';
        }
        if(burgerMenu.style.display === 'none') {
            menu.style.opacity = 1;
        }
    })
})

planetAPI('mercury');