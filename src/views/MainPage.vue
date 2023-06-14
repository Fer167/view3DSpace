<template>
  <SectionTitle />
  <Peculiarities
    v-for="(item, index) of peculiaritiesItems"
    :key="index"
    :title="item.title"
    :decription="item.decription"
    :image="item.image"
    :swap="index % 2 == 0 ? false : true"
  />
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
import Peculiarities from '@/components/Peculiarities.vue';

export default {
  name: "MainPage",
  components: {
    SectionTitle,
    Peculiarities,
  },
  data() {
    return {
      peculiaritiesItems: [
        {
          title: "Храните свои работы",
          decription: "3D Space выдает пользователям 100GB бесплатного хранилища для пользователей",
          image: "1.jpg",
        },
        {
          title: "Просматривайте работы в 3D-проекции",
          decription: "3D Space отображает все 3D-модели в 3D-проекции для удобного просмотра",
          image: "2.jpg",
        },
        {
          title: "Ограничивайте доступ к данным",
          decription: "3D Space позволяет сделать ваш аккаунт и работы приватными. Вы можете сами выбирать кому будут доступны ваши работы",
          image: "3.jpg",
        },
        {
          title: "Создайте резюме",
          decription: "В 3D Space вы можете создать резюме и разместить свои работы и использовать веб-приложение в качестве полноценного портфолио",
          image: "4.jpg",
        },
        {
          title: "Просматривайте работы других пользователей",
          decription: "Веб-приложение 3D Space предлагает возможность делиться работами и выставлять на показ всему миру. Делитесь своими работами и просматривайте работы других 3D-моделлеров",
          image: "5.jpg",
        },
        {
          title: "Будьте частью всего сообщества 3D-моделлеров",
          decription: "Ище работников, друзей, коллег и единомышленников. Присоединяйтесь к огромному сообществу сферы 3D-моделирования",
          image: "6.jpg",
        },
      ]
    }
  },
};
</script>
