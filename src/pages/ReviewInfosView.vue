<script setup>
import { computed, onMounted, reactive } from "vue";

import { fillFormData } from "../utils/fillFormData";
import { createErrors, createFormData } from "../utils/formFactory";
import { validateField } from "../utils/validators";

const validationType = {
  email: "email",
  cpf: "cpf",
  cnpj: "cnpj",
  telephone: "phone",
  birthDay: "date",
  openDate: "date",
  password: "password",
  name: "empty",
  companyName: "empty",
};

const api = import.meta.env.VITE_API_URL_BASE;
const emit = defineEmits(["complete"]);

const props = defineProps(createProps());

const formData = reactive(createFormData(props.data.personType, 4));
const errors = reactive(createErrors(props.data.personType));

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function handleBlur(field) {
  const validationTypeKey = validationType[field];
  if (!validationTypeKey) return;

  const isValid = validateField(validationTypeKey, formData[field]);

  errors[field] = !isValid;
}

function handleGoBack() {
  emit("complete", "PASSWORD", formData);
}

async function sendForm() {
  try {
    const response = await fetch(`${api}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao cadastrar: " + errorData.error);
      return;
    }

    const result = await response.json();
    emit("complete", "SUCCESS_REGISTRATION", result);
  } catch (err) {
    emit("complete", "SERVER_ERROR", formData);
    console.error("Erro ao registrar usuário: ", err);
  }
}

onMounted(() => {
  fillFormData(formData, props.data);
});
</script>

<template>
  <div class="ReviewInfos">
    <span class="step">
      Etapa <span class="highlight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">{{ props.title }}</h1>

    <form @submit.prevent="sendForm" class="form">
      <label class="email">
        <span>Endereço de e-mail</span>
        <input
          required
          id="email"
          type="email"
          name="email"
          v-model.trim="formData.email"
          @blur="() => handleBlur('email')"
          @focus="errors.email = false"
          :class="['input-default', errors.email ? 'input-invalid' : '']"
        />
        <span v-if="errors.email" class="error-message">
          Por favor preencha o email corretamente
        </span>
      </label>

      <template v-if="formData.personType === 'pessoa-fisica'">
        <label class="name">
          <span>Nome</span>
          <input
            required
            id="name"
            type="text"
            v-model.trim="formData.name"
            @blur="() => handleBlur('name')"
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
            @blur="() => handleBlur('cpf')"
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
            @blur="() => handleBlur('birthDay')"
            @focus="errors.birthDay = false"
            :class="['input-default', errors.birthDay ? 'input-invalid' : '']"
          />
          <span v-if="errors.birthDay" class="error-message">
            Por favor preencha a Data de Nascimento corretamente
          </span>
        </label>
      </template>

      <template v-else>
        <label class="razao-social">
          <span>Razão social</span>
          <input
            required
            class="input-default"
            type="text"
            v-model.trim="formData.companyName"
            @blur="() => handleBlur('name')"
            @focus="errors.companyName = false"
            :class="[
              'input-default',
              errors.companyName ? 'input-invalid' : '',
            ]"
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
            @blur="() => handleBlur('openDate')"
            @focus="errors.openDate = false"
            :class="['input-default', errors.openDate ? 'input-invalid' : '']"
          />
          <span v-if="errors.openDate" class="error-message">
            Por favor preencha a Data de abertura corretamente
          </span>
        </label>
      </template>

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
          @focus="errors.telephone = false"
          :class="['input-default', errors.telephone ? 'input-invalid' : '']"
        />
        <span v-if="errors.telephone" class="error-message">
          Por favor preencha o Telefone corretamente
        </span>
      </label>

      <label class="password">
        <span>Senha</span>
        <input
          required
          id="password"
          type="text"
          v-model.trim="formData.password"
          @blur="() => handleBlur('password')"
          @focus="errors.password = false"
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

        <button type="submit" class="button-orange" :disabled="hasErrors">
          Cadastrar
        </button>
      </div>
    </form>
  </div>
</template>
