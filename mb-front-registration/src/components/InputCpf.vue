<script setup>
import { defineEmits, ref } from "vue";
import { maskCpf } from "../utils/validateCpf";

const emit = defineEmits(["get-cpf"]);
const isBlurred = ref(false);
const cpf = ref("");

function handleBlur() {
  isBlurred.value = true;
  emit("get-cpf", cpf.value);
}

function handleInput(e) {
  cpf.value = maskCpf(e.target.value);
}
</script>

<template>
  <label class="cpf">
    <span>CPF</span>
    <input
      id="cpf"
      :class="['input-default']"
      type="text"
      required
      v-model="cpf"
      name="cpf"
      @input="handleInput"
      @blur="handleBlur"
      @focus="isBlurred = false"
      maxlength="14"
    />
    <span v-if="isBlurred && cpf.length < 14" class="error-message">
      Por favor preencha o CPF corretamente
    </span>
  </label>
</template>

<style scoped></style>
