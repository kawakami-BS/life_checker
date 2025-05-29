<script setup>
import { ref, onUnmounted,computed } from 'vue';
const props = defineProps({
  user: Object
})

const countdownText = ref('');
const countupText = ref('')
let timer = null;
const showTimer=ref(false);
const birthdayTime =new Date(props.user.birthday);

const now=new Date();
//表示のための処理
const birthdayJP = computed(() => toJPDate(props.user.birthday));
const todayJP = computed(() => toJPDate(now));

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
  const deadlineDate = props.user.days_left*365.2425 * 24 * 60 * 60 * 1000;
  const target=birthdayTime.getTime()+deadlineDate;
  timer = setInterval(() => {
    countdownText.value=formatDuration(target);
    countupText.value=formatDuration(birthdayTime)
  }, 1);
}

function formatDuration(startDate) {
  const pad = (n, d = 2) => String(n).padStart(d, '0');

  let start = new Date(startDate);
  let end = new Date();
  if (end < start) [start, end] = [end, start];

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  let hours = end.getHours() - start.getHours();
  let minutes = end.getMinutes() - start.getMinutes();
  let seconds = end.getSeconds() - start.getSeconds();
  let milliseconds = end.getMilliseconds() - start.getMilliseconds();

  if (milliseconds < 0) {
    milliseconds += 1000;
    seconds--;
  }
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return `${years}年${months}ヵ月${days}日${hours}時間${pad(minutes)}分${pad(seconds)}.${pad(milliseconds, 3)}秒`;
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
          <div class="timer-text">
            <div class="user-name">
              {{ user.name }}
              <button type="button" class="start-button" @click="startCountdown();showTimer=true">スタート</button>
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
              {{ user.days_left }}歳
            </div>
            <div class="count" v-if="showTimer">
              <h2>期限</h2>
              <div class="down">
                {{ countdownText }}
              </div>
              <h2>生きた時間</h2>
              <div class="up">
                {{ countupText }}
              </div>
            </div>
            <div class="count" v-else>
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  </template> 
<style scoped>
h2{
  font-size: 20px;
}
.timer{
  margin: 5px;
}
.timer-content{
  padding: 1%;
  width: 400px;
  height: 250px;
  border-radius: 10px;
  background-color: #90dd72;
}
.timer-center{
  width: 100%;
}
.timer-text{
  margin: 1%;
}
.user-name{
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.count {
  margin: 1%;
  font-size: 1.4rem;
  font-weight: bold;
  color:#cc3030;
}
.down,.up{
  font-weight: bold;
  color:#cc3030;
}
.start-button {
  padding: 0.4rem 1rem;
  background-color: #61aa36;
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