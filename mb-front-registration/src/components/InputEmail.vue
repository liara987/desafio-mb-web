<script setup>
import { computed, defineEmits, ref } from "vue";
import { isEmailValid } from "../utils/validateEmail";

const emit = defineEmits(["get-email"]);
const isBlurred = ref(false);
const email = ref("");

const isFieldInvalid = computed(() => {
  return isBlurred.value && !isEmailValid(email);
});

function handleBlur() {
  isBlurred.value = true;

  if (isEmailValid(email.value)) {
    emit("get-email", email.value);
  }
}
</script>

<template>
  <label class="email">
    <span>Endereço de e-mail</span>
    <input
      id="email"
      required
      type="email"
      name="email"
      v-model="email"
      @blur="handleBlur"
      @input="handleInput"
      @focus="isBlurred = false"
      :class="['input-default', isFieldInvalid ? 'input-invalid' : '']"
    />
    <span v-if="isFieldInvalid" class="error-message">
      Por favor preencha o email corretamente
    </span>
  </label>
</template>

<style scoped></style>
