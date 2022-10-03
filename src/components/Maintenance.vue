<template>
  <section class="main-maintenance">
    <div class="card-message">
      <h2>Pagina esta en mantenimiento</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'maintenance-app',
};
</script>

<style>
.main-maintenance {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-message {
  box-shadow: 0 0 14px 2px #03030342;
  border-radius: 1.5rem;
  padding: 2rem;
}
</style>
