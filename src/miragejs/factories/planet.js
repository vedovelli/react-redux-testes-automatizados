import { randomNumber } from './utils';

/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
import { Factory } from 'miragejs';

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import faker from 'faker';

import planetImages from './planets-images.json';

export default {
  planet: Factory.extend({
    photo() {
      return planetImages[randomNumber(19)];
    },
    name() {
      return faker.fake('{{name.findName}}');
    },
    about() {
      return faker.fake('{{lorem.paragraphs}}');
    },
    climate() {
      return faker.fake('{{lorem.word}}');
    },
    gravity() {
      return faker.fake('{{lorem.word}}');
    },
    terrain() {
      return faker.fake('{{lorem.words}}');
    },
    surface_water() {
      return randomNumber(200000);
    },
    population() {
      return randomNumber(2000000);
    },
    created() {
      return faker.fake('{{date.past}}');
    },
    edited() {
      return faker.fake('{{date.past}}');
    },
    url() {
      return faker.fake('{{internet.url}}');
    },
    films() {
      return Array.from(Array(randomNumber(5))).map(() => faker.fake('{{internet.url}}'));
    },
    rotation_period() {
      return randomNumber(36);
    },
    orbital_period() {
      return randomNumber(520);
    },
    diameter() {
      return randomNumber(65940);
    },
  }),
};
