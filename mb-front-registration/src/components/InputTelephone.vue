<script setup>
import { defineEmits, ref } from "vue";
import { isPhoneValid } from "../utils/validateTelephone";

const emit = defineEmits(["get-telephone"]);
const isBlurred = ref(false);
const telephone = ref("");

function handleBlur() {
  if (isPhoneValid(telephone.value)) {
    emit("get-telephone", telephone.value);
    isBlurred.value = false;
  } else {
    isBlurred.value = true;
  }
}
</script>

<template>
  <label class="telephone">
    <span>Telefone</span>
    <input
      required
      id="telephone"
      type="tel"
      maxlength="11"
      name="telephone"
      pattern="\d{10,11}"
      inputmode="numeric"
      v-model="telephone"
      @blur="handleBlur"
      @focus="isBlurred = false"
      :class="['input-default', isBlurred ? 'input-invalid' : '']"
    />
    <span v-if="isBlurred" class="error-message">
      Por favor preencha o Telefone corretamente
    </span>
  </label>
</template>

<style scoped></style>
