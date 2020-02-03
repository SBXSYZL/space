<template>
  <div class="wrapper background">
    <!--头部 start-->
    <div class="header">
      <Header/>
    </div>
    <!--头部 end-->
    <!--body start-->
    <div class="body">
      <!--sidebar start-->
      <div class="side">
        <SideBar/>
      </div>
      <!--sidebar start-->
      <!--main body start-->
      <div class="main">
        <transition name="move"
                    mode="out-in">
          <template>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </template>
        </transition>
      </div>
      <!--main body start-->
    </div>
    <!--body end-->
  </div>
</template>

<script>
  // @ is an alias to /src

  import SideBar from '../components/SideBar'
  import Header from '../components/Header'

  export default {
    name: 'home',
    components: { Header, SideBar },
    data () {
      return {}
    },
    methods: {},
    created () {
    }
  }
</script>
<style scoped>
  .background {
    background: #f3f3f3;
  }

  .header {
    min-height: 10%;
    text-align: center;
    background: #ffffff;
  }

  .body {
    height: 90%;
    display: flex;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 20px;
  }

  .side {
    width: 10%;
    height: 100%;
  }

  .main {
    margin-left: 20px;
    width: 90%;
    height: 95%;
    background: #ffffff;
  }


</style>
