import {playMode} from 'common/js/config'
import {loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  // 播放
  playing: false,
  // 是否全屏
  fullScreen: false,
  // 播放列表
  playList: [],
  // 顺序播放，随机播放
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放的歌曲
  currentIndex: -1,
  disc: {},
  topList: {},
  favoriteList: loadFavorite()
}

export default state