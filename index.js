// créer un effet de survol pour chaque élément de navigation du portfolio
const allLinks = gsap.utils.toArray('.nav .menu ul li');
const navToggle = document.querySelector('.toggle-btn');


console.log(allLinks);

let t1 = new TimelineMax({ paused: true});
t1
  .to('.outer-content .title', 1, {opacity: 0})
  .to('.menu > .nav > .menu', 2, { left: "9.75rem", ease: Expo.easeInOut }, "-=1")
  .staggerFrom(".menu ul li", 2, { y: 20, opacity: 0, ease: Expo.easeInOut }, 0.1)
  .to(".images", 2, { width: "45%", ease: Expo.easeInOut, delay: -2 }, "-=1")
  .reverse();

navToggle.addEventListener('click', () => {
  t1.reversed(!t1.reversed());
})



function initPortfolioHover() {
  allLinks.forEach( link => {
      link.addEventListener('mouseenter', createPortfolioHover)
  });
}

function createPortfolioHover({type, target}) {
  if(type === 'mouseenter') {

    const {imagelarge} = target.dataset;
    const allSiblings = allLinks.filter( link => link !== target);
    const tl = gsap.timeline();
    tl
    .set('.images', { backgroundImage : `url(${imagelarge})`})
    .to('.images', { autoAlpha: 1})
    .to(allSiblings, { color: '#fff', autoAlpha: 0.2}, 0)
    .to(target, { color: '#fff', autoAlpha: 1}, 0)

  } else if(type === 'mouseleave') {
    const tl = gsap.timeline();
      tl
      .to('.images', {autoAlpha: 0})
      .to(allLinks, {color: '#000', autoAlpha: 1}, 0)
  }
}

function init(){
  // start here
  initPortfolioHover();
}

window.addEventListener('load', function(){
  init();


});