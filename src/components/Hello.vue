<template>
  <div class="canvas">
    <div class="toolkit" v-if="toolkitVisible">
      <div class="hide_toolkit" @click="toolkitVisible=false">**</div>
      <div class="toolkit__item" type="circle">
        circle
      </div>
      <div class="toolkit__item" type="square">
        square
      </div>
    </div>

  </div>
</template>

<script>

import * as d3 from "d3";
import _ from 'lodash';
// const test = require('../sds/test');
import test from '../sd3/test';

console.log(test);

import etl from '../sd3/etl';

 



export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      toolkitVisible: true
    }
  },
  created() {
    var _t = this;

    var aa= function(t){
      return {
        start(){
            console.log(t);
        }
      }
    }
    var b =aa("zhansan");
    b.start();

    _t.$nextTick(() => {

  

      d3.select("body").transition()
        .style("background-color", "black");
      new etl();
      // Create a svg canvas

      // console.log(update);

    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  width: 960px;
  height: 500px;
  background-color: aquamarine;
  position: relative;
}

.toolkit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: antiquewhite;
  width: 150px;
  margin: 0;
  position: absolute;
  height: 500px;
}

.hide_toolkit {
  display: block;
  position: absolute;
  cursor: pointer;
  left: 150px;
  top: 20px;
}

.toolkit__item {
  display: block;
  /*box-sizing: content-box;*/
  width: 60px;
  height: 60px;
  background-color: red;
  padding: 0px;
  margin: 10px;
}

circle {
  color: black;
}
</style>
