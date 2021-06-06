//  ./@types/custom-types/index.d.ts
declare module '@global_types' {
  export namespace meta_types {
    type market_item = {
      address_j: string;
      address_r: string;
      market_name: string;
      position: {latitude: number; longitude: number};
      street_score: number;
      main_product: string;
    };
  }
}
