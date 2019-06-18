<template>
  <div class="pd-lg">
    <link href="static/lib/videojs/video-js.min.css" rel="stylesheet" />

    <Form class="form-flex">
      <div style="margin-bottom:20px">
        <Label for="name">拉流地址:</Label>
        <TextBox inputId="name" v-model="url" style="width:250px;"></TextBox> /
        <TextBox inputId="name" v-model="stream" style="width:100px;"></TextBox>
        <LinkButton @click="setupFlash()" style="width:80px;">连接</LinkButton>
      </div>
    </Form>
    <video id="my-player">
      <!-- <source src="rtmp://live.hkstv.hk.lxdns.com/live/hks" type="rtmp/flv"></source> -->
      <!-- <source src="rtmp://media3.sinovision.net:1935/live/livestream" type="rtmp/flv"></source> -->
      <!-- <source :src="url+'/'+stream" type="rtmp/flv"></source> -->
      <!-- <source src="rtmp://localhost/oflaDemo/chenjia" type="rtmp/flv"></source> -->
    </video>
    <RemoteScript src="static/lib/videojs/video.min.js"></RemoteScript>
  </div>
</template>

<script>
import RemoteScript from '../../components/RemoteScript'
export default {
  name: 'Video',
  components:{
    RemoteScript
  },
  data(){
    return {
      swf: 'static/lib/videojs/video-js.swf',
      url: 'rtmp://47.100.119.102:1935/hls',
      stream: 'chenjia'
    }
  },
  methods:{
    setupFlash(){
      window.videojs.options.flash.swf = this.swf
      var myPlayer = videojs('my-player',{
        width: '800px',
        height: '450px',
        autoplay: true,
        sources: [{
          src: this.url+'/'+this.stream,
          type: 'rtmp/flv'
        }]
      },function(){
        console.log(this);
      });
      myPlayer.ready(function() {
        // myPlayer.requestFullscreen();
      });
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>