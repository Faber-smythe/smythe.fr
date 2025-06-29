<template>
  <main>
    <header>
      <h1>Johann Lefering / SMYTHE</h1>
      <div id="title" ref="title">
        <p>Johann&nbsp;Lefering</p>
        <p>/</p>
        <p id="h1">
          <span>S</span><span>M</span><span>Y</span><span>T</span><span>H</span
          ><span>E</span>
        </p>
      </div>
      <h2 id="subtitle">
        My taste for innovation and craftsmanship led me to study creative
        technologies.
        <br />
        After various web projects in foreign internships and a year as remote freelance, I keep working on immersive experiences in Paris.
      </h2>
    </header>
    <Scene
      :progress="scrollProgress"
      :cursor="cursor"
      :page-loaded="pageLoaded"
      @compass-loaded="compassIsLoaded()"
    />
    <div ref="up" class="angleUp" title="up">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          stroke="white"
          stroke-width="0.2em"
          d="M 23.245 12.96 l -11.245 -9.3144 l -11.219 9.3144 l -0.781 -0.4011 l 12 -9.9669 l 12 9.9733 l -0.755 0.3947 z"
        />
      </svg>
    </div>
    <div ref="down" class="angleDown" title="down">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          stroke="white"
          stroke-width="0.2rem"
          d="M 23.245 2.6244 l -11.245 9.4308 l -11.219 -9.4308 l -0.781 0.4061 l 12 10.0915 l 12 -10.098 l -0.755 -0.3996 z"
        />
      </svg>
    </div>
    <div id="scroller" ref="scroller">
      <div id="cardHolder">
        <Card
          v-for="(project, i) in projects"
          :key="`project-${i}`"
          :project="project"
          @img-load="imgIsLoaded()"
        />
        <footer v-if="isMobile || isSmartPhone">
          <svg
            style="transform: scale(0.8)"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"
            />
          </svg>
          <address>contact@smythe.fr</address>
        </footer>
      </div>
    </div>

    <footer v-if="!(isMobile || isSmartPhone)">
      <svg
        style="transform: scale(0.8)"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"
        />
      </svg>
      <address>contact@smythe.fr</address>
    </footer>
  </main>
</template>

