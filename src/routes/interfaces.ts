export interface Recipe {
  id: string;
  title: string;
  name?: string;
  description: string;
  instructions1_title: string;
  instructions1_desc: string;
  instructions2_title: string;
  instructions2_desc: string;
  instructions3_title: string;
  instructions3_desc: string;
  instructions4_title: string;
  instructions4_desc: string;
  instructions5_title: string;
  instructions5_desc: string;
  expand: {
    cuisine: {
      id: string;
      tag: string;
    }[];
  };
}
  
  export interface Ingredient {
    ingredient_id: string;
    name: string;
  }
  
  export interface MeasurementQty {
    measurement_qty_id: string;
    qty_amount: number;
  }
  
  export interface MeasurementUnit {
    measurement_unit_id: string;
    measurement_description: string;
  }
  
  export interface IngredientGroup {
    ingredient_group_id: string;
    name: string;
  }
  
  export interface PageData {
    lists: {
      recipes: Recipe[];
      ingList: Ingredient[];
      mQty: MeasurementQty[];
      mUnit: MeasurementUnit[];
      ingGroup: IngredientGroup[];
    }
  }
  
  export interface Comments {
      id: string;
      collectionId: string;
      collectionName: string;
      created: string;
      updated: string;
      recipe: string;
      comment: string;
      answers: string;
  }