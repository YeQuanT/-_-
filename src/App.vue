<template>

  <div id="app">
    <iframe id="geoPage" width=0 height=0 frameborder=0 style="display:none;" scrolling="no" src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></iframe>
    <shelf/>
  </div>
</template>
<script>
import shelf from './components/shelf'
export default {
  components:{
    shelf
  },
  mounted() {
    this.tmap()
  },
  methods: {
    tmap() {

        window.addEventListener('message', function(event) {

          var loc = event.data;

          this.opp = loc.city;

          console.log(opp)  // 显示你当前位置

        }, false); 

    }
  },
}
</script>
<style>
@import url('./assets/css/base.css');
</style>
