<template>
  <section class="main-administrator">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Tabla Deportistas" active>
          <b-card-text>
            <b-container fluid>
              <!-- User Interface controls -->
              <b-row>
                <b-col sm="5" md="6" class="my-1">
                  <b-form-group
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                  >
                    <b-form-select
                      id="per-page-select"
                      v-model="perPage"
                      :options="pageOptions"
                      size="sm"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <!-- Main table element -->
              <b-table
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                stacked="md"
                show-empty
                small
                striped
                hover
                :foot-clone="true"
                @filtered="onFiltered"
              >
                <template #thead-top="">
                  <b-tr>
                    <b-th colspan="6"><span class="sr-only"></span></b-th>

                    <b-th variant="dark" colspan="4">Información Medallas</b-th>
                  </b-tr>
                </template>
              </b-table>
              <b-col sm="7" md="6" class="my-1">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
              </b-col>
            </b-container>
          </b-card-text>
        </b-tab>
        <b-tab title="Medallas">
          <b-card-text>
            <section class="row">
              <b-col cols="12" md="6" lg="4">
                <div class="card-medals">
                  <h3>Oro</h3>
                  <img src="../assets/img/gold.png" alt="gold" />
                  <p><b>Total:</b> {{ totalGold }} Medallas</p>
                  <div class="mt-3">
                    <b-button v-b-modal.modal-1>Mas Info</b-button>

                    <b-modal id="modal-1" title="Detalle medalla de Oro" ok-only centered>
                      <p class="my-4">
                        La medalla de Oro se le otorga al deportista con el mejor resultado de una prueba deportiva
                      </p>
                    </b-modal>
                  </div>
                </div>
              </b-col>
              <b-col cols="12" md="6" lg="4">
                <div class="card-medals">
                  <h3>Plata</h3>
                  <img src="../assets/img/silver.png" alt="silver" />
                  <p><b>Total:</b> {{ totalSilver }} Medallas</p>
                  <div class="mt-3">
                    <b-button v-b-modal.modal-2>Mas Info</b-button>

                    <b-modal id="modal-2" title="Detalle medalla de Plata" ok-only centered>
                      <p class="my-4">
                        La medalla de Plata se le otorga al deportista con el segundo mejor resultado de una prueba
                        deportiva
                      </p>
                    </b-modal>
                  </div>
                </div>
              </b-col>
              <b-col cols="12" md="6" lg="4">
                <div class="card-medals">
                  <h3>Bronce</h3>
                  <img src="../assets/img/bronze.png" alt="bronze" />
                  <p><b>Total:</b> {{ totalBronze }} Medallas</p>
                  <div class="mt-3">
                    <b-button v-b-modal.modal-3>Mas Info</b-button>

                    <b-modal id="modal-3" title="Detalle medalle de Bronce" ok-only centered>
                      <p class="my-4">
                        La medalla de Bronce se le otorga al deportista con el tercer resultado de una prueba deportiva
                      </p>
                    </b-modal>
                  </div>
                </div>
              </b-col>
            </section>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </section>
</template>

<script>
import { AlertForm, ICON } from '@/helpers/Alert';
import { ApiRequest, METHODS } from '../helpers/ApiRequest';
export default {
  name: 'administrator-app',
  data() {
    return {
      items: [],
      fields: [
        { key: 'athlete', sortable: true, sortDirection: 'desc' },
        { key: 'age', label: 'Edad', sortable: true, class: 'text-center' },
        { key: 'country', label: 'Pais', sortable: true, class: 'text-center' },
        { key: 'year', label: 'Año', sortable: true, class: 'text-center' },
        { key: 'date', label: 'Fecha', sortable: true, class: 'text-center' },
        { key: 'sport', label: 'Deporte', sortable: true, class: 'text-center' },
        { key: 'gold', label: 'Oro', sortable: true, class: 'text-center' },
        { key: 'silver', label: 'Plata', sortable: true, class: 'text-center' },
        { key: 'bronze', label: 'Bronce', sortable: true, class: 'text-center' },
        { key: 'total', label: 'Total', sortable: true, class: 'text-center' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      totalGold: 0,
      totalSilver: 0,
      totalBronze: 0,
    };
  },
  async mounted() {
    // Set the initial number of items

    try {
      let res = await ApiRequest(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json',
        { method: METHODS.GET }
      );
      this.items = res;
      this.totalRows = res.length;
      this.totalGold = res.reduce((total, item) => total + item.gold, 0);
      this.totalSilver = res.reduce((total, item) => total + item.silver, 0);
      this.totalBronze = res.reduce((total, item) => total + item.bronze, 0);
    } catch (error) {
      AlertForm({ title: 'Hubo un error al consultar los resultados de los deportistas olimpicos', icon: ICON.ERROR });
    }
  },

  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style>
.sr-only {
  display: none;
}

.card-medals {
  margin: 1rem;
  box-shadow: 0 0 13px 3px #0000001c;
  border-radius: 1rem;
  padding: 1.2rem;
  text-align: center;
  transition: transform 0.7s linear, box-shadow 0.7s linear;
}
.card-medals:hover {
  box-shadow: 0 0 13px 3px #00000050;
  transform: scale(1.03) translateY(-10px);
}
</style>
