<script setup>
import { defineEmits, ref } from "vue";
import { maskPhone } from "../utils/validateTelephone";

const emit = defineEmits(["get-telephone"]);
const isBlurred = ref(false);
const telephone = ref("");

function handleInput(e) {
  telephone.value = maskPhone(e.target.value);
}

function handleBlur() {
  isBlurred.value = true;
  emit("get-telephone", telephone.value);
}
</script>

<template>
  <label class="telephone">
    <span>Telefone</span>
    <input
      id="telephone"
      :class="['input-default']"
      type="text"
      required
      v-model="telephone"
      name="telephone"
      @input="handleInput"
      @blur="handleBlur"
      @focus="isBlurred = false"
      maxlength="14"
    />
    <span v-if="isBlurred && telephone.length < 14" class="error-message">
      Por favor preencha o Telefone corretamente
    </span>
  </label>
</template>

<style scoped></style>
