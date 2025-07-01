<template>
  <div class="success-page">
    <h2 class="title">
      Olá,
      <span class="hilight-text">
        {{
          props.data.personType === "pessoa-fisica"
            ? props.data.name
            : props.data.companyName
        }}
      </span>
      <br />
      {{ props.data.message }}
    </h2>
    <p class="subtitle">Seja bem-vindo(a) à nossa plataforma.</p>
    <button class="button-orange" @click="handleGoBackToHome">
      Cadastrar novo usuário
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["complete"]);
const props = defineProps({
  title: "",
  step: "",
  data: {},
});

function handleGoBackToHome() {
  window.location.reload();
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins";

.success-page {
  @include flex-center(column);
  text-align: center;
  max-width: 30rem; /** 480px */
  width: 100%;
}

.title {
  font-size: 2rem; /** 32px */
  font-weight: bold;
  margin-bottom: 0.5rem; /** 8px */
}

.subtitle {
  font-size: 1rem; /** 16px */
  margin-bottom: 1rem; /** 16px */
}
</style>
