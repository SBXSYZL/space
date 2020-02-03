<template>
  <div class="wrapper">
    <div class="menu"
         v-for="item in titles"
         :key="item.id">
      <!--一级标签 start-->
      <div style="padding-top: 5px;height:30px;display: flex; vertical-align: center;align-content: start">
        <div style="margin-top: 3px;padding-right: 5px;width: 20%;text-align: right;vertical-align: center">
          <img style="height: 20px;width: 20px" :src="item.icon"/>
        </div>
        <div style="margin-top: 2px;width: 80%;text-align: start">
          {{item.title}}
        </div>
      </div>
      <!--一级标签 end-->
      <!--二级标签按钮 start-->
      <div>
        <div class="menu_item"
             v-for="menu_item in item.menu"
             @click="activeBtn(menu_item.menuId,menu_item.path)"
             :class="{active_menu:defaultActive===menu_item.menuId,
             menu_it:defaultActive!==menu_item.menuId}"
             :key="menu_item.menuId">
          <div style="padding-left: 28%">
            {{menu_item.name}}
          </div>

        </div>
      </div>
      <!--二级标签按钮 end-->
    </div>
  </div>
</template>

<script>

  export default {
    name: 'SideBar',
    data () {
      return {
        titles: [
          {
            id: 1,
            icon: require('../assets/menu.png'),
            title: '课程',
            menu: [
              {
                menuId: 1,
                name: '新建课程',
                path: '/createCourse'
              },
              {
                menuId: 2,
                name: '选择课程',
                path: '/selectCourse'
              }
            ]
          },
          {
            id: 2,
            icon: require('../assets/dir.png'),
            title: '课时作业',
            menu: [
              {
                menuId: 3,
                name: '新建课时',
                path: '/createLesson'
              },
              {
                menuId: 4,
                name: '选择课时',
                path: '/selectLesson'
              }
            ]
          },
          {
            id: 3,
            icon: require('../assets/talk.png'),
            title: '讨论',
            menu: [
              {
                menuId: 5,
                name: '信息',
                path: '/message'
              },
              {
                menuId: 6,
                name: '联系人',
                path: '/contact'
              }
            ]
          },
          {
            id: 4,
            icon: require('../assets/movie.png'),
            title: '教学课件',
            menu: [
              {
                menuId: 7,
                name: '上传课件',
                path: ''
              }
            ]
          }
        ],
        defaultActive: 1
      }
    },
    methods: {
      activeBtn (index, path) {
        this.defaultActive = index
        this.$router.replace(path)
      }
    }
  }
</script>

<style scoped>
  .menu {
    background: #ffffff;
    /*border-radius: 0.5em;*/
    text-align: center;
    padding-bottom: 5px;
    margin-bottom: 5px;
    min-height: 30px;
  }

  .menu_item {
    min-height: 40px;
    padding-top: 6px;
    text-align: start;
    cursor: pointer;
  }

  .active_menu {
    background: #f55d54;
    color: #ffffff;
  }

  .menu_it:hover {
    background: #eaeaea;
  }
</style>
