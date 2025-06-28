<script setup>
import { computed, defineEmits, ref } from "vue";
import { dateIsValid } from "../utils/validateDate";

const emit = defineEmits(["get-date"]);
const isBlurred = ref(false);
const date = ref("");

const isFieldInvalid = computed(() => {
  return isBlurred.value && !dateIsValid(date.value);
});

function handleBlur() {
  if (dateIsValid(date.value)) {
    emit("get-date", date.value);
    isBlurred.value = false;
  } else {
    isBlurred.value = true;
  }
}
</script>

<template>
  <label class="date">
    <span>Data de Nascimento</span>
    <input
      required
      id="date"
      type="date"
      name="date"
      v-model="date"
      @blur="handleBlur"
      @focus="isBlurred = false"
      :class="['input-default', isFieldInvalid ? 'input-invalid' : '']"
    />
    <span v-if="isBlurred" class="error-message">
      Por favor preencha a Data de Nascimento corretamente
    </span>
  </label>
</template>
