<script setup>
import { ref, onUnmounted,computed } from 'vue';
const props = defineProps({
  user: Object
})
const countdownText = ref('');
let timer = null;

const showTimer=ref(false);
const target =new Date(props.user.deadlineDate);
const birthdayJP = computed(() => toJPDate(props.user.birthday));
const todayJP = computed(() => toJPDate(props.user.todayDate));
const deadlineDateJP = computed(() => toJPDate(props.user.deadlineDate))

//JP時間に変更する関数
function toJPDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

//時間を取得し引き算をする関数
async function startCountdown(){
  clearInterval(timer);
  timer = setInterval(() => {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    clearInterval(timer);
    countdownText.value = '時間切れ！';
    return;
  }
    countdownText.value=formatDuration(diff);
  }, 1000);
}

//表示の際にデータを整える関数
function formatDuration(ms) {
  let seconds = Math.floor(ms / 1000);
  const years = Math.floor(seconds / (60 * 60 * 24 * 365));
  seconds %= (60 * 60 * 24 * 365);
  const months = Math.floor(seconds / (60 * 60 * 24 * 30)); // ざっくり30日
  seconds %= (60 * 60 * 24 * 30);
  const days = Math.floor(seconds / (60 * 60 * 24));
  seconds %= (60 * 60 * 24);
  const hours = Math.floor(seconds / (60 * 60));
  seconds %= (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  return `${years}年${months}月${days}日${hours}時間${minutes}分${seconds}秒`;
}
// コンポーネントが破棄されたらタイマーも解除
onUnmounted(() => {
  clearInterval(timer);
});
</script>
<template>
    <div class="timer">
      <div class="timer-content">
        <div class="timer-center">
          <div class="user-name">
            name:{{ user.name }}
          </div>
          <div class="birthday">
            誕生日:
            {{ birthdayJP }}
          </div>
          <div class="today">
            今日:
            {{ todayJP }}
          </div>
          <div class="deadlineDate">
            目標日時:
            {{ deadlineDateJP }}
            <button type="button" class="start-button" @click="startCountdown;showTimer=true">スタート</button>
          </div>
          <h2>カウントダウン</h2>
          <div class="countdown" v-if="showTimer">
            {{ countdownText }}
          </div>
          <div class="countdown" v-else>
            0
          </div>
        </div>
      </div>
    </div>
  </template> 
<style scoped>
.timer{
  /* display: flex; */
  margin: 5px;
}
.timer-content{
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background-color: #90dd72;
  display: flex;
  align-items: center;
}
.timer-center{
  width: 100%;
}
.countdown {
  margin: 1%;
  font-size: 1.2rem;
  color: green;
}
.start-button {
  margin-bottom: 20px;
  padding: 0.4rem 1rem;
  background-color: #73c444;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}.start-button:hover{
  background-color:#cc3030;
}
</style>