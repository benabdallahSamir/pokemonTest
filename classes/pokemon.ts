export default class Pokemon {
  name: string;
  types: object[];
  baseExperience: number;
  abilities: { name: string; url: string }[];
  images: { back: string; front: string };
  constructor(data: any) {
    this.baseExperience = data.base_experience;
    this.name = data.name;
    this.types = data.types;
    this.abilities = data.abilities;
    this.images = {
      back: data.sprites.back_default,
      front: data.sprites.front_default,
    };
  }
}
