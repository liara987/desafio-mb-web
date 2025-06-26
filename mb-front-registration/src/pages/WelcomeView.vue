<script setup>
import { isAllFieldsFilled } from "@/utils/validateFieldFilled";
import { reactive } from "vue";
import InputEmail from "../components/InputEmail.vue";

const formData = reactive({
  step: 1,
  email: "",
  type: "", // pessoa física ou jurídica = pf || pj
});

function sendForm() {
  console.log(formData);
}

function handleEmail(value) {
  console.log("handleEmail: ", value);
}
</script>

<template>
  <div class="welcome">
    <span class="step">
      Etapa <span class="hilight-text">{{ formData.step }}</span> de 4
    </span>
    <h1 class="title">Seja bem vindo(a)</h1>

    <form @submit.prevent="sendForm">
      <InputEmail @get-email="handleEmail" />

      <div class="radio-group">
        <label>
          <input type="radio" name="type" v-model="formData.type" value="pf" />
          <span>Pessoa física</span>
        </label>
        <label>
          <input type="radio" name="type" v-model="formData.type" value="pj" />
          <span>Pessoa jurídica</span>
        </label>
      </div>

      <button
        type="submit"
        class="btn-secondary"
        :disabled="
          !isAllFieldsFilled(formData) || !isEmailValid(formData.email)
        "
      >
        Continuar
      </button>
    </form>
  </div>
</template>

<style scoped>
.radio-group {
  margin: 1rem 0; /* 16px */
  display: flex;
  justify-content: space-between;
  label {
    width: fit-content;

    input {
      margin-right: 0.2rem; /* 3.2px */
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
