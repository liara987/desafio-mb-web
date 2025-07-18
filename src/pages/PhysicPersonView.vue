<script setup>
import { onMounted, reactive } from "vue";

import { useFieldValidation } from "@/composables/fieldsValidation";
import { fillFormData } from "@/utils/fillFormData";
import { createFormData, createProps } from "@/utils/formFactory";

const validationType = {
  cpf: "cpf",
  telephone: "phone",
  birthDay: "date",
  password: "password",
  name: "empty",
};

const emit = defineEmits(["complete"]);
const props = defineProps(createProps());
const formData = reactive(createFormData("pessoa-fisica", 2));
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
          @blur="() => handleBlur('name')"
          @focus="() => resetError('name')"
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
          @blur="() => handleBlur('cpf')"
          @focus="() => resetError('cpf')"
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
          @blur="() => handleBlur('birthDay')"
          @focus="() => resetError('birthDay')"
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
