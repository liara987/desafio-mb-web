<script setup>
import { computed, reactive } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { isCpfValid } from "../utils/validateCpf";

import { isDateValid } from "../utils/validateDate";
import { isPhoneValid } from "../utils/validateTelephone";

const emit = defineEmits(["finish"]);

const errors = reactive({
  name: false,
  cpf: false,
  birthDay: false,
  telephone: false,
});

const formData = reactive({
  step: 2,
  name: "",
  cpf: "",
  birthDay: "",
  telephone: "",
});

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function handleNameBlur() {
  if (formData.name != "") {
    errors.name = false;
  } else {
    errors.name = true;
  }
}

function handleCpfBlur() {
  if (isCpfValid(formData.cpf)) {
    errors.cpf = false;
  } else {
    errors.cpf = true;
  }
}

function handleBirthDayBlur() {
  if (isDateValid(formData.birthDay)) {
    errors.birthDay = false;
  } else {
    errors.birthDay = true;
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
  <div class="PhysicPerson">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Pessoa Física</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="name">
        <span>Nome</span>
        <input
          required
          id="name"
          type="text"
          v-model.trim="formData.name"
          @blur="handleNameBlur"
          @focus="errors.name = false"
          :class="['input-default', errors.name ? 'input-invalid' : '']"
        />
        <span v-if="errors.name" class="error-message">
          Por favor preencha o Nome corretamente
        </span>
      </label>

      <label class="cpf">
        <span>CPF</span>
        <input
          required
          id="cpf"
          type="text"
          name="cpf"
          maxlength="14"
          v-model.trim="formData.cpf"
          @blur="handleCpfBlur"
          @focus="errors.cpf = false"
          :class="['input-default', errors.cpf ? 'input-invalid' : '']"
        />
        <span v-if="errors.cpf" class="error-message">
          Por favor insira um CPF valido
        </span>
      </label>

      <label class="birthDay">
        <span>Data de Nascimento</span>
        <input
          required
          id="birthDay"
          type="date"
          name="birthDay"
          v-model="formData.birthDay"
          @blur="handleBirthDayBlur"
          @focus="errors.birthDay = false"
          :class="['input-default', errors.birthDay ? 'input-invalid' : '']"
        />
        <span v-if="errors.birthDay" class="error-message">
          Por favor preencha a Data de Nascimento corretamente
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
