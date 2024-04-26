import { KitMonobrand, KitMultibrand } from "./abstract-factory.impl";
import { IKitFactory } from "./abstract-factory.interface";

const createKit = (factory: IKitFactory) => {
  const perfume = factory.createPerfume();
  const heath = factory.createHeath();
  const skincare = factory.createSkincare();
  const discount = 10;
  const freeSimples: any = [];

  const totalPrice = perfume.price + heath.price + skincare.price;
  const price = totalPrice - (totalPrice * discount) / 100;

  if (perfume.fragancyType === "sweet") {
    const free = getFreeSample("perfume", "woody");
    freeSimples.push(free);
  }

  if (heath.heathType === "vitamin") {
    const free = getFreeSample("vitamin", "tea");
    freeSimples.push(free);
  }

  if (skincare.skincareType === "moisturizer") {
    const free = getFreeSample("skincare", "toner");
    freeSimples.push(free);
  }

  const kit = {
    totalPrice,
    price,
    products: [perfume, heath, skincare],
    freeSimples,
  };

  console.log(`
    <- Kit created with ->
    Products: ${kit.products.map((p: any) => p.nome).join(", ")}
    Total price: ${kit.totalPrice}
    Discount price: ${kit.price}
    Free simples: ${kit.freeSimples.map((p: any) => p.name).join(", ")}
  `);
};

const getFreeSample = (type: string, variantType: string) => ({
  type,
  name: `Random product with different type: ${variantType}`,
  brand: "Random brand if kit is multibrand else same brand",
});

const monobrandFactory = new KitMonobrand();
const multibrandFactory = new KitMultibrand();
createKit(monobrandFactory);
createKit(multibrandFactory);
