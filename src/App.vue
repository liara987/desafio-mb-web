<script setup>
import { markRaw, ref } from "vue";
// markRaw foi utilizado para remover warnings sobre performance

import JuridicalPersonView from "@/pages/JuridicalPersonView.vue";
import PasswordView from "@/pages/PasswordView.vue";
import PhysicPersonView from "@/pages/PhysicPersonView.vue";
import ReviewInfosView from "@/pages/ReviewInfosView.vue";
import ServerErrorView from "@/pages/ServerErrorView.vue";
import SuccessRegistrationView from "@/pages/SuccessRegistrationView.vue";
import WelcomeView from "@/pages/WelcomeView.vue";

const steps = Object.freeze({
  WELCOME: {
    key: "welcome",
    title: "Seja bem vindo(a)",
    component: markRaw(WelcomeView),
  },
  PHYSIC_PERSON: {
    key: "pessoa_fisica",
    title: "Pessoa Física",
    component: markRaw(PhysicPersonView),
  },
  JURIDICAL_PERSON: {
    key: "pessoa_juridica",
    title: "Pessoa Jurídica",
    component: markRaw(JuridicalPersonView),
  },
  PASSWORD: {
    key: "password",
    title: "Senha de acesso",
    component: markRaw(PasswordView),
  },
  REVIEW_INFOS: {
    key: "review_infos",
    title: "Revise suas informações",
    component: markRaw(ReviewInfosView),
  },
  SUCCESS_REGISTRATION: {
    key: "registration_success",
    component: markRaw(SuccessRegistrationView),
  },
  SERVER_ERROR: {
    key: "server_error",
    component: markRaw(ServerErrorView),
  },
});

const formData = ref({});
const currentStep = ref(steps.WELCOME);

function proximaEtapa(stepName, stepData) {
  Object.assign(formData.value, stepData);

  currentStep.value = steps[stepName];
}
</script>

<template>
  <div class="container">
    <component
      :title="currentStep.title"
      :is="currentStep.component"
      :step="currentStep"
      :data="formData"
      @complete="proximaEtapa"
    />
  </div>
</template>
