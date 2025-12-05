# 🔄 Update: Radio & TV Mutual Exclusion

## ✅ What Changed

I've updated the code so that **Radio and TV will automatically stop each other** when you press play.

### 1. When you play Radio:
- If TV is playing, it will automatically pause.
- Radio starts playing.

### 2. When you play TV:
- If Radio is playing, it will automatically pause.
- TV starts playing.

## 📝 Files Updated

- `js/activitiez.js`: Added logic to stop TV when radio starts.
- `js/modern-player.js`: Added logic to stop Radio when TV starts.

## 🚀 How to Apply

1. **Refresh your browser** (F5 or Ctrl+R) at http://localhost:8080
2. Try playing the Radio.
3. Then go to TV and play a video.
4. The Radio should stop automatically!
