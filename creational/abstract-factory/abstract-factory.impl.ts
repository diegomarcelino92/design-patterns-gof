import {
  IHeath,
  IKitFactory,
  IPerfume,
  ISkincare,
} from "./abstract-factory.interface";

export class KitMonobrand implements IKitFactory {
  createPerfume(): IPerfume {
    return new Brand1Perfume();
  }
  createHeath(): IHeath {
    return new Brand1Heath();
  }
  createSkincare(): ISkincare {
    return new Brand1Skincare();
  }
}

class Brand1Perfume implements IPerfume {
  fragancyType: IPerfume["fragancyType"] = "sweet";
  nome = "Produto de perfume Brand1";
  price = 50;
  brand = "brand1";
}

class Brand1Heath implements IHeath {
  heathType: IHeath["heathType"] = "vitamin";
  nome = "Produto de saúde Brand1";
  price = 50;
  brand = "Brand1";
}

class Brand1Skincare implements ISkincare {
  skincareType: ISkincare["skincareType"] = "moisturizer";
  nome = "Produto de skincare Brand1";
  price = 50;
  brand = "Brand1";
}

export class KitMultibrand implements IKitFactory {
  createPerfume(): IPerfume {
    return new Brand2Perfume();
  }

  createHeath(): IHeath {
    return new Brand2Heath();
  }

  createSkincare(): ISkincare {
    return new Brand1Skincare();
  }
}

class Brand2Perfume implements IPerfume {
  fragancyType: IPerfume["fragancyType"] = "woody";
  nome: string = "Produto de perfume Brand2";
  price: number = 50;
  brand: string = "Brand2";
}

class Brand2Heath implements IHeath {
  heathType: IHeath["heathType"] = "tea";
  nome: string = "Produto de saúde Brand2";
  price: number = 50;
  brand: string = "Brand2";
}
