<script setup>
import { computed, onMounted, reactive } from "vue";

import { isCnpjValid } from "@/utils/validateCnpj";
import { isDateValid } from "@/utils/validateDate";
import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { isPhoneValid } from "@/utils/validateTelephone";

const emit = defineEmits(["complete"]);

const props = defineProps({
  title: "",
  step: "",
  data: {},
});

const errors = reactive({
  companyName: false,
  cnpj: false,
  openDate: false,
  telephone: false,
});

const formData = reactive({
  step: 2,
  companyName: "",
  cnpj: "",
  openDate: "",
  telephone: "",
});

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function handleCompanyNameBlur() {
  if (formData.companyName != "") {
    errors.companyName = false;
  } else {
    errors.companyName = true;
  }
}

function handleCnpjBlur() {
  if (isCnpjValid(formData.cnpj)) {
    errors.cnpj = false;
  } else {
    errors.cnpj = true;
  }
}

function handleOpenDateDayBlur() {
  if (isDateValid(formData.openDate)) {
    errors.openDate = false;
  } else {
    errors.openDate = true;
  }
}

function handleTelephoneBlur() {
  if (isPhoneValid(formData.telephone)) {
    errors.telephone = false;
  } else {
    errors.telephone = true;
  }
}

function handleGoBack() {
  emit("complete", "WELCOME", formData);
}

function sendForm() {
  emit("complete", "PASSWORD", formData);
}

onMounted(() => {
  formData.email = props.data.email;
  formData.personType = props.data.personType;
  formData.companyName = props.data.companyName;
  formData.cnpj = props.data.cnpj;
  formData.openDate = props.data.openDate;
  formData.telephone = props.data.telephone;
});
</script>

<template>
  <div class="JuridicalPerson">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
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
        <button class="btn-secondary" @click="handleGoBack">Voltar</button>

        <button
          type="submit"
          class="btn-primary"
          :disabled="!isAllFieldsFilled(formData) || hasErrors"
        >
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>
