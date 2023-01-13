export interface Recipe {
    recipe_id: string;
    title: string;
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
  