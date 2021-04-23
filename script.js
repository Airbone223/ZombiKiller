let $easy = document.querySelector(".easy")
let $hard = document.querySelector(".hard")
let difficult = 'easy';
let $difficultType = document.querySelector(".difficultType")
let $menu = document.querySelector(".menu")
let $zombCounter  = document.querySelector(".zombCounter")
let numberOfZombie = 0

$easy.classList.add("choosen")
$easy.addEventListener('click', easyChoos)
$hard.addEventListener('click', hardChoos)
function easyChoos() {
  $easy.classList.add("choosen")
  $hard.classList.remove("choosen")
  difficult = 'easy'
  $difficultType.setAttribute('src', 'images/easy.png' )
}
function hardChoos() {
  $hard.classList.add("choosen")
  $easy.classList.remove("choosen")
  difficult = 'hard'
  $difficultType.setAttribute('src', 'images/hard.png' )
}
let $field = document.querySelector('.field')
let $start = document.querySelector('.start')
let $person = document.querySelector('.person')
$start.addEventListener('click', startGame)

let $dead = document.querySelector(".dead")
let $win = document.querySelector(".win")


function startGame() {
  $person.removeEventListener('click', onClick)
  $menu.classList.add("hidden")
  let zombNumber = 0
  if (difficult === "easy") {
    zombNumber = 30
    timer = 1500
  } else {
    zombNumber = 60
    timer = 1000
  }
zombStartRender(zombNumber)
zombRender(timer)

}


function victory() {
  sound('win.mp3')
  $person.addEventListener('click', onClick)
  clearInterval(zombRenderInterval)
  $win.classList.remove("hidden")
  setTimeout(()=>{
    $menu.classList.remove("hidden")
    $win.classList.add("hidden")
  },2000)
  numberOfZombie = 0
  $zombCounter.textContent = numberOfZombie
}



function sound(src) {
  let audio = new Audio(); 
  audio.src = src; 
  audio.autoplay = true;
}


function dead () {
  sound('dead.mp3')
  clearInterval(zombRenderInterval)
  document.querySelectorAll(".zombies").forEach(e => e.parentNode.removeChild(e));
  $person.classList.add("rotate")
  clearInterval(zombRenderInterval)
  $person.addEventListener('click', onClick)
  $dead.classList.remove("hidden")
setTimeout(()=>{
  numberOfZombie = 0
  $zombCounter.textContent = 0
  $dead.classList.add("hidden")
  $menu.classList.remove("hidden")
  $person.classList.remove("rotate")
},2000)

}

function zombStartRender (zombNumber) {
  let i =0
  let interval = setInterval(()=>{
      renderZomb()
    i++
    if (i>=zombNumber) {
      clearInterval(interval)
      numberOfZombie = i
      $zombCounter.textContent = numberOfZombie
    } 
  },10)
  
  }


  let zombRenderInterval


function zombRender(timer) {
zombRenderInterval = setInterval(()=>{
    renderZomb()
    numberOfZombie++
    $zombCounter.textContent = numberOfZombie
  }, timer)}
  



function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function show($el) {
    $el.classList.remove('hide')
  }
  
  function hide($el) {
    $el.classList.add('hide')
  }


$person.addEventListener('click', onClick)
function onClick (e) {
  let player = e.target.src
 
if (player.endsWith('knight.png')) {
 e.target.setAttribute('src', "images/berserk.png")
} else { e.target.setAttribute('src', "images/knight.png")}
}


$field.addEventListener('click', handleZombClick)

function handleZombClick(event) {

  if (event.target.hasAttribute('zomb')) {
    event.target.removeAttribute('zomb')
    sound('kill.mp3')
    event.target.classList.add('blud')
   numberOfZombie--
   $zombCounter.textContent = numberOfZombie
  setTimeout(()=>{
    event.target.remove()
  }, 300)
   if (numberOfZombie <= 0) {
    victory()
  }
  }
}


  function renderZomb () {
    
    let bacground = ['zomb1', 'zomb2', 'zomb3', 'zomb4','zomb5']
    let randomIndex = getRandom(0, bacground.length)
    let zomb = document.createElement('div')
    let zombSize = 120
    let fieldSize = $field.getBoundingClientRect()
    let maxTop = fieldSize.height - zombSize
    let maxLeft = fieldSize.width - zombSize
    zomb.style.position = 'absolute'
    zomb.style.height = zomb.style.width = `${zombSize}px`
    zomb.style.top = `${getRandom(0, maxTop)}px`
    zomb.style.left = `${getRandom(0, maxLeft)}px`
    zomb.setAttribute('zomb', 'true')
    zomb.classList.add(`${bacground[randomIndex]}`)
    zomb.classList.add("allZombies")
    zomb.classList.add("zombies")
    $field.append(zomb)
    if (numberOfZombie > 100) {
      dead()
     }

  }