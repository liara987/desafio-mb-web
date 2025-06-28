<script setup>
import { computed, reactive } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { isCnpjValid } from "../utils/validateCnpj";
import { isDateValid } from "../utils/validateDate";
import { isPhoneValid } from "../utils/validateTelephone";

const emit = defineEmits(["finish"]);

const errors = reactive({
  name: false,
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

function sendForm() {
  emit("finish", formData);
  console.log("sendForm: ", formData);
}
</script>

<template>
  <div class="JuridicalPerson">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Pessoa Jurídica</h1>

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
          id="cpf"
          type="text"
          name="cpf"
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
          pattern="\d{10,11}"
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
        <button class="btn-secondary">Voltar</button>

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
