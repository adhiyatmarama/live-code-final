<template>
    <div class="card">
        <div class="name">
            <h2>{{country.name}}</h2>
        </div>
        <div class="details">
            <div class="cases">
              <span>Cases:</span><br>
              <span>{{country.cases}}</span>
            </div>
            <div class="deaths">
              <span>Deaths:</span><br>
              <span>{{country.deaths}}</span>
            </div>
            <div class="recovered">
              <span>Recovered:</span><br>
              <span>{{country.recovered}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['country'],
};
</script>
