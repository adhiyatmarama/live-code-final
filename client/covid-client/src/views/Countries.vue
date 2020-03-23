<template>
    <div class="countries">
      <Card v-for="country in countries" :key="country.id" :country="country">
      </Card>
    </div>
</template>
<script>
import axios from 'axios';
import Card from '../components/Card.vue';

export default {
  name: 'Countries',
  components: {
    Card,
  },
  created() {
    this.getCountries();
  },
  data() {
    return {
      countries: [],
    };
  },
  methods: {
    getCountries() {
    //   console.log('masuk getCountries');
      const options = {
        url: `${this.$store.state.baseUrl}/countries`,
        method: 'get',
        headers: {
          token: localStorage.token,
        },
      };
      axios(options)
        .then(({ data }) => {
          this.countries = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
};
</script>
