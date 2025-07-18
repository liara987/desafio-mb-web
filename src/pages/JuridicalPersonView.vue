<script setup>
import { onMounted, reactive } from "vue";

import { useFieldValidation } from "../composables/fieldsValidation";
import { fillFormData } from "../utils/fillFormData";
import { createFormData, createProps } from "../utils/formFactory";

const validationType = {
  email: "email",
  cnpj: "cnpj",
  telephone: "phone",
  openDate: "date",
  password: "password",
  companyName: "empty",
};

const emit = defineEmits(["complete"]);
const props = defineProps(createProps());
const formData = reactive(createFormData("pessoa-juridica", 2));
const { errors, handleBlur, resetError, hasErrors } = useFieldValidation(
  formData,
  validationType
);

function handleGoBack() {
  emit("complete", "WELCOME", formData);
}

function sendForm() {
  emit("complete", "PASSWORD", formData);
}

onMounted(() => {
  fillFormData(formData, props.data);
});
</script>

<template>
  <div class="JuridicalPerson">
    <span class="step">
      Etapa <span class="highlight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">{{ props.title }}</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="razao-social">
        <span>Razão social</span>
        <input
          required
          class="input-default"
          type="text"
          v-model.trim="formData.companyName"
          @blur="() => handleBlur('companyName')"
          @focus="() => resetError('companyName')"
          :class="['input-default', errors.companyName ? 'input-invalid' : '']"
        />
        <span v-if="errors.companyName" class="error-message">
          Por favor preencha a Razão social corretamente
        </span>
      </label>

      <label class="cnpj">
        <span>CNPJ</span>
        <input
          required
          id="cnpj"
          type="text"
          name="cnpj"
          maxlength="18"
          v-model.trim="formData.cnpj"
          @blur="() => handleBlur('cnpj')"
          @focus="() => resetError('cnpj')"
          :class="['input-default', errors.cnpj ? 'input-invalid' : '']"
        />
        <span v-if="errors.cnpj" class="error-message">
          Por favor insira um CNPJ valido
        </span>
      </label>

      <label class="open-date">
        <span>Data de abertura</span>
        <input
          required
          id="openDate"
          type="date"
          name="openDate"
          v-model="formData.openDate"
          @blur="() => handleBlur('openDate')"
          @focus="() => resetError('openDate')"
          :class="['input-default', errors.openDate ? 'input-invalid' : '']"
        />
        <span v-if="errors.openDate" class="error-message">
          Por favor preencha a Data de abertura corretamente
        </span>
      </label>

      <label class="telephone">
        <span>Telefone</span>
        <input
          required
          id="telephone"
          type="tel"
          maxlength="11"
          name="telephone"
          inputmode="numeric"
          v-model="formData.telephone"
          @blur="() => handleBlur('telephone')"
          @focus="() => resetError('telephone')"
          :class="['input-default', errors.telephone ? 'input-invalid' : '']"
        />
        <span v-if="errors.telephone" class="error-message">
          Por favor preencha o Telefone corretamente
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
