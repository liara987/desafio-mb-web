<script setup>
import { computed, onMounted, reactive } from "vue";

import { isCnpjValid } from "@/utils/validateCnpj";
import { isCpfValid } from "@/utils/validateCpf";
import { isDateValid } from "@/utils/validateDate";
import { isEmailValid } from "@/utils/validateEmail";
import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { isPasswordValid } from "@/utils/validatePassword";
import { isPhoneValid } from "@/utils/validateTelephone";

const emit = defineEmits(["complete"]);

const props = defineProps({
  title: "",
  step: "",
  data: {},
});

const formData = createFormData(props.data.personType);
const errors = createErrors(props.data.personType);

const hasErrors = computed(() => {
  return Object.values(errors).some((err) => err === true);
});

function createFormData(typePerson) {
  return reactive({
    step: 4,
    email: "",
    telephone: "",
    password: "",
    ...(typePerson === "pessoa-fisica"
      ? {
          name: "",
          cpf: "",
          birthDay: "",
        }
      : {
          companyName: "",
          cnpj: "",
          openDate: "",
        }),
  });
}

function createErrors(typePerson) {
  return reactive({
    email: false,
    telephone: false,
    password: false,
    ...(typePerson === "pessoa-fisica"
      ? {
          name: false,
          cpf: false,
          birthDay: false,
        }
      : {
          companyName: false,
          cnpj: false,
          openDate: false,
        }),
  });
}

function handleEmailBlur() {
  if (isEmailValid(formData.email)) {
    errors.email = false;
  } else {
    errors.email = true;
  }
}

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

function handlePasswordBlur() {
  if (isPasswordValid(formData.password)) {
    errors.password = false;
  } else {
    errors.password = true;
  }
}

function handleGoBack() {
  emit("complete", "PASSWORD", formData);
}

async function sendForm() {
  try {
    const response = await fetch("http://localhost:3000/registration", {
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
  formData.personType = props.data.personType;
  formData.email = props.data.email;

  // Pessoa fisica
  formData.name = props.data.name;
  formData.cpf = props.data.cpf;
  formData.birthDay = props.data.birthDay;

  // Pessoa Juridica
  formData.companyName = props.data.companyName;
  formData.cnpj = props.data.cnpj;
  formData.openDate = props.data.openDate;

  formData.telephone = props.data.telephone;
  formData.password = props.data.password;
});
</script>

<template>
  <div class="ReviewInfos">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
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
          @blur="handleEmailBlur"
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
      </template>

      <template v-else>
        <label class="razao-social">
          <span>Razão social</span>
          <input
            required
            class="input-default"
            type="text"
            v-model.trim="formData.companyName"
            @blur="handleCompanyNameBlur"
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
          @blur="handleTelephoneBlur"
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
          @blur="handlePasswordBlur"
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
        <button class="btn-secondary" @click="handleGoBack">Voltar</button>

        <button
          type="submit"
          class="btn-primary"
          :disabled="!isAllFieldsFilled(formData) || hasErrors"
        >
          Cadastrar
        </button>
      </div>
    </form>
  </div>
</template>
