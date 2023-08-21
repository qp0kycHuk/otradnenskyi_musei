import UI from './ui/js/index'
import phonemask from './phonemask';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import LocomotiveScroll from 'locomotive-scroll';



UI.init()

const gsapAnimation = {
  fadeInLeft: {
    from: { x: '-50%', opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  fadeInRight: {
    from: { x: '50%', opacity: 0 },
    to: { x: 0, opacity: 1 }
  },
  fadeInUp: {
    from: { y: '50%', opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  fadeInDown: {
    from: { y: '-50%', opacity: 0 },
    to: { y: 0, opacity: 1 }
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
}

document.addEventListener('DOMContentLoaded', () => {
  // set scrollbar width to css variable
  let div = document.createElement('div');
  div.style.overflowY = 'scroll', div.style.width = '50px', div.style.height = '50px', document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  document.body.style.setProperty('--scrollbar-width', scrollWidth + 'px')

  // mask
  phonemask.init('[type="tel"]');

  // init gsap animation
  gsap.registerPlugin(ScrollTrigger);

  const scrollElements = document.querySelectorAll('.gsap-scroll');
  scrollElements.forEach((element) => {
    const key = element.getAttribute('data-animation')
    const duration = element.getAttribute('data-duration') || 1.00
    const end = element.getAttribute('data-end') || 'top center'
    const delay = element.getAttribute('data-delay') || 0.100

    gsap.fromTo(element, gsapAnimation[key].from, {
      ...gsapAnimation[key].to,
      // opacity: 1,
      // x: 0,
      // y: 0,
      duration,
      delay,
      scrollTrigger: {
        trigger: element,
        start: "top 95%",
        end: end,
        // scrub: true,
        // markers: true,
        // id: "scrub"
      }
    });

  })

  const animElements = document.querySelectorAll('.gsap');
  animElements.forEach((element) => {
    const key = element.getAttribute('data-animation')
    const duration = element.getAttribute('data-duration') || 1.00
    const end = element.getAttribute('data-end') || 'top center'
    const delay = element.getAttribute('data-delay') || 0.100

    gsap.fromTo(element, gsapAnimation[key].from, {
      ...gsapAnimation[key].to,
      // opacity: 1,
      // x: 0,
      // y: 0,
      duration,
      delay
    });

  })

  gsap.to('[data-parallax]', {
    y: 200,
    scrollTrigger: {
      trigger: '[data-parallax]',
      start: "top top",
      end: 'bottom top',
      scrub: true,
      // markers: true,
      // id: "scrub"
    }
  });

})


document.addEventListener('toggleopen', toggleHandler)
document.addEventListener('toggleclose', toggleHandler)

function toggleHandler(event) {
  if (event.detail.target.closest('.header-nav__popup')) {
    const nav = event.detail.target.closest('.header-nav')
    const header = nav.closest('.header')
    if (nav.querySelector('.header-nav__popup-inner.toggle-active')) {
      nav.classList.add('popup-active')
      header.classList.add('popup-active')
    } else {
      nav.classList.remove('popup-active')
      header.classList.remove('popup-active')

    }
  }
}

window.addEventListener('scroll', (event) => {
  if (window.pageYOffset > 10) {
    document.querySelector('.header').classList.add('header--scrolled')
  } else {
    document.querySelector('.header').classList.remove('header--scrolled')

  }
})