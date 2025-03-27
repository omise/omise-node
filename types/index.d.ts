// Type definitions for omise-node
// Project: https://github.com/omise/omise-node
// Definitions by: Bhoomtawath Plinsut <https://github.com/varshard>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare function Omise(options: Omise.IOptions): Omise.IOmise;

export = Omise;

declare namespace Omise {
  export interface IOptions {
    host?: string;
    vaultHost?: string;
    publicKey?: string;
    secretKey?: string;
    omiseVersion?: string;
    scheme?: Scheme;
    userAgent?: string;
  }

  export enum Scheme {
    Http = 'http',
    Https = 'https'
  }

  export enum AuthType {
    PreAuth = "pre_auth",
    FinalAuth = "final_auth",
  }

  export interface IOmise {
    account: Account.IAccountAPI;
    balance: Balance.IBalanceAPI;
    capability: Capability.ICapabilityAPI;
    charges: Charges.IChargesAPI;
    customers: Customers.ICustomersAPI;
    disputes: Disputes.IDisputesAPI;
    events: Events.IEventsAPI;
    links: Links.ILinksAPI;
    recipients: Recipients.IRecipientsAPI;
    schedules: Schedules.ISchedulesAPI;
    sources: Sources.ISourcesAPI;
    tokens: Tokens.ITokensAPI;
    transactions: Transactions.ITransactionsAPI;
    transfers: Transfers.ITransfersAPI;
  }

  export namespace Account {
    interface IAccountAPI {
      retrieve(callback?: ResponseCallback<IAccount>): Promise<IAccount>;
      updateAccount(
        req: IRequest,
        callback?: ResponseCallback<IAccount>
      ): Promise<IAccount>;
    }

    interface IAccount extends IBaseResponse {
      email: string;
      currency: string;
      supported_currencies: string[];
      webhook_uri: string;
      team: string;
      auto_activate_recipients: boolean;
      chain_enabled: boolean;
      chain_return_uri: string;
      api_version: string;
      country: string;
      zero_interest_installments: boolean;
      metadata_export_keys: IMetadataExportKeys;
    }

    interface IMetadataExportKeys {
      charge?: string[];
      transfer?: string[];
      refund?: string[];
      dispute?: string[];
    }

    interface IRequest {
      chain_enabled?: boolean;
      chain_return_uri?: string;
      metadata_export_keys?: object;
      webhook_uri?: string;
      zero_interest_installments?: boolean;
    }
  }

  export namespace Balance {
    interface IBalanceAPI {
      retrieve(callback?: ResponseCallback<IBalance>): Promise<IBalance>;
    }

    interface IBalance extends IBaseResponse {
      total: number;
      reserve: number;
      transferable: number;
      currency: string;
    }
  }

  export namespace Capability {
    interface ICapabilityAPI {
      retrieve(callback?: ResponseCallback<ICapability>): Promise<ICapability>;
    }

    interface ICapability extends IBaseResponse {
      banks: string[];
      payment_methods: IPaymentMethod[];
      country: string;
      zero_interest_installments: boolean;
    }

    interface IPaymentMethod extends IBaseResponse {
      name: string;
      currencies: string[];
      card_brands?: string[];
      installment_terms?: number[];
    }
  }

  export namespace Cards {
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
    }

    interface ICardRequest {
      name?: string;
      expiration_month?: number;
      expiration_year?: number;
      postal_code?: string;
      city?: string;
    }

