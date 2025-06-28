<script setup>
import { reactive } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";

const formData = reactive({
  step: 3,
  password: "",
  type: "",
});

function sendForm() {
  console.log(formData);
}
</script>

<template>
  <div class="Password">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Senha de acesso</h1>

    <form @submit.prevent="sendForm" class="form">
      <label>
        <span>Sua senha</span>
        <input
          class="input-default"
          type="text"
          required
          v-model="formData.password"
        />
      </label>

      <div class="submit">
        <button class="btn-secondary" :disabled="!isAllFieldsFilled(formData)">
          Voltar
        </button>

        <button
          type="submit"
          class="btn-primary"
          :disabled="!isAllFieldsFilled(formData)"
        >
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;

    span {
      margin: 0.5rem 0; /* 8px */
    }
  }

  .submit {
    display: flex;
    gap: 1.5rem;
  }

  button {
    margin-top: 1rem; /* 16px */
  }
}
</style>
