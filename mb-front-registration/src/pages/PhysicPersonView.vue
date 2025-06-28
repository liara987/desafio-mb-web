<script setup>
import { computed, reactive, ref } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";

import InputCpf from "../components/InputCpf.vue";
import InputDate from "../components/InputDate.vue";
import InputTelephone from "../components/InputTelephone.vue";

const formData = reactive({
  step: 2,
  name: "",
  cpf: "",
  birthDay: "",
  telephone: "",
  type: "",
});

const isBlurred = ref(false);

const isFormValid = computed(() => isAllFieldsFilled(formData));

function handleCpf(cpf) {
  formData.cpf = cpf;
  console.log("handleCpf: ", cpf);
}

function handleTelephone(phone) {
  formData.telephone = phone;
  console.log("handleTelephone: ", phone);
}

function handleDate(date) {
  formData.birthDay = date;
  console.log("handleDate: ", date);
}

function isNameFilled() {
  if (formData.name != "") {
    // emit("get-name", formData.name);
    console.log(formData.name);

    isBlurred.value = false;
  } else {
    isBlurred.value = true;
  }
}

function sendForm() {
  console.log(formData);
}
</script>

<template>
  <div class="PhysicPerson">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Pessoa Física</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="name">
        <span>Nome</span>
        <input
          required
          id="name"
          type="text"
          v-model.trim="formData.name"
          @blur="isNameFilled"
          :class="['input-default', isBlurred ? 'input-invalid' : '']"
        />
        <span v-if="isBlurred" class="error-message">
          Por favor preencha o Nome corretamente
        </span>
      </label>

      <InputCpf @get-cpf="handleCpf" />
      <InputDate @get-date="handleDate" />
      <InputTelephone @get-telephone="handleTelephone" />

      <div class="submit">
        <button class="btn-secondary" :disabled="!isFormValid">Voltar</button>

        <button type="submit" class="btn-primary" :disabled="!isFormValid">
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
  gap: 16px;

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