    interface ICardList extends IOccurrences {
      data: ICard[];
    }
  }

  export namespace Charges {
    interface IChargesAPI {
      create(
        req: IRequest,
        callback?: ResponseCallback<ICharge>
      ): Promise<ICharge>;
      update(
        chargeID: string,
        req: IRequest,
        callback?: ResponseCallback<ICharge>
      ): Promise<ICharge>;
      retrieve(
        chargeID: string,
        callback?: ResponseCallback<ICharge>
      ): Promise<ICharge>;
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<IChargeList>
      ): Promise<IChargeList>;
      capture(
        chargeID: string,
        req?: ICaptureRequest,
        callback?: ResponseCallback<ICharge>
      ): Promise<ICharge>;
      reverse(
        chargeID: string,
        callback?: ResponseCallback<ICharge>
      ): Promise<ICharge>;
      expire(
        chargeID: string,
        callback?: ResponseCallback<ICharge>
      ): Promise<ICharge>;
      createRefund(
        chargeID: string,
        req: IRefundRequest,
        callback?: ResponseCallback<IRefundResponse>
      ): Promise<IRefundResponse>;
      listRefunds(
        chargeID: string,
        callback?: ResponseCallback<IListRefundResponse>
      ): Promise<IListRefundResponse>;
      retrieveRefund(
        chargeID: string,
        refundID: string,
        callback?: ResponseCallback<IRefundResponse>
      ): Promise<IRefundResponse>;
    }
    interface IRequest {
      description?: string;
      amount: number;
      currency: string;
      authorization_type?: AuthType;
      capture?: boolean;
      card?: string;
      customer?: string;
      return_uri?: string;
      metadata?: { [key: string]: any };
      source?: string | Sources.IRequest;
      expires_at?: string;
      ip?: string;
      platform_fee?: IPlatformFee;
      zero_interest_installments?: boolean;
      webhook_endpoints?: [string, string?];
      recurring_reason?: RecurringReason;
      linked_account?: string;
      first_charge?: string;
      transaction_indicator?: "MIT" | "CIT";
    }

    interface ICaptureRequest {
      capture_amount: number;
    }

    type RecurringReason = "" | "unscheduled" | "standing_order" | "subscription" | "installment" | "partial_shipment" | "delayed_charge" | "no_show" | "resubmission";
    // Source: https://docs.opn.ooo/charges-api
    type ChargeStatus = "failed" | "reversed" | "expired" | "pending" | "successful";

    interface ICharge extends IBaseResponse {
      amount: number;
      currency: string;
      authorization_type: AuthType;
      authorized_amount: number;
      captured_amount: number;
      description: string;
      device: any;
      disputable: boolean;
      capturable: boolean;
      capture: boolean;
      authorize_uri: string;
      authorized: boolean;
      branch: any;
      reversed: boolean;
      paid: boolean;
      paid_at: string;
      transaction: string | Transactions.ITransaction;
      refunds: IListRefundResponse;
      failure_code: string;
      failure_message: string;
      merchant_advice: string | null;
      merchant_advice_code: string | null;
      missing_3ds_fields: string[];
      card: Cards.ICard;
      customer: string | Customers.ICustomer;
      ip: string;
      dispute: string | Disputes.IResponse;
      expired: boolean;
      expired_at: string;
      expires_at: string;
      interest: number;
      interest_vat: number;
      link: string | Links.ILink;
      net: number;
      platform_fee: IPlatformFee;
      refundable: boolean;
      refunded_amount: number;
      return_uri: string;
      reversed_at: string;
      reversible: boolean;
      schedule: string | Schedules.ISchedule;
      terminal: any;
      voided: boolean;
      zero_interest_installments: boolean;
      metadata: { [key: string]: any };
      source?: Sources.ISource;
      status: ChargeStatus;
      linked_account?: string;
    }

    interface IListRefundResponse extends IOccurrences {
      data: IRefundResponse[];
    }

    interface IChargeList extends IOccurrences {
      data: ICharge[];
    }

    interface IRefundRequest {
      amount: number;
      metadata?: { [key: string]: any };
      void?: boolean;
    }

    interface IPlatformFee {
      fixed: number;
      percentage: number;
    }

    interface IRefundResponse extends IBaseResponse {
      amount: number;
      currency: string;
      charge: string;
      transaction: string;
      voided: boolean;
      metadata?: { [key: string]: any };
    }
  }

  export namespace Sources {
    interface ISourcesAPI {
      create(
        req: IRequest,
        callback?: ResponseCallback<ISource>
      ): Promise<ISource>;
      retrieve(
        sourceID: string,
        callback?: ResponseCallback<ISource>
      ): Promise<ISource>;
    }

    interface IRequest {
      type: string;
      amount: number;
      currency: string;
      phone_number?: string;
      barcode?: string;
      email?: string;
      installment_term?: number;
      name?: string;
      store_id?: string;
      store_name?: string;
      terminal_id?: string;
      zero_interest_installments?: boolean;
      billing?: IBillingShipping;
      shipping?: IBillingShipping;
      promotion_code?: string;
      items?: IItem[];
    }

    interface ISource extends IBaseResponse {
      type: string;
      flow: string;
      amount: number;
      currency: string;
      barcode?: string;
      charge_status?: string;
      mobile_number: string;
      phone_number: string;
      email?: string;
      installment_term?: number;
      name?: string;
      store_id?: string;
      store_name?: string;
      terminal_id?: string;
      zero_interest_installments?: boolean;
      scannable_code: IScannableCode;
      references: IReferences;
      billing?: IBillingShipping;
      shipping?: IBillingShipping;
      promotion_code?: string;
      items: IItem[];
    }

    interface IReferences {
      expires_at: string;
      device_id: string;
      customer_amount: number;
      customer_currency: string;
      customer_exchange_rate: number;
      omise_tax_id: string;
      reference_number_1: string;
      reference_number_2: string;
      barcode: string;
      payment_code: string;
      va_code: string;
    }

    interface IScannableCode extends IBaseResponse {
      type: string;
      image: Disputes.IDocument;
    }

    interface IItem {
      amount?: number;
      sku?: string;
      name?: string;
      quantity?: string;
      category?: string;
      brand?: string;
      item_uri?: string;
      image_uri?: string;
    }
  }

  export namespace Customers {
    interface ICustomersAPI {
      create(
        req: IRequest,
        callback?: ResponseCallback<ICustomer>
      ): Promise<ICustomer>;
      retrieve(
        customerID: string,
        callback?: ResponseCallback<ICustomer>
      ): Promise<ICustomer>;
      update(
        customerID: string,
        req: IRequest,
        callback?: ResponseCallback<ICustomer>
      ): Promise<ICustomer>;
      destroy(
        customerID: string,
        callback?: ResponseCallback<IDestroyResponse>
      ): Promise<IDestroyResponse>;
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<ICustomerList>
      ): Promise<ICustomerList>;
      listCards(
        customerID: string,
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<Cards.ICardList>
      ): Promise<Cards.ICardList>;
      retrieveCard(
        customerID: string,
        cardID: string,
        callback?: ResponseCallback<Cards.ICard>
      ): Promise<Cards.ICard>;
      updateCard(
        customerID: string,
        cardID: string,
        details: Cards.ICardRequest,
        callback?: ResponseCallback<Cards.ICard>
      ): Promise<Cards.ICard>;
      destroyCard(
        customerID: string,
        cardID: string,
        callback?: ResponseCallback<Cards.ICard>
      ): Promise<Cards.ICard>;
      schedules(
        customerID: string,
        callback?: ResponseCallback<Schedules.ISchedulesList>
      ): Promise<Schedules.ISchedulesList>;
    }

    interface IRequest {
      email?: string;
      description?: string;
      card?: string;
      metadata?: { [key: string]: any };
    }

    interface ICustomer extends IBaseResponse {
      default_card: string;
      email: string;
      description: string;
      cards: Cards.ICardList;
      metadata: { [key: string]: any };
      deleted: boolean;
    }

    interface ICustomerList extends IOccurrences {
      data: ICustomer[];
    }
  }

  export namespace Disputes {
    interface IDisputesAPI {
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<IListResponse>
      ): Promise<IListResponse>;
      listClosed(
        callback?: ResponseCallback<IListResponse>
      ): Promise<IListResponse>;
      listOpen(
        callback?: ResponseCallback<IListResponse>
      ): Promise<IListResponse>;
      listPending(
        callback?: ResponseCallback<IListResponse>
      ): Promise<IListResponse>;
      retrieve(
        disputeID: string,
        callback?: ResponseCallback<IResponse>
      ): Promise<IResponse>;
      update(
        disputeID: string,
        req: IRequest,
        callback?: ResponseCallback<IResponse>
      ): Promise<IResponse>;
    }

    interface IRequest {
      message: string;
    }

    interface IResponse extends IBaseResponse {
      admin_message: string;
      amount: number;
      charge: string | Charges.ICharge;
      closed_at: string;
      currency: string;
      message: string;
      documents: IDocumentsList;
      reason_code: string;
      reason_message: string;
      status: string;
      transaction: string;
      funding_amount: number;
      funding_currency: string;
      metadata: { [key: string]: any };
      transactions: Transactions.ITransaction[];
    }

    interface IListResponse extends IOccurrences {
      data: IResponse[];
    }

    interface IDocument extends IBaseResponse {
      filename: string;
      deleted: boolean;
      download_uri: string;
    }

    interface IDocumentsList extends IOccurrences {
      data: IDocument[];
    }
  }

  export namespace Events {
    interface IEventsAPI {
      retrieve(
        eventID: string,
        callback?: ResponseCallback<IEvent>
      ): Promise<IEvent>;
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<IEventList>
      ): Promise<IEventList>;
    }

    interface IEvent extends IBaseResponse {
      key: string;
      data: any;
      webhook_deliveries: IWebhookDelivery[];
    }

    interface IEventList extends IOccurrences {
      data: IEvent[];
    }

    interface IWebhookDelivery extends IBaseResponse {
      uri: string;
      status: number;
    }
  }

  export namespace Links {
    interface ILinksAPI {
      retrieve(
        linkID: string,
        callback?: ResponseCallback<ILink>
      ): Promise<ILink>;
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<ILinkListResponse>
      ): Promise<ILinkListResponse>;
      create(
        req: IRequest,
        callback?: ResponseCallback<ILink>
      ): Promise<ILink>;
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
      deleted: boolean;
      deleted_at: string;
      used_at: string;
    }

    interface ILinkListResponse extends IOccurrences {
      data: ILink[];
    }
  }

  export namespace Recipients {
    interface IRecipientsAPI {
      create(
        req: IRequest,
        callback?: ResponseCallback<IRecipient>
      ): Promise<IRecipient>;
      update(
        recipientID: string,
        req: IRequest,
        callback?: ResponseCallback<IRecipient>
      ): Promise<IRecipient>;
      retrieve(
        recipientID: string,
        callback?: ResponseCallback<IRecipient>
      ): Promise<IRecipient>;
      destroy(
        recipientID: string,
        callback?: ResponseCallback<IDestroyResponse>
      ): Promise<IDestroyResponse>;
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<IRecipientList>
      ): Promise<IRecipientList>;
    }

    interface IRequest {
      name: string;
      email?: string;
      description?: string;
      type: string;
      tax_id?: string;
      bank_account: IBankAccountRequest;
      metadata?: { [key: string]: any };
    }

    interface IRecipient extends IBaseResponse {
      verified: boolean;
      verified_at: string;
      active: boolean;
      activated_at: string;
      default: boolean;
      deleted: boolean;
      name: string;
      email: string;
      description: string;
      type: string;
      tax_id: string;
      bank_account: IBankAccountResponse;
      failure_code: string;
      metadata?: { [key: string]: any };
      schedule?: string | Schedules.ISchedule;
    }

    interface IRecipientList extends IOccurrences {
      data: IRecipient[];
    }
  }

  export namespace Transactions {
    interface ITransactionsAPI {
      retrieve(
        transactionID: string,
        callback?: ResponseCallback<ITransaction>
      ): Promise<ITransaction>;
      list(
        parameters?: Pagination.IRequest,
        callback?: ResponseCallback<ITransactionList>
      ): Promise<ITransactionList>;
    }

    interface ITransaction extends IBaseResponse {
      type: string;
      amount: number;
      currency: string;
      transferable: string;
      direction: string;
      key: string;
      origin: string;
      transferable_at: string;
    }

    interface ITransactionList extends IOccurrences {
      data: ITransaction[];
    }
  }

  export namespace Transfers {
    interface ITransfersAPI {
      create(
        req: IRequest,
        callback?: ResponseCallback<ITransfer>
      ): Promise<ITransfer>;
      update(
        transferID: string,
        req: IRequest,
        callback?: ResponseCallback<ITransfer>
      ): Promise<ITransfer>;
      retrieve(
        transferID: string,
        callback?: ResponseCallback<ITransfer>
      ): Promise<ITransfer>;
      destroy(
        transferID: string,
        callback?: ResponseCallback<IDestroyResponse>
      ): Promise<IDestroyResponse>;
      list(
        parameters: Pagination.IRequest,
        callback?: ResponseCallback<ITransferList>
      ): Promise<ITransferList>;
    }

    interface IRequest {
      amount: number;
      recipient?: string;
      fail_fast?: boolean;
      metadata?: { [key: string]: any };
      split_transfer?: boolean;
      idemp_key?: string;
    }

    interface ITransfer extends IBaseResponse {
      recipient: string | Recipients.IRecipient;
      schedule: string | Schedules.ISchedule;
      sendable: boolean;
      bank_account: IBankAccountResponse;
      sent: boolean;
      sent_at: string;
      paid: boolean;
      paid_at: string;
      amount: number;
      currency: string;
      fee: number;
      fee_vat: number;
      net: number;
      fail_fast: boolean;
      failure_code: boolean;
      failure_message: string;
      transaction: string;
      deleted: boolean;
      total_fee: number;
      metadata?: { [key: string]: any };
      transactions: Transactions.ITransaction[];
    }

    interface ITransferList extends IOccurrences {
      data: ITransfer[];
    }
  }

  export namespace Tokens {
    interface ITokensAPI {
      create(
        options: IRequest,
        callback?: ResponseCallback<IToken>
      ): Promise<IToken>;
      retrieve(
        tokenID: string,
        callback?: ResponseCallback<IToken>
      ): Promise<IToken>;
    }

    interface IRequest {
      card: ICard;
    }

    interface ICard {
      name: string;
      city: string;
      postal_code: number | string;
      number: string;
      security_code: string;
      expiration_month: number | string;
      expiration_year: number | string;
      country?: string;
      state?: string;
      phone_number?: string;
      street1?: string;
      street2?: string;
      email?: string;
    }

    interface IToken extends IBaseResponse {
      used: boolean;
      card: Cards.ICard;
      charge_status: string;
    }
  }

  export namespace Schedules {
    interface ISchedulesAPI {
      create(
        options: ICreateSchedule,
        callback?: ResponseCallback<ISchedule>
      ): Promise<ISchedule>;
      retrieve(
        scheduleID: string,
        callback?: ResponseCallback<ISchedule>
      ): Promise<ISchedule>;
      destroy(
        scheduleID: string,
        callback?: ResponseCallback<IDestroyResponse>
      ): Promise<IDestroyResponse>;
    }

    interface IChargeScheduleResponse {
      amount: number;
      currency: string;
      description: string;
      customer: string | Customers.ICustomer;
      card: string | Cards.ICard;
      default_card: boolean;
      metadata?: { [key: string]: any };
    }

    interface ICreateSchedule {
      every: number;
      period: string;
      on?: Ion;
      start_date: string;
      end_date: string;
      charge?: IChargeScheduleRequest;
      transfer?: ITransferScheduleRequest;
    }

    interface IChargeScheduleRequest {
      customer: string;
      card?: string;
      amount: number;
      description: string;
      metadata?: { [key: string]: any };
    }

    interface ITransferScheduleRequest {
      recipient: string;
      amount?: number;
      percentage_of_balance?: number;
    }

    interface Ion {
      weekdays?: string[];
      days_of_month?: number[];
      weekday_of_month?: string;
    }

    interface ISchedule extends IBaseResponse {
      status: string;
      active: boolean;
      every: number;
      period: string;
      on: Ion;
      start_on: string;
      in_words: string;
      start_date: string;
      end_date: string;
      occurrences: IOccurrences;
      next_occurrences_on: string[];
      charge?: IChargeScheduleResponse;
      end_on: string;
      ended_at: string;
      deleted: boolean;
      transfer?: Transfers.ITransfer;
    }

    interface ISchedulesList extends IOccurrences {
      data: ISchedule[];
    }
  }

  export namespace Pagination {
    interface IRequest {
      offset?: number;
      limit?: number;
      from?: string;
      to?: string;
      order?: string;
      total?: number;
    }
  }

  interface IOccurrences {
    object: string;
    offset: number;
    limit: number;
    from: string;
    to: string;
    order: string;
    total: number;
    data: any[];
    location?: string;
  }

  interface IBankAccountResponse extends IBaseResponse{
    name: string;
    account_number: string;
    bank_code: string;
    brand: string;
    last_digits: string;
    type?: string;
    branch_code?: string;
  }

  interface IBankAccountRequest {
    name: string;
    number: string;
    bank_code: string;
    branch_code?: string;
    type?: string; // normal | current
  }

  interface IBaseResponse {
    object: string;
    id: string;
    livemode?: boolean;
    location?: string;
    created_at: string;
  }

  interface IBillingShipping {
    country: string;
    city: string;
    postal_code: string;
    state: string;
    street1: string;
    street2: string;
  }

  interface IDestroyResponse extends IBaseResponse {
    deleted: boolean;
  }

  type ResponseCallback<R> = (err: any, resp: R) => void;
}
