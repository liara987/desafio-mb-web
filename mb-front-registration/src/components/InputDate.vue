<script setup>
import { computed, defineEmits, ref } from "vue";
import { maskDate } from "../utils/validateDate";

const emit = defineEmits(["get-date"]);
const isBlurred = ref(false);
const date = ref("");

const isFieldInvalid = computed(() => {
  return isBlurred.value && !isDateValid(date.value);
});

function handleBlur() {
  isBlurred.value = true;
  date.value = maskDate(date.value);

  emit("get-date", date.value);
}

function handleInput(e) {
  date.value = maskDate(e.target.value);
}
</script>

<template>
  <label class="date">
    <span>Data de Nascimento</span>
    <input
      id="date"
      required
      type="text"
      name="date"
      v-model="date"
      @blur="handleBlur"
      @input="handleInput"
      @focus="isBlurred = false"
      :class="['input-default', isFieldInvalid ? 'input-invalid' : '']"
      :maxlength="10"
    />
    <span v-if="isBlurred && date.length < 10" class="error-message">
      Por favor preencha a Data de Nascimento corretamente
    </span>
  </label>
</template>

<style scoped></style>
