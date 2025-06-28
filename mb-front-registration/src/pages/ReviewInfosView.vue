<script setup>
import { reactive } from "vue";

import { isAllFieldsFilled } from "@/utils/validateFieldFilled";

const formData = reactive({
  step: 4,
  name: "",
  companyName: "",
  cpf: "",
  cnpj: "",
  birthDay: "",
  openDate: "",
  telephone: "",
  type: "pf",
});

function sendForm() {
  console.log("sendForm: ", formData);
}
</script>

<template>
  <div class="ReviewInfos">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>

    <h1 class="title">Revise suas informações</h1>

    <form @submit.prevent="sendForm" class="form">
      <template v-if="formData.type === 'pf'">
        <label class="name">
          <span>Nome</span>
          <input
            class="input-default"
            type="text"
            required
            v-model="formData.name"
          />
        </label>

        <label class="cpf">
          <span>CPF</span>
          <input
            class="input-default"
            type="text"
            required
            v-model="formData.cpf"
          />
        </label>

        <label class="birthDay">
          <span>Data de nascimento</span>
          <input
            class="input-default"
            type="text"
            required
            v-model="formData.birthDay"
          />
        </label>
      </template>

      <template v-else>
        <label class="name">
          <span>Razão social</span>
          <input
            class="input-default"
            type="text"
            required
            v-model="formData.companyName"
          />
        </label>

        <label class="cpf">
          <span>CNPJ</span>
          <input
            class="input-default"
            type="text"
            required
            v-model="formData.cnpj"
          />
        </label>

        <label class="birthDay">
          <span>Data de abertura</span>
          <input
            class="input-default"
            type="text"
            required
            v-model="formData.openDate"
          />
        </label>
      </template>

      <label class="telephone">
        <span>Telefone</span>
        <input
          class="input-default"
          type="text"
          required
          v-model="formData.telephone"
        />
      </label>

      <div class="submit">
        <button class="btn-secondary" :disabled="!isAllFieldsFilled(formData)">
          Voltar
        </button>

        <button
          type="submit"
          class="btn-primary"
          :disabled="!isAllFieldsFilled(formData)"
        >
          Continuar
        </button>
      </div>
    </form>
  </div>
</template>
