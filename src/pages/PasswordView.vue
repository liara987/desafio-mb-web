<script setup>
import { onMounted, reactive } from "vue";

import { useFieldValidation } from "../composables/fieldsValidation";
import { fillFormData } from "../utils/fillFormData";
import { createFormData, createProps } from "../utils/formFactory";

const validationType = {
  password: "password",
};

const emit = defineEmits(["complete"]);
const props = defineProps(createProps());
const formData = reactive(createFormData(props.data.personType, 3));
const { errors, handleBlur, resetError, hasErrors } = useFieldValidation(
  formData,
  validationType
);

function handleGoBack() {
  if (formData.personType === "pessoa-fisica") {
    emit("complete", "PHYSIC_PERSON", formData);
  } else {
    emit("complete", "JURIDICAL_PERSON", formData);
  }
}

function sendForm() {
  emit("complete", "REVIEW_INFOS", formData);
}

onMounted(() => {
  fillFormData(formData, props.data);
});
</script>

<template>
  <div class="Password">
    <span class="step">
      Etapa <span class="highlight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">{{ props.title }}</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="password">
        <span>Sua senha</span>
        <input
          required
          id="password"
          type="text"
          v-model.trim="formData.password"
          @blur="() => handleBlur('password')"
          @focus="() => resetError('password')"
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
        <button class="button-outlined" @click="handleGoBack">Voltar</button>

        <button type="submit" class="button-orange" :disabled="hasErrors()">
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>
