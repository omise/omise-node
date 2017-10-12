// Type definitions for omise-node
// Project: https://github.com/omise/omise-node
// Definitions by: Bhoomtawath Plinsut <https://github.com/varshard>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as Bluebird from "bluebird";

declare function omise(options: Omise.Options): Omise.OmiseStatic;

declare module Omise {
  interface Options {
    publicKey: string;
    secretKey: string;
  }

  interface OmiseStatic {
    accounts: Account.Account;
    balances: Balance.Balance;
    charges: Charges.Charges;
    customers: Customers.Customers;
    disputes: Disputes.Disputes;
    events: Events.Events;
    links: Links.Links;
    recipients: Recipients.Recipients;
    tokens: Tokens.Tokens;
    transactions: Transactions.Transactions;
    transfers: Transfers.Transfers;
  }

  namespace Account {
    interface Account {
      retrieve(callback?: ResponseCallback): Bluebird<Account>;
    }

    interface Account extends BaseResponse {
      email: string;
      currency: string;
      supported_currencies: [string];
      created: string;
    }
  }

  namespace Balance {
    interface Balance {
      retrieve(callback?: ResponseCallback): Bluebird<Balance>;
    }

    interface Balance extends BaseResponse {
      available: number;
      total: number;
      currency: string;
    }
  }

  namespace Cards {
    interface Card extends BaseResponse {
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

    interface CardRequest {
      name?: string;
      expiration_month?: number;
      expiration_year?: number;
      postal_code?: string;
      city?: string;
    }

    interface CardList extends Pagination.Response {
      data: [Card];
    }
  }

  namespace Charges {
    interface Charges {
      create(req: Request, callback?: ResponseCallback): Bluebird<Charge>;
      update(chargeID: string, req: Request, callback?: ResponseCallback): Bluebird<Charge>;
      retrieve(chargeID: string, callback?: ResponseCallback): Bluebird<Charge>;
      list(parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<ChargeList>;
      capture(chargeID: string, callback?: ResponseCallback): Bluebird<Charge>;
      reverse(chargeID: string, callback?: ResponseCallback): Bluebird<Charge>;
      createRefund(chargeID: string, callback?: ResponseCallback): Bluebird<RefundResponse>;
      listRefunds(chargeID: string, callback?: ResponseCallback): Bluebird<ListRefundResponse>;
      retrieveRefund(chargeID: string, refundID: string, callback?: ResponseCallback): Bluebird<RefundResponse>;
    }

    interface Request {
      description?: string;
      amount: number;
      currency: string;
      capture?: boolean;
      card?: string;
      customer?: string;
      return_uri?: string;
    }

    interface Charge extends BaseResponse {
      amount: number;
      currency: string;
      description: string;
      capture: boolean;
      authorized: boolean;
      reversed: boolean;
      paid: boolean;
      transaction: string;
      refunded: number;
      refunds: ListRefundResponse;
      failure_code: string;
      failure_message: string;
      card: Cards.Card;
      customer: string;
      ip: string;
      dispute: string;
      created: string;
      metadata: {[key: string]: any};
    }

    interface ListRefundResponse extends Pagination.Response {
      data: [RefundResponse]
    }

    interface ChargeList extends Pagination.Response {
      data: [Charge]
    }

    interface RefundResponse extends BaseResponse {
      amount: number;
      currency: string;
      charge: string;
      transaction: string;
      created: string;
      voided: boolean;
    }
  }

  namespace Customers {
    interface Customers {
      create(req: Request, callback?: ResponseCallback): Bluebird<Customer>;
      retrieve(customerID: string, callback?: ResponseCallback): Bluebird<Customer>;
      update(customerID: string, req: Request, callback?: ResponseCallback, ): Bluebird<Customer>;
      destroy(customerID: string, callback?: ResponseCallback): Bluebird<DestroyResponse>;
      list(parameters?: Pagination.Request): Bluebird<CustomerList>;
      listCards(customerID: string, parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<Cards.CardList>;
      retrieveCard(customerID: string, cardID: string, callback?: ResponseCallback): Bluebird<Cards.Card>;
      updateCard(customerID: string, cardID: string, details: Cards.CardRequest,
                 callback?: ResponseCallback): Bluebird<Cards.Card>;
      destroyCard(customerID: string, cardID: string, callback?: ResponseCallback): Bluebird<Cards.Card>;
    }

    interface Request {
      email?: string;
      description?: string;
      card?: string;
    }

    interface Customer extends BaseResponse {
      default_card: string;
      email: string;
      description: string;
      created: string;
      cards: Cards.CardList;
    }

    interface CustomerList extends Pagination.Response {
      data: [Customer]
    }
  }

  namespace Disputes {
    interface Disputes {
      list(parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<ListResponse>;
      listClosed(callback?: ResponseCallback): Bluebird<ListResponse>;
      listOpen(callback?: ResponseCallback): Bluebird<ListResponse>;
      listPending(callback?: ResponseCallback): Bluebird<ListResponse>;
      retrieve(disputeID: string, callback?: ResponseCallback): Bluebird<Response>;
      update(disputeID: string, req: Request, callback?: ResponseCallback): Bluebird<Response>;
    }

