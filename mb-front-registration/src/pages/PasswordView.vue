<script setup>
import { computed, reactive } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { isPasswordValid } from "../utils/validatePassword";

const emit = defineEmits(["finish"]);

const errors = reactive({
  name: false,
  cpf: false,
  birthDay: false,
  telephone: false,
});

const formData = reactive({
  step: 3,
  password: "",
});

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function handlePasswordBlur() {
  if (isPasswordValid(formData.password)) {
    errors.password = false;
  } else {
    errors.password = true;
  }
}

function sendForm() {
  emit("finish", formData);
  console.log("sendForm: ", formData);
}
</script>

<template>
  <div class="Password">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Senha de acesso</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="password">
        <span>Sua senha</span>
        <input
          required
          id="password"
          type="text"
          v-model.trim="formData.password"
          @blur="handlePasswordBlur"
          @focus="errors.password = false"
          :class="['input-default', errors.password ? 'input-invalid' : '']"
        />
        <span v-if="errors.password" class="error-message">
          Senha deve ter no Mínimo de 8 caracteres
          <br />
          No mínimo 1 letra maiúscula
          <br />
          No mínimo 1 letra minúscula
          <br />
          No mínimo 1 número
          <br />
          No mínimo 1 caractere especial (como !@#$%&*)
        </span>
      </label>

      <div class="submit">
        <button class="btn-secondary">Voltar</button>

        <button
          type="submit"
          class="btn-primary"
          :disabled="!isAllFieldsFilled(formData) || hasErrors"
        >
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>
