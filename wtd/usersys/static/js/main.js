const pencil = document.querySelector('.pencil');
const logo = document.querySelector('.logo-title');
const linkReg = document.querySelector('.reg');
const linkLog = document.querySelector('.log');
const logoImg = document.querySelector('.logoImg')
const arrow1 = document.querySelector('#arrow1')
const arrow2 = document.querySelector('#arrow2')
const screen1 = document.querySelector('.first-screen')
const screen2 = document.querySelector('.second-screen')
const screen3 = document.querySelector('.third-screen')
const goBtn = document.querySelector('.go-link')




logo.addEventListener('click', () => {
    
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
    // scrollTo(screen2)
})

arrow1.addEventListener('click', () => {
    let way2 = screen2.offsetTop
    window.scrollTo({
        top: way2,
        left: 0,
        behavior: "smooth"
    })
    // scrollTo(goBtn)
})

arrow2.addEventListener('click', () => {
    let way2 = screen3.offsetTop
    window.scrollTo({
        top: way2,
        left: 0,
        behavior: "smooth"
    })
})


// $(document).ready(function(){
//     if ( $(" .pencil ").visible() ) {
        
//     }
// });


// $(" .pencil ").fadeIn(2000, function(){
//     console.log("All done");
// });


let body = window.pageYOffset


window.onscroll = () =>{
    let body = window.pageYOffset
    
    if ((body >= screen2.offsetTop) && body < (screen3.offsetTop)+50 ) {
        logo.classList.add('l-title')
        logoImg.src = "/static/img/logo-img-black.png"
        linkReg.classList.add('grad-link')
        linkReg.style.color = "black"
        linkLog.style.color = "black"
        linkLog.classList.add('grad-link')
        
        
    }else if (body < screen2.offsetTop || body > screen2.offsetTop) {
        logo.style.color = "white"
        logo.classList.remove('l-title')
        logoImg.src = "/static/img/logo-img-white.png"
        linkReg.classList.remove('grad-link')
        linkReg.style.color = "white"
        linkLog.style.color = "white"
        linkLog.classList.remove('grad-link')
        
        
    }   
}

