<script setup>
import { computed, onMounted, reactive } from "vue";

import { fillFormData } from "../utils/fillFormData";
import {
  createErrors,
  createFormData,
  createProps,
} from "../utils/formFactory";
import { validateField } from "../utils/validators";

const emit = defineEmits(["complete"]);

const props = defineProps(createProps());

const errors = reactive(createErrors("pessoa-juridica"));

const formData = reactive(createFormData("pessoa-juridica", 2));

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function handleCompanyNameBlur() {
  errors.companyName = validateField("empty", formData.companyName);
}

function handleCnpjBlur() {
  errors.cnpj = !validateField("cnpj", formData.cnpj);
}

function handleOpenDateDayBlur() {
  errors.openDate = !validateField("date", formData.openDate);
}

function handleTelephoneBlur() {
  errors.telephone = !validateField("phone", formData.telephone);
}

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
          @blur="handleCompanyNameBlur"
          @focus="errors.companyName = false"
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
          @blur="handleCnpjBlur"
          @focus="errors.cnpj = false"
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
          @blur="handleOpenDateDayBlur"
          @focus="errors.openDate = false"
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
          @blur="handleTelephoneBlur"
          @focus="errors.telephone = false"
          :class="['input-default', errors.telephone ? 'input-invalid' : '']"
        />
        <span v-if="errors.telephone" class="error-message">
          Por favor preencha o Telefone corretamente
        </span>
      </label>

      <div class="submit">
        <button class="button-outlined" @click="handleGoBack">Voltar</button>

        <button type="submit" class="button-orange" :disabled="hasErrors">
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>
