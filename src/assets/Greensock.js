import { TimelineMax, TweenLite, TweenMax } from 'gsap';


export const slideUp = () => {
  const input = new TimelineMax()
  input.to(".InputComponent", .2, {top: '-30vh'})
}
