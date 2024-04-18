import {
  AuthCreatorByApi,
  AuthCreatorByToken,
  SomeCreatorImpl1,
  SomeCreatorImpl2,
} from "./factory-method.impl";
import { AuthCreator, SomeCreator } from "./factory-method.interface";

// Versão estendida da classe base
const authByToken = new AuthCreatorByToken();

// Versão simples apenas fornecendo a Product interface
const authByApi = new AuthCreatorByApi();

const clientCode1 = (auth: AuthCreator) => {
  auth.checkFeature("USER_PATH_REQUEST", "USER_TOKEN");
};

clientCode1(authByApi);
clientCode1(authByToken);

// -------------------------------------------------- //
// -------------------------------------------------- //

const someCreator1 = new SomeCreatorImpl1();

// Instância de Product por omissão
const someCreator2 = new SomeCreatorImpl2();

const clientCode2 = (some: SomeCreator) => {
  const someProduct1 = some.createSomeProduct(1); // Criador parametrizado
  const someProduct2 = some.createSomeProduct(2); // Criador parametrizado

  someProduct2.operation();
  someProduct1.operation();
  some.doAnythingWithProduct();
};

clientCode2(someCreator1);
clientCode2(someCreator2);
