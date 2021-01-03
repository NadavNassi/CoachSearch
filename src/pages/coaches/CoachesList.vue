<template>
  <section>
    <coache-filter @change-filter="setFilters"></coache-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button> Refresh </base-button>
        <base-button v-if="!isCoach" link to="/register">Register as a Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <p v-else>No coaches to show</p>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoacheFilter from '../../components/coaches/CoacheFilter.vue';
export default {
  components: { CoachItem, CoacheFilter },
  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        carrer: true
      }
    };
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilter = updatedFilters;
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
