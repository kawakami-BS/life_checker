<script setup>
import Timer from './Timer.vue';
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
    <div class="user_field" v-for="user in userStore.users" :key="user.id">
      <Timer :user="user"/>
    </div>
  </div>
</template> 
<style scoped>
.main{
  height: 100%;
  width: 100%;
  display: flex;
}
.user_field{
  width: 100%;
}
</style>