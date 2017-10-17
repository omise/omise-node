// Type definitions for omise-node
// Project: https://github.com/omise/omise-node
// Definitions by: Bhoomtawath Plinsut <https://github.com/varshard>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as Bluebird from 'bluebird';

declare function omise(options: Omise.IOptions): Omise.IOmise;

declare namespace Omise {
  interface IOptions {
    publicKey: string;
    secretKey: string;
  }

  interface IOmise {
    accounts: Account.IAccount;
    balances: Balance.IBalance;
    charges: Charges.ICharges;
    customers: Customers.ICustomers;
    disputes: Disputes.IDisputes;
    events: Events.IEvents;
    links: Links.ILinks;
    recipients: Recipients.IRecipients;
    tokens: Tokens.ITokens;
    transactions: Transactions.ITransactions;
    transfers: Transfers.ITransfers;
  }

  namespace Account {
    interface IAccount {
      retrieve(callback?: ResponseCallback): Bluebird<IAccount>;
    }

    interface IAccount extends IBaseResponse {
      email: string;
      currency: string;
      supported_currencies: [string];
      created: string;
    }
  }

  namespace Balance {
    interface IBalance {
      retrieve(callback?: ResponseCallback): Bluebird<IBalance>;
    }

    interface IBalance extends IBaseResponse {
      available: number;
      total: number;
      currency: string;
    }
  }

  namespace Cards {
    interface ICard extends IBaseResponse {
      country: string;
      city: string;
      postal_code: string;
      financing: string;
      bank: string;
      last_digits: string;
      brand: string;
      expiration_month: number;
      expiration_year: number;
      fingerprint: string;
      name: string;
      security_code_check: boolean;
      created: string;
    }

    interface ICardRequest {
      name?: string;
      expiration_month?: number;
      expiration_year?: number;
      postal_code?: string;
      city?: string;
    }

    interface ICardList extends Pagination.IResponse {
      data: [ICard];
    }
  }

  namespace Charges {
    interface ICharges {
      create(req: IRequest, callback?: ResponseCallback): Bluebird<ICharge>;
      update(chargeID: string, req: IRequest, callback?: ResponseCallback): Bluebird<ICharge>;
      retrieve(chargeID: string, callback?: ResponseCallback): Bluebird<ICharge>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback): Bluebird<IChargeList>;
      capture(chargeID: string, callback?: ResponseCallback): Bluebird<ICharge>;
      reverse(chargeID: string, callback?: ResponseCallback): Bluebird<ICharge>;
      createRefund(chargeID: string, callback?: ResponseCallback): Bluebird<IRefundResponse>;
      listRefunds(chargeID: string, callback?: ResponseCallback): Bluebird<IListRefundResponse>;
      retrieveRefund(chargeID: string, refundID: string, callback?: ResponseCallback): Bluebird<IRefundResponse>;
    }

    interface IRequest {
      description?: string;
      amount: number;
      currency: string;
      capture?: boolean;
      card?: string;
      customer?: string;
      return_uri?: string;
      metadata?: any;
    }

    interface ICharge extends IBaseResponse {
      amount: number;
      currency: string;
      description: string;
      capture: boolean;
      authorized: boolean;
      reversed: boolean;
      paid: boolean;
      transaction: string;
      refunded: number;
      refunds: IListRefundResponse;
      failure_code: string;
      failure_message: string;
      card: Cards.ICard;
      customer: string;
      ip: string;
      dispute: string;
      created: string;
      metadata: {[key: string]: any};
    }

    interface IListRefundResponse extends Pagination.IResponse {
      data: [IRefundResponse];
    }

    interface IChargeList extends Pagination.IResponse {
      data: [ICharge];
    }

