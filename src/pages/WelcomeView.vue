<script setup>
import { onMounted, reactive } from "vue";

import { useFieldValidation } from "../composables/fieldsValidation";
import { fillFormData } from "../utils/fillFormData";
import { createFormData, createProps } from "../utils/formFactory";

const validationType = {
  email: "email",
};

const emit = defineEmits(["complete"]);
const props = defineProps(createProps());
const formData = reactive(createFormData());
const { errors, handleBlur, resetError, hasErrors } = useFieldValidation(
  formData,
  validationType
);

function sendForm() {
  if (formData.personType === "pessoa-fisica") {
    emit("complete", "PHYSIC_PERSON", formData);
  } else {
    emit("complete", "JURIDICAL_PERSON", formData);
  }
}

onMounted(() => {
  fillFormData(formData, props.data);
});
</script>

<template>
  <div class="welcome">
    <span class="step">
      Etapa <span class="highlight-text">{{ formData.step }}</span> de 4
    </span>
    <h1 class="title">{{ props.title }}</h1>

    <form @submit.prevent="sendForm">
      <label class="email">
        <span>Endereço de e-mail</span>
        <input
          required
          id="email"
          type="email"
          name="email"
          v-model.trim="formData.email"
          @blur="() => handleBlur('email')"
          @focus="() => resetError('email')"
          :class="['input-default', errors.email ? 'input-invalid' : '']"
        />
        <span v-if="errors.email" class="error-message">
          Por favor preencha o email corretamente
        </span>
      </label>

      <div class="radio-group">
        <label>
          <input
            type="radio"
            name="type"
            value="pessoa-fisica"
            v-model="formData.personType"
          />
          <span>Pessoa física</span>
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="pessoa-juridica"
            v-model="formData.personType"
          />
          <span>Pessoa jurídica</span>
        </label>
      </div>

      <button
        type="submit"
        class="button-orange"
        :disabled="formData.personType === undefined || hasErrors()"
      >
        Continuar
      </button>
    </form>
  </div>
</template>
