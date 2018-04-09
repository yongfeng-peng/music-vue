import storage from 'good-storage'

const FAVORITE_KEY = '__favorite__'

// 收藏的最大长度
const FAVORITE_MAX_LENGTH = 200

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

// 初始的时候 加载
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}