<template>
 <div class="recommend" ref="recommend">
  <scroll class="recommend-content" ref="scroll" :data="discList">
    <div>
     <div class="slider-wrapper" v-if="recommends.length" ref="sliderWrapper">
      <slider>
       <div v-for="(item, index) in recommends" :key="index">
        <a :href="item.linkUrl">
         <img @load="loadImage" class="needsclick" :src="item.picUrl" />
        </a>
       </div>
      </slider>
     </div>
     <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
       <li @click="selectItem(item)" class="item" v-for="(item, index) in discList" :key="index">
        <div class="icon">
         <img width="60" height="60" :src="item.imgurl" alt="" />
        </div>
        <div class="text">
         <h2 class="name" v-html="item.creator.name"></h2>
         <p class="desc" v-html="item.dissname"></p>
        </div>
       </li>
      </ul>
     </div>
    </div>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
  </scroll>
  <router-view></router-view>
 </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    // setTimeout(() => {
    this._getRecommend()
    // }, 2000)
    this._getDiscList()
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // 获取轮播图片信息
          this.recommends = res.data.slider
          // console.log(this.recommends)
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          // 获取歌单的数据
          // console.log(res.data.list)
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      // 只要有一张图片撑开就ok
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
    // betterScoll层级是父子级，子级只有第一元素会滚动
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>