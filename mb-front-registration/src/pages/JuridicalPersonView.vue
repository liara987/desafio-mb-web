<script setup>
import { reactive } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";

const formData = reactive({
  step: 2,
  companyName: "",
  cnpj: "",
  openDate: "",
  telephone: "",
  type: "",
});

function sendForm() {
  console.log(formData);
}
</script>

<template>
  <div class="JuridicalPerson">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Pessoa Jurídica</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="name">
        <span>Razão social</span>
        <input
          class="input-default"
          type="text"
          required
          v-model="formData.companyName"
        />
      </label>

      <label class="cpf">
        <span>CNPJ</span>
        <input
          class="input-default"
          type="text"
          required
          v-model="formData.cnpj"
        />
      </label>

      <label class="birthDay">
        <span>Data de abertura</span>
        <input
          class="input-default"
          type="text"
          required
          v-model="formData.openDate"
        />
      </label>

      <label class="telephone">
        <span>Telefone</span>
        <input
          class="input-default"
          type="text"
          required
          v-model="formData.telephone"
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
