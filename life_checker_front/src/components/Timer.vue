<script setup>
import { ref, computed, onMounted,onUnmounted } from 'vue';

const props = defineProps({
  user: Object
})
const month = ref(null);
const day = ref(null);
const countdownText = ref('');
let timer = null;

function startCountdown() {
  if (!month.value || !day.value) {
    countdownText.value = '月日を正しく入力してください。';
    return;
  }

  const now = new Date();
  let target = new Date(now.getFullYear(), month.value - 1, day.value);

  // 今日より前なら翌年に設定
  if (target < now) {
    target.setFullYear(now.getFullYear() + 1);
  }

  clearInterval(timer);

  timer = setInterval(() => {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      clearInterval(timer);
      countdownText.value = '時間切れ！';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownText.value = `残り: ${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
  }, 1000);
}

// コンポーネントが破棄されたらタイマーも解除
onUnmounted(() => {
  clearInterval(timer);
});
</script>
<template>
  <div class="timer">
    <div class="timer-content">
      <div class="timer-center-content">
        <h2>カウントダウン</h2>
          <div class="inputs">
          <label>
            月:
            <input v-model.number="month" type="number" min="1" max="12" />
          </label>
          <label>
            日:
            <input v-model.number="day" type="number" min="1" max="31" />
          </label>
          <button @click="startCountdown">スタート</button>
        </div>
        <div>
          {{ user.name }}
        </div>
        <div class="countdown">
          {{ countdownText }}
        </div>
      </div>
    </div>
  </div>
</template> 
<style scoped>
.timer{
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  display: flex;
}
.timer-content{
  width: 500px;
  height: 300px;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputs {
  margin-bottom: 20px;
}
input {
  width: 60px;
  padding: 4px;
  margin-left: 5px;
  margin-right: 15px;
}
.countdown {
  font-size: 1.2rem;
  color: green;
}
button {
  padding: 6px 12px;
  font-size: 1rem;
  cursor: pointer;
}
</style>