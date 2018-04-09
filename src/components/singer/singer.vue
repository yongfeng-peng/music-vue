<template>
 <div class="singer">
  <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
  <router-view></router-view>
 </div>
</template>

<script type="text/ecmascript-6">
import ListView from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGET_LEN = 10
export default {
  // betterScoll使用父容器的高度要限制好，子元素撑开它
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // 实现了对mutation的提交
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normaLizeSinger(res.data.list)
          // console.log(this.singers)
        }
      })
    },
    _normaLizeSinger(list) {
      // 规范化数据
      // 热门数据 和 findex聚合数据
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGET_LEN) {
          // 抽象去公用的属性
          /*  map.hot.items.push({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            avatar: `//y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })  */
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      console.log(map)
      // 为了得到有序列表，需要处理map
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 排序处理
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    // 扩展运算符
    ...mapMutations({
      // 对象映射 将mutation的修改映射为一个方法名
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>