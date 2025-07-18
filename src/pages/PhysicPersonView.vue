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

const errors = reactive(createErrors("pessoa-fisica"));

const formData = reactive(createFormData("pessoa-fisica", 2));

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function handleNameBlur() {
  errors.name = validateField("empty", formData.name);
}

function handleCpfBlur() {
  errors.cpf = !validateField("cpf", formData.cpf);
}

function handleBirthDayBlur() {
  errors.birthDay = !validateField("date", formData.birthDay);
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
  <div class="PhysicPerson">
    <span class="step">
      Etapa <span class="highlight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">{{ props.title }}</h1>

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
