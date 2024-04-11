import { getFeaturesByApi, getFeaturesByToken } from "./utils";

// Product
interface Authorization {
  getUserFeatures(): Promise<string[]>;
  isTokenExpired(token: string): boolean;
  loginRedirect(): void;
}

// Creator
abstract class AuthCreator {
  abstract createAuthorization(): Authorization;

  userFeatures: Record<string, string> = {
    "/": "can-access-home",
    "/route1": "can-access-route1",
    "/route2": "can-access-route2",
  };

  async checkFeature(path: string, token: string) {
    // Cria a intância do Authorization
    // que será fornecida pelo ConcreteCreator
    const auth = this.createAuthorization();

    const isExpired = auth.isTokenExpired(token);

    if (isExpired) {
      auth.loginRedirect();
      return;
    }

    const features = await auth.getUserFeatures();
    const required = this.userFeatures[path];

    if (features.includes(required)) {
      console.log("Acesso permitido");
      return;
    }

    console.log("Acesso não permitido");
  }
}

// ConcreteCreator1
class AuthCreatorByToken extends AuthCreator {
  createAuthorization(): Authorization {
    return new AuthorizationByToken();
  }

  checkFeature(path: string, token: string) {
    // Gancho para subclasses, permitindo extender a versão abstrata do criado
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
class AuthCreatorByApi extends AuthCreator {
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

// Client code
const authByToken = new AuthCreatorByToken();
authByToken.checkFeature("/", "abc"); // Versão estendida da classe base

const authByApi = new AuthCreatorByApi(); // Fornece a instância adequada de product
authByApi.checkFeature("/", "abc");

// ==================================================================================

// Product
class SomeProduct {
  operation() {}
}

// Creator
abstract class SomeCreator {
  createSomeProduct(productId?: number): SomeProduct {
    // Instância por omissão
    return new SomeProduct();
  }

  doAnythingWithProduct() {
    const any = this.getAny();
    let productId = 0;

    if (any.type === "a") productId = 1;
    else productId = 2;

    const product = this.createSomeProduct(productId);
    product.operation();
  }

  private getAny() {
    return { type: "a", name: "letter a" };
  }
}

// ConcreteCreator1
class SomeCreatorImpl1 extends SomeCreator {
  createSomeProduct(productId: number): SomeProduct {
    if (productId === 1) return new SomeProduct1();
    if (productId === 2) return new SomeProduct2();
    return super.createSomeProduct(productId);
  }
}

// ConcreteCreator2
class SomeCreatorImpl2 extends SomeCreator {
  doAnythingWithProduct() {
    // Herda do a instância por omissão
    const product = this.createSomeProduct();
    // faça alguma coisa a mais
    product.operation();
  }
}

// ConcreteProduct1
class SomeProduct1 extends SomeProduct {
  id = 1;
}

// ConcreteProduct2
class SomeProduct2 extends SomeProduct {
  id = 2;
}

// Client code
const someCreator1 = new SomeCreatorImpl1();
const someProduct1 = someCreator1.createSomeProduct(1); // Criador parametrizado
const someProduct2 = someCreator1.createSomeProduct(2); // Criador parametrizado

const someCreate2 = new SomeCreatorImpl2(); // Instância de Product por omissão
someCreate2.doAnythingWithProduct();
