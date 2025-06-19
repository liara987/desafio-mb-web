<script setup></script>

<template>
  <div class="welcome">
    <span class="step">Etapa <span class="hilight-text">1</span> de 4 </span>
    <h1 class="title">Seja bem vindo(a)</h1>

    <form>
      <label class="email">
        <span>Endereço de e-mail</span>
        <input class="input-default" type="email" required />
      </label>

      <div class="radio-group">
        <label>
          <input type="radio" name="type" />
          <span>Pessoa física</span>
        </label>
        <label>
          <input type="radio" name="type" />
          <span>Pessoa jurídica</span>
        </label>
      </div>

      <button type="submit" class="btn-primary">Continuar</button>
    </form>
  </div>
</template>

<style scoped>
.welcome {
  max-width: max-content;
}

.title {
  margin: 1rem 0; /* 16px */
}

.email {
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 0.5rem; /* 8px */
  }
}

.radio-group {
  margin: 1rem 0; /* 16px */

  label {
    margin-right: 1rem; /* 16px */

    input {
      margin-right: 0.2rem; /* 3.2px */
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