    interface IRefundResponse extends IBaseResponse {
      amount: number;
      currency: string;
      charge: string;
      transaction: string;
      created: string;
      voided: boolean;
    }
  }

  namespace Customers {
    interface ICustomers {
      create(req: IRequest, callback?: ResponseCallback): Bluebird<ICustomer>;
      retrieve(customerID: string, callback?: ResponseCallback): Bluebird<ICustomer>;
      update(customerID: string, req: IRequest, callback?: ResponseCallback): Bluebird<ICustomer>;
      destroy(customerID: string, callback?: ResponseCallback): Bluebird<IDestroyResponse>;
      list(parameters?: Pagination.IRequest): Bluebird<ICustomerList>;
      listCards(customerID: string, parameters?: Pagination.IRequest, callback?: ResponseCallback)
        : Bluebird<Cards.ICardList>;
      retrieveCard(customerID: string, cardID: string, callback?: ResponseCallback): Bluebird<Cards.ICard>;
      updateCard(customerID: string, cardID: string, details: Cards.ICardRequest,
                 callback?: ResponseCallback): Bluebird<Cards.ICard>;
      destroyCard(customerID: string, cardID: string, callback?: ResponseCallback): Bluebird<Cards.ICard>;
    }

    interface IRequest {
      email?: string;
      description?: string;
      card?: string;
    }

    interface ICustomer extends IBaseResponse {
      default_card: string;
      email: string;
      description: string;
      created: string;
      cards: Cards.ICardList;
    }

    interface ICustomerList extends Pagination.IResponse {
      data: [ICustomer];
    }
  }

  namespace Disputes {
    interface IDisputes {
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback): Bluebird<IListResponse>;
      listClosed(callback?: ResponseCallback): Bluebird<IListResponse>;
      listOpen(callback?: ResponseCallback): Bluebird<IListResponse>;
      listPending(callback?: ResponseCallback): Bluebird<IListResponse>;
      retrieve(disputeID: string, callback?: ResponseCallback): Bluebird<IResponse>;
      update(disputeID: string, req: IRequest, callback?: ResponseCallback): Bluebird<IResponse>;
    }

    interface IRequest {
      message: string;
    }

    interface IResponse extends IBaseResponse {
      amount: number;
      charge: string;
      created: string;
      closed_at: string;
      currency: string;
      message: string;
      documents: IDocumentsList;
      reason_code: string;
      reason_message: string;
      status: string;
      transaction: string;
    }

    interface IListResponse extends Pagination.IResponse {
      data: [IResponse];
    }

    interface IDocument extends IBaseResponse {
      filename: string;
      created: string;
    }

    interface IDocumentsList extends Pagination.IResponse {
      data: [IDocument];
    }
  }

  namespace Events {
    interface IEvents {
      retrieve(eventID: string, callback?: ResponseCallback): Bluebird<IEvent>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback): Bluebird<IEventList>;
    }

    interface IEvent extends IBaseResponse {
      key: string;
      created: string;
      data: any;
    }

    interface IEventList extends Pagination.IResponse {
      data: [IEvent];
    }
  }

  namespace Links {
    interface ILinks {
      retrieve(linkID: string, callback?: ResponseCallback): Bluebird<ILink>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback): Bluebird<ILinkListResponse>;
      create(req: IRequest, callback?: ResponseCallback): Bluebird<ILink>;
    }

    interface IRequest {
      amount: number;
      currency: string;
      title: string;
      description: string;
      multiple?: boolean;
    }

    interface ILink extends IBaseResponse {
      amount: number;
      currency: string;
      used: boolean;
      multiple: boolean;
      title: string;
      description: string;
      charges: Charges.IChargeList;
      payment_uri: string;
      created: string;
    }

    interface ILinkListResponse extends Pagination.IResponse {
      data: [ILink];
    }
  }

  namespace Recipients {
    interface IRecipients {
      create(req: IRequest, callback?: ResponseCallback): Bluebird<IRecipient>;
      update(recipientID: string, req: IRequest, callback?: ResponseCallback): Bluebird<IRecipient>;
      retrieve(recipientID: string, callback?: ResponseCallback): Bluebird<IRecipient>;
      destroy(recipientID: string, callback?: ResponseCallback): Bluebird<IDestroyResponse>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback): Bluebird<IRecipientList>;
    }

    interface IRequest {
      name: string;
      email?: string;
      description?: string;
      type: string;
      tax_id?: string;
      back_account: IBankAccount;
    }

    interface IRecipient extends IBaseResponse {
      verified: boolean;
      active: boolean;
      name: string;
      email: string;
      description: string;
      type: string;
      tax_id: string;
      bank_account: IBankAccount;
      failure_code: string;
      created: string;
    }

    interface IRecipientList extends Pagination.IResponse {
      data: [IRecipient];
    }
  }

  namespace Transactions {
    interface ITransactions {
      retrieve(transactionID: string, callback?: ResponseCallback): Bluebird<ITransaction>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback): Bluebird<ITransactionList>;
    }

    interface ITransaction extends IBaseResponse {
      type: string;
      amount: number;
      currency: string;
      transferable: string;
      created: string;
    }

    interface ITransactionList extends Pagination.IResponse {
      data: [ITransaction];
    }
  }

  namespace Transfers {
    interface ITransfers {
      create(req: IRequest, callback?: ResponseCallback): Bluebird<ITransfer>;
      update(transferID: string, req: IRequest, callback?: ResponseCallback): Bluebird<ITransfer>;
      retrieve(transferID: string, callback?: ResponseCallback): Bluebird<ITransfer>;
      destroy(transferID: string, callback?: ResponseCallback): Bluebird<IDestroyResponse>;
      list(parameters: Pagination.IRequest, callback?: ResponseCallback): Bluebird<ITransferList>;
    }

    interface IRequest {
      amount: number;
      recipient?: string;
      fail_fast?: boolean;
    }

    interface ITransfer extends IBaseResponse {
      recipient: string;
      bank_account: IBankAccount;
      sent: boolean;
      paid: boolean;
      amount: number;
      currency: string;
      fee: number;
      fail_fast: boolean;
      failure_code: boolean;
      failure_message: string;
      transaction: string;
      created: string;
    }

    interface ITransferList extends Pagination.IResponse {
      data: [ITransfer];
    }
  }

  namespace Tokens {
    interface ITokens {
      create(options: ICreateOptions, callback?: ResponseCallback): Bluebird<IToken>;
      retrieve(tokenID: string, callback?: ResponseCallback): Bluebird<IToken>;
    }

    interface ICreateOptions {
      card: ITokenCreateCardOptions;
    }

    interface ITokenCreateCardOptions {
      name: string;
      city: string;
      postal_code: number|string;
      number: string;
      security_code: string;
      expiration_month: number|string;
      expiration_year: number|string;
    }

    interface IToken extends IBaseResponse {
      used: boolean;
      card: Cards.ICard;
      created: string;
    }
  }

  namespace Pagination {
    interface IRequest {
      offset?: number;
      limit?: number;
      from?: string;
      to?: string;
      order?: string;
      total?: number;
    }

    interface IResponse {
      object: string;
      offset: number;
      limit: number;
      from: string;
      to: string;
      order: string;
      total: number;
      data: [any];
      location?: string;
    }
  }

  interface IBankAccount {
    object: string;
    brand: string;
    last_digits: string;
    name: string;
    created: string;
  }

  interface IBaseResponse {
    object: string;
    id: string;
    livemode?: boolean;
    location?: string;
  }

  interface IDestroyResponse extends IBaseResponse {
    deleted: boolean;
  }

  type ResponseCallback = (err: any, resp: any) => void;
}
