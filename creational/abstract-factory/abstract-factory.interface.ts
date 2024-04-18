export interface IBaseProduct {
  nome: string;
  price: number;
  brand: string;
}

// AbstractProduct
export interface IPerfume extends IBaseProduct {
  fragancyType: "sweet" | "woody";
}

// AbstractProduct
export interface IHeath extends IBaseProduct {
  heathType: "vatamin" | "tea";
}

// AbstractProduct
export interface ISkincare extends IBaseProduct {
  skincareType: "moisturizer" | "toner";
}

// AbstractFactory
export interface IKitFactory {
  createPerfume(): IPerfume;
  createHeath(): IHeath;
  createSkincare(): ISkincare;
}
