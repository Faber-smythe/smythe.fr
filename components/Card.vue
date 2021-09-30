<template>
  <div class="card">
    <h2>{{ project.title }}</h2>
    <div class="filter"></div>
    <div class="imgHolder">
      <div class="img" :style="`background-image: url('${imagePath}')`">
        <a
          v-if="!(isMobile || isSmartPhone)"
          :href="project.link"
          target="_blank"
        >
        </a>
      </div>
    </div>
    <div class="desc">
      <p class="cardName">{{ project.title }}</p>
      <p v-html="project.desc"></p>
      <p class="previewLink">
        <a :href="project.link" target="_blank">View project</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
// libs
import { Mixins, Prop, Component } from 'vue-property-decorator'
// components
import { UtilMixins } from '@/utils/mixin'
// types
import Project from '@/utils/project'

@Component
export default class Card extends Mixins(UtilMixins) {
  @Prop({ type: Object, required: true }) readonly project!: Project
  imagePath = require(`@/assets/img/${this.project.image}`)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;900&display=swap');

.card {
  position: relative;
  z-index: 0;
  width: 50vw;
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -1px;
}

.card,
.card .imgHolder,
.card .img,
.card h2,
.card .desc,
.card .filter {
  transition: all 0.5s ease;
}

.card h2,
.card .filter {
  position: absolute;
  pointer-events: none;
}

.card .imgHolder {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card .img {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.card .img a {
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.card h2 {
  font-family: 'Roboto', sans-serif;
  color: white;
  font-size: 2.5em;
  z-index: 2;
}

.card .filter {
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
  z-index: 1;
}

.card .desc {
  position: absolute;
  z-index: -1;
  left: -20px;
  height: 40%;
  width: 25vw;
  padding: 0px 20px;
  border-left: 40px solid transparent;
  border-color: var(--highlight);
  background: var(--background-transp);
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.card .cardName {
  text-transform: uppercase;
  font-size: 1.5em;
  margin: 5px;
}

.card .desc a {
  color: var(--link);
  cursor: pointer;
}
.card .desc p {
  text-align: right;
  margin: 5px 0px;
  color: var(--text);
}
.card .previewLink {
  font-weight: 900;
}

.card:hover h2 {
  opacity: 0;
  transform: scale(0.8);
}
.card:hover .filter {
  opacity: 0;
}
.card:hover .img {
  transform: scale(1.1);
}
.card:hover .desc {
  left: -25vw;
  height: 100%;
}

@media screen and (max-width: 1024px) {
  .card {
    width: 100%;
    height: 50%;
    margin: -2px;
  }

  .card h2 {
    font-size: 1.4em;
    text-align: center;
  }

  .card .cardName {
    text-transform: uppercase;
    font-size: 1em;
    margin: 5px;
  }

  .card .desc {
    position: absolute;
    z-index: -1;
    left: 0vw;
    width: 50vw;
    height: 100%;
    padding: 10px;
    border: none;
    background: rgba(255, 255, 255, 1);
    font-family: 'Roboto', sans-serif;
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  .card:hover {
    width: 50vw;
    margin-left: 50vw;
  }
  .card:hover .desc {
    left: -50vw;
    padding: 5px;
    border: none;
  }
}

@media screen and (max-width: 1024px) and (orientation: portrait) {
  .card {
    height: calc(101vh / 3);
  }
}
@media screen and (max-width: 1024px) and (orientation: landscape) {
  .card {
    height: 51vh;
  }
}
</style>
