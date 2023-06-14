<template>
  <section class="about-me">
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[0] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.fullName }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[1] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.address }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[2] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.tel }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[3] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.proposedPosition }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[4] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.experience }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[5] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.schooling }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[6] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.skills }}
      </p>
    </div>
    <div class="about-me__section">
      <p class="about-me__title">
        {{ dataField[7] }}
      </p>
      <p class="about-me__data">
        {{ this.$store.getters.personData.additional }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      dataField: [
        "Полное имя",
        "Адрес",
        "Телефон",
        "Предполагаемая должность",
        "Опыт работы",
        "Образование",
        "Умения",
        "Дополнительная информация",
      ],
      personData: {
        fullName: "qewe wqew WEQE",
        address: "sdfef3f3",
        tel: "423423",
        proposedPosition: "423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242",
        experience: "34234",
        schooling: "423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242423432424234d  32424234324242s d34324242343dffd 24242343242",
        skills: "fsr323r",
        additional: "3424",
      }
    }
  },
  methods: {

  }
};
</script>

<style scoped>
.about-me {
  width: 1280px;
  margin: auto;
}
.about-me__section {
  display: flex;
  flex-direction: row;
  margin: 40px 0;
}
.about-me__title {
  width: 25%;
  font-size: 18px;
  padding: 10px;
}
.about-me__data {
  padding: 10px;
  width: 75%;
}
</style>