<script lang="ts">
// libs
import { Component, Mixins } from 'vue-property-decorator'
import Scrollbar from 'smooth-scrollbar'
import { gsap, Elastic, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomEase from '@/assets/gsap/CustomEase.js'
// components
import Card from '@/components/Card.vue'
import Scene from '@/components/Scene.vue'
import { UtilMixins } from '@/utils/mixin'
// types
import Project from '@/utils/project'
import { Position2 } from '@/utils/miscellaneous'

@Component({
  components: {
    Card,
    Scene,
  },
})
export default class Smythe extends Mixins(UtilMixins) {
  pageLoaded = false
  compassLoaded = false
  loadedImages = 0
  titleAnimations: gsap.core.Timeline[] = []
  titleHoverCount = 0
  tweening = false
  projects!: Project[]
  scrollbar!: Scrollbar
  scrollProgress = 0
  cursor: Position2 = { x: 0, y: 0 }

  created() {
    this.projects = require('@/data/projects.json') as Project[]
  }

  mounted() {
    const title = this.$refs.title as HTMLElement
    const up = this.$refs.up as HTMLElement
    const down = this.$refs.down as HTMLElement
    const showTracks = !(this.isMobile || this.isSmartPhone)
    const scroller = this.$refs.scroller as HTMLElement

    const bodyScrollbar = Scrollbar.init(scroller, {
      alwaysShowTracks: showTracks,
      delegateTo: document,
    })
    bodyScrollbar.track.xAxis.element.remove()
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollbar.scrollTop = value!
        }
        return bodyScrollbar.scrollTop
      },
    })
    bodyScrollbar.addListener(ScrollTrigger.update)
    ScrollTrigger.defaults({ scroller })
    // Only necessary to correct marker position - not needed in production
    if (document.querySelector('.gsap-marker-scroller-start')) {
      const markers = gsap.utils.toArray('[class *= "gsap-marker"]')

      bodyScrollbar.addListener(({ offset }) => {
        gsap.set(markers, { marginTop: -offset.y })
      })
    }

    this.scrollbar = bodyScrollbar

    // down arrow always white on mobile
    if (this.isMobile || this.isSmartPhone) down.style.filter = 'invert(1)'

    // scroll listener
    this.scrollbar.addListener(() => {
      // handling the up and down angle
      if (this.scrollbar.scrollTop === 0) {
        up.style.display = 'none'
        if (this.isMobile || this.isSmartPhone) {
          down.style.filter = 'invert(1)'
        }
      } else {
        up.style.display = 'flex'
        if (this.isMobile || this.isSmartPhone) {
          down.style.filter = 'invert(0)'
        }
      }
      if (this.scrollbar.scrollTop === this.scrollbar.limit.y) {
        up.style.display = 'flex'
        down.style.display = 'none'
        if (this.isMobile || this.isSmartPhone) {
          // up.style.display = 'flex'
          // down.style.display = 'none'
        }
        // } else if (this.isMobile || this.isSmartPhone) {
      } else {
        down.style.display = 'flex'
        if (this.isMobile || this.isSmartPhone) {
          up.style.display = 'none'
        }
      }

      // update the scroll progress
      if (this.isMobile || this.isSmartPhone) {
        const bias = this.isLandscape ? 0.5 : 2
        let ratio = this.scrollbar.scrollTop / (window.innerHeight * bias)
        if (ratio > 1) ratio = 1
        title.style.top = `-${50 * ratio}vh`
        // set progress
        this.scrollProgress = ratio
      } else {
        // set progress
        this.scrollProgress = this.scrollbar.scrollTop / this.scrollbar.limit.y
      }

      // pull up footer for mobile
      if (this.isMobile || this.isSmartPhone) {
        // footer.style.bottom = `-${  }px`
      }
    })

    // Only for desktop
    if (!(this.isMobile || this.isSmartPhone)) {
      // register animation list
      this.prepareTitleTweens()
      // listen to title hover
      const title = this.$refs.title as HTMLElement
      title.onmouseenter = () => {
        this.titleTween()
      }

      // title scroll tween
      const titleTween = gsap.timeline({
        scrollTrigger: {
          trigger: '.card:first-of-type',
          start: 'top center',
          end: `top top`,
          toggleActions: 'play none reverse none',
          // markers: true,
          scrub: true,
        },
      })

      titleTween.to(title, { duration: 1, left: '50vw' }, 0)
      // }, 500)

      // listen to mouse sway
      document.addEventListener('mousemove', (e) => {
        this.cursor = {
          x: (e.x - window.innerWidth) / (window.innerWidth / 2) + 1,
          y: (e.y - window.innerHeight) / (window.innerHeight / 2) + 1,
        }
      })
    }

    // click on down / up arrows
    up.onclick = () => {
      this.scrollbar.scrollTo(0, 0, 500)
    }
    down.onclick = () => {
      this.scrollbar.scrollTo(0, this.scrollbar.limit.y, 500)
    }
  }

  prepareTitleTweens() {
    // STRETCH
    const stretch = gsap.timeline()
    stretch.to('#h1 span', {
      duration: 0.5,
      margin: '0px 15px',
    })
    stretch.to('#h1 span', {
      duration: 0.8,
      margin: '0px',
      ease: Elastic.easeOut.config(2, 0.3),
    })
    stretch.eventCallback('onComplete', () => {
      this.tweening = false
    })
    stretch.pause()
    this.titleAnimations.push(stretch)

    // FOCUS
    const focus = gsap.timeline()
    focus.to('#h1', { duration: 0, width: 'auto', transformOrigin: 'center' })
    focus.to('#h1', {
      duration: 0.65,
      filter: 'blur(5px)',
      transform: 'scale(0.95)',
      ease: CustomEase.create('custom', 'M0,0 C0,0 0,0 0.678,1 1,0 1,0 1,0'),
    })
    focus.to('#h1', {
      duration: 0.65,
      filter: 'blur(5px)',
      transform: 'scale(1.05)',
      ease: CustomEase.create('custom', 'M0,0 C0,0 0,0 0.33,1 1,0 1,0 1,0'),
    })
    focus.eventCallback('onComplete', () => {
      this.tweening = false
    })
    focus.pause()
    this.titleAnimations.push(focus)

    // WAVE
    const wave = gsap.timeline()
    wave.to('#h1 span', {
      duration: 0.5,
      paddingTop: '20px',
      stagger: 0.1,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0,0 0,0 0.33,1 0.33,0.996 0.331,0.992 0.331,0.988 0.426,0.712 0.474,0.54 0.66,0.27 0.77,0.126 1,0 1,0'
      ),
    })
    wave.eventCallback('onComplete', () => {
      this.tweening = false
    })
    wave.pause()
    this.titleAnimations.push(wave)

    // SPIN
    const spin = gsap.timeline()
    // spin.to('#h1', { duration: 0, width: 'auto', transformOrigin: 'center' })
    spin.to('#h1', {
      duration: 1,
      transformOrigin: '85% left',
      rotateX: '180deg',
      width: 'auto',
      ease: CustomEase.create(
        'cusom',
        'M0,0 C0,0 0.2,0.2 0.3,1 0.4,0.204 1,0 1,0 '
      ),
    })
    spin.eventCallback('onComplete', () => {
      this.tweening = false
    })
    spin.pause()
    this.titleAnimations.push(spin)

    // ANGRY
    // const angry = gsap.timeline()
    // angry.to('#h1', { duration: 0, width: 'auto', transformOrigin: 'center' })
    // angry.to('#h1', {
    //   duration: 1.5,
    //   opacity: '0',
    //   transform: 'scale(1.1)',
    //   ease: CustomEase.create(
    //     'custom',
    //     'M0,0,C0,0,0,-0.06,0.005,-0.067,0.007,-0.07,0.026,-0.056,0.03,-0.047,0.039,-0.02,0.043,0.04,0.045,0.043,0.045,0.045,0.049,0,0.05,0.002,0.051,0.006,0.061,0.084,0.075,0.117,0.079,0.128,0.1,0.144,0.105,0.139,0.116,0.129,0.136,0.055,0.14,0.059,0.145,0.065,0.141,0.166,0.15,0.196,0.151,0.202,0.174,0.193,0.18,0.199,0.194,0.215,0.205,0.259,0.215,0.267,0.218,0.27,0.232,0.257,0.235,0.249,0.24,0.233,0.236,0.197,0.24,0.194,0.242,0.192,0.255,0.23,0.26,0.23,0.263,0.231,0.269,0.198,0.27,0.2,0.272,0.207,0.272,0.305,0.29,0.325,0.301,0.338,0.36,0.304,0.372,0.316,0.388,0.333,0.386,0.428,0.39,0.431,0.392,0.433,0.402,0.35,0.405,0.347,0.406,0.345,0.408,0.384,0.415,0.39,0.418,0.394,0.436,0.38,0.44,0.384,0.449,0.397,0.45,0.433,0.465,0.456,0.493,0.501,0.526,0.552,0.56,0.573,0.575,0.582,0.62,0.549,0.63,0.559,0.642,0.572,0.639,0.653,0.64,0.656,0.64,0.657,0.644,0.602,0.645,0.603,0.646,0.607,0.663,0.707,0.665,0.711,0.665,0.712,0.665,0.684,0.67,0.67,0.674,0.657,0.687,0.632,0.69,0.636,0.699,0.653,0.737,0.795,0.745,0.809,0.746,0.812,0.751,0.782,0.76,0.773,0.773,0.758,0.804,0.733,0.81,0.739,0.821,0.752,0.82,0.834,0.83,0.852,0.832,0.857,0.854,0.84,0.862,0.839,0.864,0.839,0.867,0.844,0.867,0.847,0.871,0.882,0.872,0.95,0.875,0.951,0.877,0.951,0.879,0.855,0.885,0.849,0.887,0.845,0.91,0.895,0.915,0.9,0.916,0.901,0.919,0.883,0.92,0.883,0.921,0.89,0.932,1.007,0.935,1.006,0.937,1.006,0.931,0.882,0.94,0.881,0.948,0.88,1,1,1,1'
    //   )
    // })
    // angry.to('#h1', {
    //   duration: 1,
    //   opacity: '1',
    //   transform: 'scale(1)',
    //   ease: Power3.easeOut
    // })
    // angry.to('#h1', { duration: 0, width: '0px' })
    // angry.eventCallback('onComplete', () => {
    //   this.tweening = false
    // })
    // angry.pause()
    // this.titleAnimations.push(angry)

    // FALL
    const fall = gsap.timeline()
    fall.to('#h1', { duration: 0, width: 'auto' })
    fall.to('#h1', { duration: 1, top: '101vh', ease: Power3.easeIn })
    fall.to('#h1', {
      duration: 0.75,
      top: '70vh',
      ease: CustomEase.create(
        'custom',
        'M0,0 C0,0 0.25,1 0.5,1 0.75,1 1,0 1,0'
      ),
    })
    fall.to('#h1', {
      duration: 0,
      right: '0px',
    })
    fall.to('#h1', { duration: 1, top: '0vh', ease: Power3.easeOut })

    fall.eventCallback('onComplete', () => {
      this.tweening = false
    })
    fall.pause()
    this.titleAnimations.push(fall)

    // DOMINO
    const domino = gsap.timeline()
    domino.to('#h1 span:not(:last-child)', {
      duration: 0,
      transformOrigin: '60% 75%',
    })
    domino.to('#h1 span:last-child', {
      duration: 0,
      transformOrigin: '60% 30%',
    })
    domino.to('#h1 span:not(:last-child)', {
      duration: 1,
      rotateZ: '65deg',
      stagger: 0.2,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0,0 0,0 0.494,0.916 1,1 1,1 1,1'
      ),
    })
    domino.to('#h1 span:last-child', {
      duration: 0.5,
      rotateZ: '45deg',
      ease: CustomEase.create(
        'custom',
        'M0,0 C0,0 0.1,0.231 0.15,0.48 0.2,0.731 0.2,1 0.2,1 0.2,1 0.327,0.643 0.48,0.452 0.656,0.238 1,0 1,0'
      ),
    })
    domino.to(
      '#h1 span:not(:last-child)',
      {
        duration: 1,
        rotateZ: '0deg',
        stagger: { from: 'end', amount: 0.1, ease: Power3.easeIn },
        ease: Elastic.easeOut.config(0.8, 0.1),
      },
      1.9
    )
    domino.eventCallback('onComplete', () => {
      this.tweening = false
    })
    domino.pause()
    this.titleAnimations.push(domino)

    // shuffle the animations
    this.titleAnimations = this.titleAnimations.sort(
      (_a, _b) => 0.5 - Math.random()
    )
  }

  titleTween() {
    if (!this.tweening) {
      this.tweening = true
      const tween = this.titleAnimations[this.titleHoverCount]
      // const tween = this.titleAnimations[3]
      // const tween = this.titleAnimations[this.titleAnimations.length - 1]
      tween.play(0)
      this.titleHoverCount++
      if (this.titleHoverCount === this.titleAnimations.length) {
        this.titleHoverCount = 0
      }
    }
  }

  imgIsLoaded() {
    this.loadedImages += 1
    if (this.loadedImages === this.projects.length && this.compassLoaded)
      this.pageIsReady()
    // console.log('loaded images: ', this.loadedImages)
  }

  compassIsLoaded() {
    this.compassLoaded = true
    if (this.loadedImages === this.projects.length) this.pageIsReady()
    // console.log('compass is loaded')
  }

  pageIsReady() {
    this.pageLoaded = true
    const loadingUI = document.getElementById(
      'babylonjsLoadingDiv'
    ) as HTMLElement
    loadingUI.style.pointerEvents = 'none'
    // console.log('this.pageLoaded = true')
  }
}
</script>

