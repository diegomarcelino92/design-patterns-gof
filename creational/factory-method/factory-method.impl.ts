import {
  AuthCreator,
  Authorization,
  SomeCreator,
  SomeProduct,
} from "./factory-method.interface";
import { getFeaturesByApi, getFeaturesByToken } from "./utils";

// ConcreteCreator1
export class AuthCreatorByToken extends AuthCreator {
  createAuthorization(): Authorization {
    return new AuthorizationByToken();
  }

  checkFeature(path: string, token: string) {
    // Gancho para subclasses, permitindo extender a versão abstrata do criador
    console.log("Extendi a implementação");
    return super.checkFeature(path, token);
  }
}

// ConcreteProduct1
class AuthorizationByToken implements Authorization {
  getUserFeatures(): Promise<string[]> {
    return getFeaturesByToken();
  }

  isTokenExpired(token: string): boolean {
    return false;
  }

  loginRedirect(): void {
    console.log("redirecionando para login");
  }
}

// ConcreteCreator2
export class AuthCreatorByApi extends AuthCreator {
  createAuthorization(): Authorization {
    return new AuthorizationByApi();
  }
}

// ConcreteProduct2
class AuthorizationByApi implements Authorization {
  getUserFeatures(): Promise<string[]> {
    return getFeaturesByApi();
  }

  isTokenExpired(token: string): boolean {
    return true;
  }

  loginRedirect(): void {
    console.log("redirecionando para login");
  }
}

// -------------------------------------------------- //
// -------------------------------------------------- //

// ConcreteCreator1
export class SomeCreatorImpl1 extends SomeCreator {
  createSomeProduct(productId: number): SomeProduct {
    // Extende os produtos que um criado produz
    if (productId === 1) return new SomeProduct1();
    if (productId === 2) return new SomeProduct2();
    return super.createSomeProduct(productId);
  }
}

// ConcreteCreator2
export class SomeCreatorImpl2 extends SomeCreator {
  doAnythingWithProduct() {
    // Herda do criador a instância por omissão
    // sem fornecer a sua instância de Product
    const product = this.createSomeProduct();
    // Faça alguma coisa a mais
    product.operation();
  }
}

// ConcreteProduct1
class SomeProduct1 implements SomeProduct {
  operation(): void {
    console.log("Method not implemented 1");
  }
}

// ConcreteProduct2
class SomeProduct2 implements SomeProduct {
  operation(): void {
    console.log("Method not implemented 2");
  }
}
