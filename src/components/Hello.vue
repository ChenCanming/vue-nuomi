<template>
  
    <div class="warp">
       <button-tab>
        <button-tab-item >Today</button-tab-item>
        <button-tab-item selected class="bb">This Week</button-tab-item>
        <button-tab-item class="bb">This Month</button-tab-item>
      </button-tab>
      <flexbox style="height: 50px;background: red;position: fixed">

      </flexbox>
      <flexbox orient="vertical" :margin-left=0>
        <flexbox-item style="border-bottom: 1px solid red;padding-bottom: 5px">
          <div class="flex-demo">
            <a href="###" class="img">
              
            </a>
            <h3>hhhhhhhhhhhhhhhh</h3>
            <p>pppppppppppppppppppppppp</p>
          </div>
        </flexbox-item>
        <flexbox-item style="border-bottom: 1px solid red;padding-bottom: 5px">
          <div class="flex-demo">
            <a href="###" class="img">
              
            </a>
            <h3>hhhhhhhhhhhhhhhh</h3>
            <p>pppppppppppppppppppppppp</p>
          </div>
        </flexbox-item>
        <flexbox-item style="border-bottom: 1px solid red;padding-bottom: 5px">
          <div class="flex-demo">
            <a href="###" class="img">
              
            </a>
            <h3>hhhhhhhhhhhhhhhh</h3>
            <p>pppppppppppppppppppppppp</p>
          </div>
        </flexbox-item>
        <flexbox-item style="border-bottom: 1px solid red;padding-bottom: 5px">
          <div class="flex-demo">
            <a href="###" class="img">
              
            </a>
            <h3>hhhhhhhhhhhhhhhh</h3>
            <p>pppppppppppppppppppppppp</p>
          </div>
        </flexbox-item>
        <flexbox-item style="border-bottom: 1px solid red;padding-bottom: 5px">
          <div class="flex-demo">
            <a href="###" class="img">
              
            </a>
            <h3>hhhhhhhhhhhhhhhh</h3>
            <p>pppppppppppppppppppppppp</p>
          </div>
        </flexbox-item>

      </flexbox>

    </div>

</template>

<script>
import { Flexbox, FlexboxItem, Divider, ButtonTab, ButtonTabItem } from 'vux/src/components'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    ButtonTab,
    ButtonTabItem 
  }
}
</script>

<style lang="scss">
@import '~vux/dist/vux.css';
body{margin: 0;padding:0;}
body{width:100%;height: 100%}
.warp{
  width:11.851852rem;
  height: 10000px;
  margin:0 auto;
}

.bb{
  width:10px;
}
// .flex-demo {
//   text-align: center;
//   color: #fff;
//   background-color: #20b907;
//   margin-bottom: 8px;
//   border-radius: 4px;
//   -webkit-background-clip: padding-box;
// }
// 
.flex-demo{
  height:1.851852rem;
}

.img{
  float: left;
  width:2.777778rem;
  height: 100%;
  border:1px solid red;
}

.demo{
  width: 1.481481rem;
  height: 1.296296rem;
  background: blue;
  margin-right: 0.277778rem;
}

h3{

}
</style>