<style>
html,
body {
  height: 100%;
}
header {
  position: fixed;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
}
h1 {
  display: none;
}
#scroller {
  position: fixed;
  right: 0px;
  z-index: 2;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  pointer-events: none;
}
.scrollbar-track {
  pointer-events: all;
}
#title,
#subtitle {
  margin: 2vh 35px;
}
#title {
  position: relative;
  z-index: 3;
  top: 20px;
  font-family: 'Ailerons';
  font-size: 3.5vw;
  color: var(--highlight);
  display: flex;
  align-items: center;
  width: 0px;
  height: 77px;
}
#title p {
  margin: 0px 5px;
}
#h1 {
  display: flex;
  align-items: center;
  position: relative;
  height: 77px;
}
#h1 span {
  padding: 3px;
  display: block;
}
#subtitle {
  margin-left: calc(0.5em + 35px);
  width: 40vw;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  font-size: 1.5vw;
  font-weight: 100;
}
#cardHolder {
  position: absolute;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.angleUp,
.angleDown {
  position: fixed;
  z-index: 5;
  left: calc(25vw - 12px);
  padding: 8px;
  cursor: pointer;
  transition: all 0.4s ease;
}
.angleUp:hover,
.angleDown:hover {
  opacity: 0.5;
}
.angleUp svg,
.angleDown svg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.angleUp {
  display: none;
  top: 0px;
  animation: 1.5s ease 0s infinite normal both running up;
}

