<script setup>
import iconError404 from "../assets/images/error-404.png";

const emit = defineEmits(["complete"]);

function handleGoBack() {
  emit("complete", "REVIEW_INFOS");
}
</script>

<template>
  <div class="error-page">
    <h1 class="title">Opa! Tivemos um erro no servidor</h1>
    <p class="subtitle">
      Não foi possível concluir sua solicitação no momento.
    </p>
    <img :src="iconError404" alt="Erro no servidor" class="error-image" />
    <button @click="handleGoBack" class="button-orange">
      Tentar novamente
    </button>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/mixins";

.error-page {
  @include flex-center(column);
  padding: 2rem; /** 32px */
  margin: 0 auto;
}

.error-image {
  width: 12.5rem; /** 200px */
  margin-bottom: 1.5rem; /** 24px*/
}

.title {
  font-size: 1.8rem; /** 28.8px */
  margin-bottom: 0.5rem; /** 8px */
}

.subtitle {
  font-size: 1rem; /** 16px */
  margin-bottom: 1.5rem; /** 24px */
}
</style>
