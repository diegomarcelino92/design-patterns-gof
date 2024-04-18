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
    const free = getFreeSample("perfume");
    freeSimples.push(free);
  }

  if (heath.heathType === "vatamin") {
    const free = getFreeSample("heath");
    freeSimples.push(free);
  }

  if (skincare.skincareType === "moisturizer") {
    const free = getFreeSample("skincare");
    freeSimples.push(free);
  }

  const kit = {
    totalPrice,
    price,
    products: [perfume, heath, skincare],
    freeSimples,
  };

  console.log(`
    Kit criado com:
    Produtos: ${kit.products.map((p: any) => p.nome).join(", ")}
    Preço total: ${kit.totalPrice}
    Preço com desconto: ${kit.price}
    Amostas grátis: ${kit.freeSimples.map((p: any) => p.name).join(", ")}
  `);
};

const getFreeSample = (type: string) => ({
  name: `Random product with different type: ${type}`,
  brand: "Random brand if kit is multibrand else same brand",
});

const monobrandFactory = new KitMonobrand();
const multibrandFactory = new KitMultibrand();
createKit(monobrandFactory);
createKit(multibrandFactory);
