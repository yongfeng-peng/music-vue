import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
// 设置成类 有两大好书
// 1.把代码集中在一个地方维护,不需要在大量地方写相同的代码
// 2.类的扩展性比对象要强很多，而且是面向对象的一种方式
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
  // 先判断，如果已经有getLyric，就不调用接口
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
        // this.lyric = res.lyric
          this.lyric = Base64.decode(res.lyric)
          console.log(this.lyric)
          resolve(this.lyric)
        } else {
          // reject('no lyric')
        }
      })
    })
  /* getLyric(this.mid).then((res) => {
      if (res.retcode === ERR_OK) {
        // this.lyric = res.lyric
        this.lyric = Base64.decode(res.lyric)
        console.log(this.lyric)
      }
    }) */
  }
}

// 工厂方法
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `https://thirdparty.gting.com/${musicData.songid}.m4a?fromtag=38`
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`

  })
}

// 过滤歌手
function filterSinger(singer) {
  let ret = []
  // 没有歌手的时候
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}