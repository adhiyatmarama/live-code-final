<template>
    <div class="profile">
        <div class="add-report">
            <form @submit.prevent="addReport">
                <select v-model="selected">
                    <option disabled value="">Please Select Country</option>
                    <option v-for="country in countries" :key="country.id"
                    :value="country.id">{{country.name}}</option>
                </select><br>
                <input type="text" placeholder="Cases" v-model="cases"><br>
                <button type="submit">Add Report</button>
            </form>
        </div>
        <div class="reports">
            <div class="card" v-for="report in reports" :key="report.id">
                <div class="country-name">
                    <h2>{{report.Country.name}}</h2>
                </div>
                <div class="report-cases">
                    <span>Cases: {{report.cases}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Profile',
  created() {
    this.getCountries();
    this.getReports();
  },
  data() {
    return {
      countries: [],
      reports: [],
      selected: 0,
      cases: null,
    };
  },
  methods: {
    getReports() {
      const options = {
        method: 'get',
        url: `${this.$store.state.baseUrl}/reports`,
        headers: {
          token: localStorage.token,
        },
      };
      axios(options)
        .then(({ data }) => {
          this.reports = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    addReport() {
      console.log(this.selected, '<< selected');
      const options = {
        method: 'post',
        url: `${this.$store.state.baseUrl}/reports`,
        data: {
          CountryId: Number(this.selected),
          cases: Number(this.cases),
        },
        headers: {
          token: localStorage.token,
        },
      };
      axios(options)
        .then(({ data }) => {
          console.log(data);
          this.getReports();
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
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
          this.countries.sort((a, b) => a.name - b.name);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
  },
};
</script>
