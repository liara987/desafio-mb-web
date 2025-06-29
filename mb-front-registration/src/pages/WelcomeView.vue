<script setup>
import { onMounted, reactive } from "vue";

import { isEmailValid } from "@/utils/validateEmail";
import { isAllFieldsFilled } from "@/utils/validateFieldFilled";

const emit = defineEmits(["complete"]);

const error = reactive({
  email: false,
});

const props = defineProps({
  title: "",
  step: "",
  data: {},
});

const formData = reactive({
  step: 1,
  email: "",
  personType: "", // pessoa física ou jurídica
});

function handleEmailBlur() {
  if (isEmailValid(formData.email)) {
    error.email = false;
  } else {
    error.email = true;
  }
}

function sendForm() {
  if (formData.personType === "pessoa-fisica") {
    emit("complete", "PHYSIC_PERSON", formData);
  } else {
    emit("complete", "JURIDICAL_PERSON", formData);
  }
}

onMounted(() => {
  formData.email = props.data.email;
  formData.personType = props.data.personType;
});
</script>

<template>
  <div class="welcome">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
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
          @blur="handleEmailBlur"
          @focus="error.email = false"
          :class="['input-default', error.email ? 'input-invalid' : '']"
        />
        <span v-if="error.email" class="error-message">
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
        class="btn-primary"
        :disabled="
          !isAllFieldsFilled(formData) || !isEmailValid(formData.email)
        "
      >
        Continuar
      </button>
    </form>
  </div>
</template>
