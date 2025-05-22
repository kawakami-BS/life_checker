<script setup>
import { ref } from 'vue';
const birthday= ref('2000/1/1');

const submitTask = async() => {
}
 </script>
 <template>
  <form class="Form">
    <div>
      <h4 class="user_name">ユーザーネーム</h4>
      <h4 class="displayname">ファイふぁべーすから取得</h4>
      <h4 class="input_birthday">生年月日</h4>
      <input class="input_birthdayDate" type="date" value={{birthday}}/>
      </div>
    <input class="input_submit" type ="button" value="送信" @click="submitTask"/>
  </form>
 </template> 
 <style scoped>
.Form{
  width: 30%;
  height: 100%;
  background-color: azure;
}
 </style>