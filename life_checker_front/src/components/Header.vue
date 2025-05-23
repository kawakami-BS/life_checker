<script setup>
import { ref, computed } from 'vue'
const searchKeyword = ref('');

</script>

<template>
  <dev class="header">
    <div class="header-title">
      <div class="header-title-container">
        LifeChecker
      </div>
    </div>
    <div class="header-search">
      <form @submit="handleSubmit" class="search-container">
        <input
          v-model="searchKeyword"
          placeholder="タイトル検索"
          class="search-input"
          type="search"
          aria-label="検索"
          />
        <button type="submit" class="search-button">
          検索
        </button>
      </form>
    </div>
  </dev>
</template>

<style>
/* 親要素 */
.header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color:#418d41;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  margin-bottom: 3px;
}
/* headerの子要素 */
.header-title{
  display: flex;
  align-items: center;
  color: aliceblue;
}
/* header-titleの子要素 */
.header-title-container{
  font-weight: bold;
  font-size: 30px;
}
.search-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.search-input {
  flex: 1;
  padding: 0.4rem 0.6em;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #1f2937;
  transition: all 0.2s ease;
}
.search-button {
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
}.search-button:hover{
  background-color:#cc3030;
}

</style>