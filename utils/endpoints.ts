export const endpoints = {
  // enow / swagger endpoints
  areas: "/api/areas",
  authLogin: "/api/Auth/login",
  colorRanges: "/api/color-ranges",
  genders: "/api/genders",
  goals: "/api/goals",
  governorates: "/api/governorates",
  homeHighlights: "/api/home-highlights",
  indicators: "/api/indicators",
  infoGraphicArs: "/api/info-graphic-ars",
  infoGraphicImgArs: "/api/info-graphic-img-ars",
  nods: "/api/nods",
  partnersArs: "/api/partners-ars",
  pillars: "/api/pillars",
  publicationsAr: "/api/publications-ar",
  publicationsEn: "/api/publications-en",
  publicationTypesAr: "/api/publication-types-ar",
  residences: "/api/residences",
  search: "/api/search",
  subGoals: "/api/sub-goals",
  subIndicators: "/api/sub-indicators",
  subTypes: "/api/sub-types",
  targets: "/api/targets",
  values: "/api/values",
};


export type endpointName = keyof typeof endpoints;

export type endpointType = (endpointName | number)[];

export const tags = {
  cart: "cart",
  "cart-items": "cart-items"
};

export type Tags = keyof typeof tags;
