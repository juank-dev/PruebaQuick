<template>
  <section>
    <div class="bg-dark">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">
          <img src="../assets/logo.png" alt="vue" width="40" />
          Home
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <p class="me-3">Usuario: {{ user }} Rol: {{ role }}</p>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>Opciones</em>
              </template>
              <b-dropdown-item href="#">Perfil</b-dropdown-item>
              <b-dropdown-item href="#" @click="handleLogout">Cerrar Sesion</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </section>
</template>

<script>
export default {
  name: 'navbar-app',
  props: ['user', 'role'],
  methods: {
    handleLogout() {
      console.log('logout');
      localStorage.clear();
      this.$router.push('Login');
    },
  },
};
</script>

<style>
nav {
  max-width: 1320px;
  margin: auto;
  color: white;
}

.bg-dark {
  background-color: black;
}
.navbar-collapse {
  justify-content: end;
}
</style>
