<template>
  <div class="pd-lg">
    <Form class="form-flex">
      <div style="margin-bottom:20px">
        <Label for="name">推流地址:</Label>
        <TextBox inputId="name" v-model="url" style="width:250px;"></TextBox> /
        <TextBox inputId="name" v-model="stream" style="width:100px;"></TextBox>
        <LinkButton @click="setupFlash()" style="width:80px;">连接</LinkButton>
      </div>
    </Form>
    <div ref="box">
      <div id="flashContent">
        <p>
          To view this page ensure that Adobe Flash Player version 11.4.0 or greater is installed. 
        </p>
        <a href='http://www.adobe.com/go/getflashplayer'>
          <img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' />
        </a>
      </div>
    </div>
    
    <RemoteScript src="static/lib/webcamh264/js/h264_swfobject.js"></RemoteScript>
  </div>
</template>

<script>
import RemoteScript from '../../components/RemoteScript'
export default {
  name: 'Publisher',
  components:{
    RemoteScript
  },
  data(){
    return {
      form:{},
      encoderSwf: 'static/lib/webcamh264/swf/H264_Encoder.swf',
      swf: 'static/lib/webcamh264/swf/playerProductInstall.swf',
      url: 'rtmp://47.100.119.102:1935/hls',
      stream: 'chenjia',
      streamer: null,
      player: null
    }
  },
  methods:{
    setupFlash(){
      this.$refs.box.innerHTML = '<div id="flashContent"></div>'

      var flashvars = {
        urlStreaming: this.url,
        streamName: this.stream,
        camera_bandwidth:"100000",
        camera_quality:"0",
        camera_fps:"30",
        camera_KeyFrameInterval:"30",
        camera_loopback:"0",
        mic_codec:"SoundCodec.SPEEX",
        mic_encodeQuality:"8",
        mic_framesPerPacket:"2",
        mic_gain:"60",
        mic_noiseSuppressionLevel: "0",
        mic_rate: "44",
        mic_silenceLevel: "0",
        mic_silenceTimeout: "5000",
      };

      var params = {};
      params.quality = "high";
      params.bgcolor = "#ffffff";
      params.allowscriptaccess = "sameDomain";
      params.allowfullscreen = "true";
      var attributes = {};
      attributes.id = "H264Encoder_COMPLETED";
      attributes.name = "H264Encoder_COMPLETED";
      attributes.align = "middle";
      swfobject.embedSWF(this.encoderSwf, "flashContent", "800", "450", "11.4.0", this.swf, flashvars, params, attributes);
      swfobject.createCSS("#flashContent", "display:block;text-align:left;");
    }
  },
  watch:{
    
  },
  mounted(){
    
  }
}
</script>