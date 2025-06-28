<script setup>
import { defineEmits, ref } from "vue";
import { isEmailValid } from "../utils/validateEmail";

const emit = defineEmits(["get-email"]);
const isBlurred = ref(false);
const email = ref("");

function handleBlur() {
  if (isEmailValid(email.value)) {
    emit("get-email", email.value);
    isBlurred.value = false;
  } else {
    isBlurred.value = true;
  }
}
</script>

<template>
  <label class="email">
    <span>Endereço de e-mail</span>
    <input
      required
      id="email"
      type="email"
      name="email"
      v-model="email"
      @blur="handleBlur"
      @focus="isBlurred = false"
      :class="['input-default', isBlurred ? 'input-invalid' : '']"
    />
    <span v-if="isBlurred" class="error-message">
      Por favor preencha o email corretamente
    </span>
  </label>
</template>