    interface Request {
      message: string;
    }

    interface Response extends BaseResponse {
      amount: number;
      charge: string;
      created: string;
      closed_at: string;
      currency: string;
      message: string;
      documents: DocumentsList;
      reason_code: string;
      reason_message: string;
      status: string;
      transaction: string;
    }

    interface ListResponse extends Pagination.Response {
      data: [Response];
    }

    interface Document extends BaseResponse {
      filename: string;
      created: string;
    }

    interface DocumentsList extends Pagination.Response {
      data: [Document];
    }
  }

  namespace Events {
    interface Events {
      retrieve(eventID: string, callback?: ResponseCallback, ): Bluebird<Event>;
      list(parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<EventList>;
    }

    interface Event extends BaseResponse {
      key: string;
      created: string;
      data: any;
    }

    interface EventList extends Pagination.Response {
      data: [Event];
    }
  }

  namespace Links {
    interface Links {
      retrieve(linkID: string, callback?: ResponseCallback): Bluebird<Link>;
      list(parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<LinkListResponse>;
      create(req: Request, callback?: ResponseCallback): Bluebird<Link>;
    }

    interface Request {
      amount: number;
      currency: string;
      title: string;
      description: string;
      multiple?: boolean;
    }

    interface Link extends BaseResponse {
      amount: number;
      currency: string;
      used: boolean;
      multiple: boolean;
      title: string;
      description: string;
      charges: Charges.ChargeList;
      payment_uri: string;
      created: string;
    }

    interface LinkListResponse extends Pagination.Response {
      data: [Link];
    }
  }

  namespace Recipients {
    interface Recipients {
      create(req: Request, callback?: ResponseCallback): Bluebird<Recipient>;
      update(recipientID: string, req: Request, callback?: ResponseCallback): Bluebird<Recipient>;
      retrieve(recipientID: string, callback?: ResponseCallback): Bluebird<Recipient>;
      destroy(recipientID: string, callback?: ResponseCallback): Bluebird<DestroyResponse>;
      list(parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<RecipientList>;
    }

    interface Request {
      name: string;
      email?: string;
      description?: string;
      type: string;
      tax_id?: string;
      back_account: BankAccount;
    }

    interface Recipient extends BaseResponse {
      verified: boolean;
      active: boolean;
      name: string;
      email: string;
      description: string;
      type: string;
      tax_id: string;
      bank_account: BankAccount;
      failure_code: string;
      created: string;
    }

    interface RecipientList extends Pagination.Response {
      data: [Recipient];
    }
  }

  namespace Transactions {
    interface Transactions {
      retrieve(transactionID: string, callback?: ResponseCallback): Bluebird<Transaction>;
      list(parameters?: Pagination.Request, callback?: ResponseCallback): Bluebird<TransactionList>;
    }

    interface Transaction extends BaseResponse {
      type: string;
      amount: number;
      currency: string;
      transferable: string;
      created: string;
    }

    interface TransactionList extends Pagination.Response {
      data: [Transaction];
    }
  }

  namespace Transfers {
    interface Transfers {
      create(req: Request, callback?: ResponseCallback): Bluebird<Transfer>;
      update(transferID: string, req: Request, callback?: ResponseCallback): Bluebird<Transfer>;
      retrieve(transferID: string, callback?: ResponseCallback): Bluebird<Transfer>;
      destroy(transferID: string, callback?: ResponseCallback): Bluebird<DestroyResponse>;
      list(parameters: Pagination.Request, callback?: ResponseCallback): Bluebird<TransferList>;
    }

    interface Request {
      amount: number;
      recipient?: string;
      fail_fast?: boolean;
    }

    interface Transfer extends BaseResponse {
      recipient: string;
      bank_account: BankAccount;
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

    interface TransferList extends Pagination.Response {
      data: [Transfer];
    }
  }

  namespace Tokens {
    interface Tokens {
      create(options: CreateOptions, callback?: ResponseCallback): Bluebird<Token>;
      retrieve(tokenID: string, callback?: ResponseCallback): Bluebird<Token>;
    }

    interface CreateOptions {
      card: TokenCreateCardOptions;
    }

    interface TokenCreateCardOptions {
      name: string;
      city: string;
      postal_code: number|string;
      number: string;
      security_code: string;
      expiration_month: number|string;
      expiration_year: number|string;
    }

    interface Token extends BaseResponse {
      used: boolean;
      card: Cards.Card;
      created: string;
    }
  }

  namespace Pagination {
    interface Request {
      offset?: number;
      limit?: number;
      from?: string;
      to?: string;
      order?: string;
      total?: number;
    }

    interface Response {
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

  interface BankAccount {
    object: string;
    brand: string;
    last_digits: string;
    name: string;
    created: string;
  }

  interface BaseResponse {
    object: string;
    id: string;
    livemode?: boolean;
    location?: string;
  }

  interface DestroyResponse extends BaseResponse {
    deleted: boolean;
  }

  type ResponseCallback = (err: any, resp: any) => void;
}
