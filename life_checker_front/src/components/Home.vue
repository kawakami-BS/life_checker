<script setup>
import Timer from './Timer.vue';
import Header from './Header.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/userStore' //追加
const userStore = useUserStore(); //追加

onMounted(async()=> {
  try{
    await userStore.fetchAllUsers();
  }catch(error){
    console.log(error)
  }
})

</script>
 <template>
  <div class="main">
    <Header/>
    <div class="users">
      <div class="user-field" v-for="user in userStore.users" :key="user.id">
        <Timer :user="user"/>
      </div>
    </div>
  </div>
</template> 
<style scoped>
.main{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #FFFFF0;
}
.users{
  display: flex;
}
</style>