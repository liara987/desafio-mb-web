<script setup>
import { defineEmits, ref } from "vue";
import { cpfIsValid } from "../utils/validateCpf";

const emit = defineEmits(["get-cpf"]);
const isBlurred = ref(false);
const cpf = ref("");

function handleBlur() {
  if (cpfIsValid(cpf.value)) {
    emit("get-cpf", cpf.value);
    isBlurred.value = false;
  } else {
    isBlurred.value = true;
  }
}
</script>

<template>
  <label class="cpf">
    <span>CPF</span>
    <input
      required
      id="cpf"
      type="text"
      name="cpf"
      maxlength="14"
      v-model="cpf"
      @blur="handleBlur"
      @focus="isBlurred = false"
      :class="['input-default', isBlurred ? 'input-invalid' : '']"
    />
    <span v-if="isBlurred" class="error-message">
      Por favor insira um CPF valido
    </span>
  </label>
</template>
