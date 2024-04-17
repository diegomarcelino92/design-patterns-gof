// Product
export interface Authorization {
  getUserFeatures(): Promise<string[]>;
  isTokenExpired(token: string): boolean;
  loginRedirect(): void;
}

// Creator
export abstract class AuthCreator {
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

// -------------------------------------------------- //
// -------------------------------------------------- //

// Product
export interface SomeProduct {
  operation(): void;
}

class OmissionProduct implements SomeProduct {
  operation() {
    console.log("instancia por omissão");
  }
}

// Creator
export abstract class SomeCreator {
  createSomeProduct(productId?: number): SomeProduct {
    // Instância por omissão criando
    // uma hierarquia de classes
    // parcialmente paralela
    return new OmissionProduct();
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
