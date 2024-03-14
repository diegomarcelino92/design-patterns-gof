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
    // criar a intância do Authorization
    // fornecida pelo ConcreteCreator
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
    // alguma adicional logica aqui
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

// Product
interface SomeProduct {
  operation(authorization: Authorization): void;
}

// Creator
abstract class SomeCreator {
  abstract createSomeProduct(): SomeProduct;
}

// ConcreteCreator
class SomeCreatorImpl extends SomeCreator {
  createSomeProduct() {
    return new SomeProductImpl();
  }
}

// ConcreteProduct
class SomeProductImpl implements SomeProduct {
  operation(authorization: Authorization) {
    authorization.loginRedirect();
  }
}

// Código cliente

// Gancho para subclasses, permitindo extender a versão abstrata do criador
const authByToken = new AuthCreatorByToken();
authByToken.checkFeature("/", "abc");

const authByApi = new AuthCreatorByApi();
authByApi.checkFeature("/", "abc");

// Conexão de hierarquia de classes paralelas pelo cliente
// fazendo a comunicação através de hierarquia de classes paralelas
const authorizationByToken = authByToken.createAuthorization();
const authorizationByApi = authByApi.createAuthorization();

const someCreator = new SomeCreatorImpl();
const someProduct = someCreator.createSomeProduct();

someProduct.operation(authorizationByToken);
someProduct.operation(authorizationByApi);
