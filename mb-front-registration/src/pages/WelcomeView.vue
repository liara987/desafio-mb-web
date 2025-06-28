<script setup>
import { reactive, ref } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { isEmailValid } from "../utils/validateEmail";

const formData = reactive({
  step: 1,
  email: "",
  personType: "", // pessoa física ou jurídica
});

const emit = defineEmits(["get-email"]);
const isBlurred = ref(false);

function handleBlur() {
  if (isEmailValid(formData.email)) {
    emit("get-email", formData.email);
    isBlurred.value = false;
  } else {
    isBlurred.value = true;
  }
}

function sendForm() {
  console.log("sendForm: ", formData);
}
</script>

<template>
  <div class="welcome">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>
    <h1 class="title">Seja bem vindo(a)</h1>

    <form @submit.prevent="sendForm">
      <label class="email">
        <span>Endereço de e-mail</span>
        <input
          required
          id="email"
          type="email"
          name="email"
          v-model.trim="formData.email"
          @blur="handleBlur"
          @focus="isBlurred = false"
          :class="['input-default', isBlurred ? 'input-invalid' : '']"
        />
        <span v-if="isBlurred" class="error-message">
          Por favor preencha o email corretamente
        </span>
      </label>

      <div class="radio-group">
        <label>
          <input
            type="radio"
            name="type"
            v-model="formData.personType"
            value="pessoa-fisica"
          />
          <span>Pessoa física</span>
        </label>
        <label>
          <input
            type="radio"
            name="type"
            v-model="formData.personType"
            value="pessoa-juridica"
          />
          <span>Pessoa jurídica</span>
        </label>
      </div>

      <button
        type="submit"
        class="btn-secondary"
        :disabled="
          !isAllFieldsFilled(formData) || !isEmailValid(formData.email)
        "
      >
        Continuar
      </button>
    </form>
  </div>
</template>
