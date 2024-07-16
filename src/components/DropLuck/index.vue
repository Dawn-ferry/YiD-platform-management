<template>
  <div class="dropluck">
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
    <div class="drop"></div>
  </div>
</template>

<script>
export default {
  name: "DropLuck",
  mounted() {
    this.dropAni()
    document.addEventListener(
      "mousewheel",
      function (e) {
        e.preventDefault()
      },
      { passive: false }
    )
  },
  methods: {
    dropAni() {
      let arr = ["暴富", "开心", "变帅", "有钱", "脱单", "顺利", "平安", "健康", "喜乐"]
      let dropArr = document.getElementsByClassName("drop")
      for (let i = 0; i < dropArr.length; i++) {
        let index = parseInt(Math.random() * arr.length, 10)
        dropArr[i].innerHTML = `<span>${arr[index]}</span>`
        dropArr[i].style.left = Math.random() * 330 + "px"
        dropArr[i].style.animation = `drop${i % 3} ${Math.floor(Math.random() * (7 - 5 + 1) + 5)}s ${Math.random() * 3}s infinite`
      }
    },
  },
}
</script>

<style>
@import "./luck.scss";
</style>
