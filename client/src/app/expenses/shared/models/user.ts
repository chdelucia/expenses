

export interface Expense {
    id?: string;
    description: string;
    cost: number;
    date?: Date;
}

export class ModelForm {
    constructor(
      public description?: string,
      public cost?: number,
      public date?: Date,
    ) {  }
  }
