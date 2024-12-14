export class PubSubManager {
 private static instance: PubSubManager

 private constructor() {
    // private constructor
 }

 public static getInstance(): PubSubManager {

    if (!PubSubManager.instance) {

      PubSubManager.instance = new PubSubManager();

    }

    return PubSubManager.instance;

 }
    addUserToStock(userId: string, stockTicker: string) {
        // add user to stock
    }

    removeUserFromStock(userId: string, stockTicker: string) {
        // remove user from stock
    }

    forwardMessageToUser(userId: string, stockTicker: string, price: number) {{
        // forward message to user
    }
}
}
PubSubManager.getInstance();