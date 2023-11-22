const MAX_SKILL_LEVEL = 5
const Name = new Map()
Name.set('html','HTML')
Name.set('css','CSS')
Name.set('vue','Vue.js')
Name.set('pug','Pug')
Name.set('sass','Sass(Scss)')
Name.set('go','Go言語')
Name.set('git','Git')
Name.set('aws','AWS (Amazon Web Service)')
Name.set('postgres','PostgreSQL')
Name.set('javascript','JavaScript')
Name.set('nodejs','Node.js')
Name.set('typescript','TypeScript')
Name.set('java','Java')
Name.set('cs','C#')
Name.set('py','Python')
Name.set('vite','vite')
Name.set('gulp','Gulp.js')
Name.set('vscode','Visual Studio Code')

function skillicon(t)  {
    return `<img src="https://skillicons.dev/icons?i=${t}">`
}

function skilllevel(v){
    const level = function(){
        const l = v.getAttribute('@level')
        if(l > MAX_SKILL_LEVEL){
            return MAX_SKILL_LEVEL
        }
        return l?l:1
    }()
    const star = "★".repeat(level)+"☆".repeat(MAX_SKILL_LEVEL-level)
    return `<span class="skill-level">${star}</span>`
}
function skillname(t) {
    const name = Name.get(t)
    return `<h3 id="skill-${t}" class="skill-name">${name}</h3>`
}

function skillset(skills){
    skills
    .forEach(v =>{
        const skill = v.getAttribute('@skillset')
        const e = document.createElement('span')
        // e.setAttribute('id',`skill-${skill}`)
        e.setAttribute('class','skillset')
        const level = skilllevel(v)
        e.innerHTML = `${skillicon(skill)}<div class="skill-view">${skillname(skill)}${skilllevel(v)}</div>`
        v.replaceWith(e)
    })
}

function imageWithTitle(skills){
    skills.forEach(v=>{
        const skill = v.getAttribute('@skill')
        const wrapper = document.createElement('a')
        const href = ()=>{
            if(v.hasAttribute('href')) {
                return `./skill.html#skill-${v.getAttribute('href')}`
            }
            return `./skill.html#skill-${skill}`
        }
        wrapper.setAttribute('href',href())
        const img = document.createElement('img')
        wrapper.appendChild(img)
        img.setAttribute('src',`https://skillicons.dev/icons?i=${skill}`)
        img.setAttribute('title',Name.get(skill))
        v.replaceWith(wrapper)
    })
}

function main(event){
    const skills = Array.from(document.querySelectorAll('i')).filter(v =>v.hasAttribute('@skill'))
    // console.debug(skills)
    imageWithTitle(skills)

    const skillsets = Array.from(document.querySelectorAll('i')).filter(v =>v.hasAttribute('@skillset'))
    // console.debug(skillsets)
    if(skillsets.length > 0) {
        skillset(skillsets)
    }
}


document.addEventListener('DOMContentLoaded',main)