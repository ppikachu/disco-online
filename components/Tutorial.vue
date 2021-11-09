<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-900">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
          <h2 class="text-4xl text-green-500 leading-7 font-semibold text-center mt-8">
            Discos
          </h2>
      <div class="text-gray-100 overflow-hidden">

        <section class="p-4">
          <p class="text-center text-gray-400">Esta página es una prueba de datos tomados de una hoja de cálculo de Google Docs</p>
          <a class="text-center w-full block my-4" href="https://docs.google.com/spreadsheets/d/1qh8ot3ytK11Yd1w2ikftL6fv6sUueHKrBd4q23Fxppc/edit?usp=sharing" target="_blank" >link a los datos</a>
          <div class="flex space-x-4 py-4 justify-center">
            <button @click="back" :disabled="pagination.page===1" class="px-4 py-1 rounded bg-green-700 disabled:opacity-50" >atrás</button>
            <button @click="next" :disabled="pagination.page===count" class="px-4 py-1 rounded bg-green-700" >siguiente</button>
          </div>

          <ul class="">
            <li v-for="data in filterItems" :key="data.id" class="flex space-x-4 p-4 my-4 rounded bg-gray-800">
              <div>
                <nuxt-img
                  provider = "cloudinary"
                  :src = /images/+data.CoverImg
                  width = "128"
                  height = "128"
                  fit = "fill"
                  class="rounded block"
                />
              </div>
              <div class="flex flex-col space-y-2 ">
                <header class="text-xl"><span class="font-semibold">{{ data.Title }}</span> - {{ data.Artist }}</header>
                <ul class="text-xs text-gray-400 ">
                  <li>Apellido, nombre del artista: {{ data.ArtistLastnameFirstname }}</li>
                  <li>Editado originalmente por: {{ data.OriginalRecordingLabel }}</li>
                  <li># catálogo: {{ data.ThissIssueCatalogN }}</li>
                  <li>Año de grabación: {{ data.YearRecorded }}</li>
                  <li>Año de prensado: {{ data.YearPressing }}</li>
                  <li>id: {{ data.id }}</li>
                </ul>
              </div>
            </li>
          </ul>
          <!-- <Pagination :page-size="pagination.rowsPerPage"
                     :current-page="pagination.page"
                     :total="pagination.total"
                     type="type"
                     v-if="pagination.total > 1"></Pagination> -->
          <div class="flex space-x-4 py-4 justify-center">
            <button @click="back" :disabled="pagination.page===1" class="px-4 py-1 rounded bg-green-700 disabled:opacity-50" >atrás</button>
            <button @click="next" :disabled="pagination.page===count" class="px-4 py-1 rounded bg-green-700" >siguiente</button>
          </div>
        </section>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data1: [],
      pagination: {
      page: 1,
      total: 0,
      rowsPerPage: 5
    }
    }
  },
  methods: {
    parseSheet (sheetId, sheetName = null) {
      return this.$gsparser.parse(sheetId, sheetName)
    },
    next() {
      this.pagination.page += 1
    },
    back() {
      this.pagination.page -= 1
    },
  },
  computed: {
    filterItems() {
      const start = this.pagination.page * this.pagination.rowsPerPage - this.pagination.rowsPerPage
      const end = start + this.pagination.rowsPerPage - 1
      return this.data1.filter((item, index) => index >= start && index <= end)
    },
    count(){
      return Math.ceil(this.pagination.total/this.pagination.rowsPerPage)
    }
  },
  async mounted () {
    // see: https://docs.google.com/spreadsheets/d/10WDbAPAY7Xl5DT36VuMheTPTTpqx9x0C5sDCnh4BGps
    const sheetId = '1qh8ot3ytK11Yd1w2ikftL6fv6sUueHKrBd4q23Fxppc'
    this.data1 = await this.parseSheet(sheetId)
    this.pagination.total = this.data1.length
  },
}
</script>