.angleDown {
  bottom: 0px;
  animation: 1.5s ease 0s infinite normal both running down;
}

footer {
  position: absolute;
  z-index: 5;
  right: 0px;
  bottom: 0px;
  width: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer address {
  font-family: 'Ailerons';
  font-size: 1.5em;
  text-transform: lowercase;
  margin: 10px 20px;
}

#babylonjsLoadingDiv {
  position: fixed !important;
  z-index: 999 !important;
  left: 0px !important;
  top: 0px !important ;
  pointer-events: all !important;
  background-color: #172227 !important;
}

@keyframes down {
  50% {
    bottom: 0px;
  }
  100% {
    bottom: 5px;
  }
}
@keyframes up {
  50% {
    top: 0px;
  }
  100% {
    top: 5px;
  }
}

@font-face {
  font-family: 'Ailerons';
  src: url('/fonts/Ailerons.otf') format('otf'),
    url('/fonts/Ailerons.woff2') format('woff2'),
    url('/fonts/Ailerons.woff') format('woff');
}

@media screen and (max-width: 1024px) {
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  header {
    width: 100%;
    height: 100%;
    align-items: center;
  }
  #title {
    flex-direction: column;
    left: auto;
    font-size: 2em;
  }
  #title p {
    width: 90vw;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #subtitle {
    margin-top: 25vh;
    z-index: 1;
    text-align: center;
    width: 90vw;
    font-size: 1.1em;
    background: var(--background-transp);
    box-shadow: 0px 0px 10px 10px var(--background-transp);
    box-shadow: 0px 0px 10px 10px var(--background-transp);
  }
  .angleUp,
  .angleDown {
    left: calc(50vw - 20px);
    cursor: default;
  }
  .angleUp:hover,
  .angleDown:hover {
    opacity: 1;
  }
  #cardHolder {
    margin-top: 101vh;
    width: 100%;
    padding-bottom: calc(1.5em + 20px);
  }
  footer {
    width: 100%;
    z-index: 0;
    left: auto;
    height: calc(1.5em + 20px);
  }
}

@media screen and (max-width: 1024px) and (orientation: landscape) {
  #title {
    flex-direction: row;
    justify-content: center;
    font-size: 2em;
  }
}
</style>
