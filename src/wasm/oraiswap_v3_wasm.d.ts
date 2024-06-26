/* tslint:disable */
/* eslint-disable */
/**
* @param {any} js_current_sqrt_price
* @param {any} js_target_sqrt_price
* @param {any} js_liquidity
* @param {any} js_amount
* @param {any} js_by_amount_in
* @param {any} js_fee
* @returns {any}
*/
export function computeSwapStep(js_current_sqrt_price: any, js_target_sqrt_price: any, js_liquidity: any, js_amount: any, js_by_amount_in: any, js_fee: any): any;
/**
* @param {any} js_sqrt_price_a
* @param {any} js_sqrt_price_b
* @param {any} js_liquidity
* @param {any} js_rounding_up
* @returns {any}
*/
export function getDeltaX(js_sqrt_price_a: any, js_sqrt_price_b: any, js_liquidity: any, js_rounding_up: any): any;
/**
* @param {any} js_sqrt_price_a
* @param {any} js_sqrt_price_b
* @param {any} js_liquidity
* @param {any} js_rounding_up
* @returns {any}
*/
export function getDeltaY(js_sqrt_price_a: any, js_sqrt_price_b: any, js_liquidity: any, js_rounding_up: any): any;
/**
* @param {any} js_starting_sqrt_price
* @param {any} js_liquidity
* @param {any} js_amount
* @param {any} js_x_to_y
* @returns {any}
*/
export function getNextSqrtPriceFromInput(js_starting_sqrt_price: any, js_liquidity: any, js_amount: any, js_x_to_y: any): any;
/**
* @param {any} js_starting_sqrt_price
* @param {any} js_liquidity
* @param {any} js_amount
* @param {any} js_x_to_y
* @returns {any}
*/
export function getNextSqrtPriceFromOutput(js_starting_sqrt_price: any, js_liquidity: any, js_amount: any, js_x_to_y: any): any;
/**
* @param {any} js_starting_sqrt_price
* @param {any} js_liquidity
* @param {any} js_x
* @param {any} js_add_x
* @returns {any}
*/
export function getNextSqrtPriceXUp(js_starting_sqrt_price: any, js_liquidity: any, js_x: any, js_add_x: any): any;
/**
* @param {any} js_starting_sqrt_price
* @param {any} js_liquidity
* @param {any} js_y
* @param {any} js_add_y
* @returns {any}
*/
export function getNextSqrtPriceYDown(js_starting_sqrt_price: any, js_liquidity: any, js_y: any, js_add_y: any): any;
/**
* @param {any} js_current_tick_index
* @param {any} js_current_sqrt_price
* @param {any} js_liquidity_delta
* @param {any} js_liquidity_sign
* @param {any} js_upper_tick
* @param {any} js_lower_tick
* @returns {any}
*/
export function calculateAmountDelta(js_current_tick_index: any, js_current_sqrt_price: any, js_liquidity_delta: any, js_liquidity_sign: any, js_upper_tick: any, js_lower_tick: any): any;
/**
* @param {any} js_amount
* @param {any} js_starting_sqrt_price
* @param {any} js_liquidity
* @param {any} js_fee
* @param {any} js_by_amount_in
* @param {any} js_x_to_y
* @returns {any}
*/
export function isEnoughAmountToChangePrice(js_amount: any, js_starting_sqrt_price: any, js_liquidity: any, js_fee: any, js_by_amount_in: any, js_x_to_y: any): any;
/**
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function calculateMaxLiquidityPerTick(js_tick_spacing: any): bigint;
/**
* @param {any} js_tick_lower
* @param {any} js_tick_upper
* @param {any} js_tick_spacing
* @returns {any}
*/
export function checkTicks(js_tick_lower: any, js_tick_upper: any, js_tick_spacing: any): any;
/**
* @param {any} js_tick_index
* @param {any} js_tick_spacing
* @returns {any}
*/
export function checkTick(js_tick_index: any, js_tick_spacing: any): any;
/**
* @param {any} js_expected_amount_out
* @param {any} js_slippage
* @returns {bigint}
*/
export function calculateMinAmountOut(js_expected_amount_out: any, js_slippage: any): bigint;
/**
* @returns {bigint}
*/
export function getGlobalMaxSqrtPrice(): bigint;
/**
* @returns {bigint}
*/
export function getGlobalMinSqrtPrice(): bigint;
/**
* @returns {bigint}
*/
export function getTickSearchRange(): bigint;
/**
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function getMaxChunk(js_tick_spacing: any): bigint;
/**
* @returns {bigint}
*/
export function getChunkSize(): bigint;
/**
* @returns {bigint}
*/
export function getMaxTickCross(): bigint;
/**
* @returns {bigint}
*/
export function getMaxTickmapQuerySize(): bigint;
/**
* @returns {bigint}
*/
export function getLiquidityTicksLimit(): bigint;
/**
* @returns {bigint}
*/
export function getMaxPoolKeysReturned(): bigint;
/**
* @returns {bigint}
*/
export function getMaxPoolPairsReturned(): bigint;
/**
* @param {any} js_lower_tick_index
* @param {any} js_lower_tick_fee_growth_outside_x
* @param {any} js_lower_tick_fee_growth_outside_y
* @param {any} js_upper_tick_index
* @param {any} js_upper_tick_fee_growth_outside_x
* @param {any} js_upper_tick_fee_growth_outside_y
* @param {any} js_pool_current_tick_index
* @param {any} js_pool_fee_growth_global_x
* @param {any} js_pool_fee_growth_global_y
* @param {any} js_position_fee_growth_inside_x
* @param {any} js_position_fee_growth_inside_y
* @param {any} js_position_liquidity
* @returns {any}
*/
export function _calculateFee(js_lower_tick_index: any, js_lower_tick_fee_growth_outside_x: any, js_lower_tick_fee_growth_outside_y: any, js_upper_tick_index: any, js_upper_tick_fee_growth_outside_x: any, js_upper_tick_fee_growth_outside_y: any, js_pool_current_tick_index: any, js_pool_fee_growth_global_x: any, js_pool_fee_growth_global_y: any, js_position_fee_growth_inside_x: any, js_position_fee_growth_inside_y: any, js_position_liquidity: any): any;
/**
* @param {any} js_token_candidate
* @param {any} js_token_to_compare
* @returns {any}
*/
export function isTokenX(js_token_candidate: any, js_token_to_compare: any): any;
/**
* @param {any} js_tick_index
* @param {any} js_tick_spacing
* @param {any} js_sqrt_price
* @returns {any}
*/
export function isValidTick(js_tick_index: any, js_tick_spacing: any, js_sqrt_price: any): any;
/**
* @param {any} js_accurate_tick
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function alignTickToSpacing(js_accurate_tick: any, js_tick_spacing: any): bigint;
/**
* @param {any} js_sqrt_price
* @param {any} js_tick_spacing
* @returns {any}
*/
export function calculateTick(js_sqrt_price: any, js_tick_spacing: any): any;
/**
* @param {any} js_x
* @param {any} js_lower_tick
* @param {any} js_upper_tick
* @param {any} js_current_sqrt_price
* @param {any} js_rounding_up
* @returns {any}
*/
export function getLiquidityByX(js_x: any, js_lower_tick: any, js_upper_tick: any, js_current_sqrt_price: any, js_rounding_up: any): any;
/**
* @param {any} js_y
* @param {any} js_lower_tick
* @param {any} js_upper_tick
* @param {any} js_current_sqrt_price
* @param {any} js_rounding_up
* @returns {any}
*/
export function getLiquidityByY(js_y: any, js_lower_tick: any, js_upper_tick: any, js_current_sqrt_price: any, js_rounding_up: any): any;
/**
* @param {any} js_fee
* @param {any} js_tick_spacing
* @returns {any}
*/
export function _newFeeTier(js_fee: any, js_tick_spacing: any): any;
/**
* @param {any} token_0
* @param {any} token_1
* @param {any} fee_tier
* @returns {any}
*/
export function _newPoolKey(token_0: any, token_1: any, fee_tier: any): any;
/**
* @returns {bigint}
*/
export function getFeeGrowthScale(): bigint;
/**
* @returns {bigint}
*/
export function getFeeGrowthDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toFeeGrowth(js_val: any, js_scale: any): bigint;
/**
* @returns {bigint}
*/
export function getFixedPointScale(): bigint;
/**
* @returns {bigint}
*/
export function getFixedPointDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toFixedPoint(js_val: any, js_scale: any): bigint;
/**
* @returns {bigint}
*/
export function getLiquidityScale(): bigint;
/**
* @returns {bigint}
*/
export function getLiquidityDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toLiquidity(js_val: any, js_scale: any): bigint;
/**
* @returns {bigint}
*/
export function getPercentageScale(): bigint;
/**
* @returns {bigint}
*/
export function getPercentageDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toPercentage(js_val: any, js_scale: any): bigint;
/**
* @returns {bigint}
*/
export function getPriceScale(): bigint;
/**
* @returns {bigint}
*/
export function getPriceDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toPrice(js_val: any, js_scale: any): bigint;
/**
* @returns {bigint}
*/
export function getSecondsPerLiquidityScale(): bigint;
/**
* @returns {bigint}
*/
export function getSecondsPerLiquidityDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toSecondsPerLiquidity(js_val: any, js_scale: any): bigint;
/**
* @returns {bigint}
*/
export function getSqrtPriceScale(): bigint;
/**
* @returns {bigint}
*/
export function getSqrtPriceDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toSqrtPrice(js_val: any, js_scale: any): bigint;
/**
* @param {any} js_tick_index
* @returns {any}
*/
export function calculateSqrtPrice(js_tick_index: any): any;
/**
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function getMaxTick(js_tick_spacing: any): bigint;
/**
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function getMinTick(js_tick_spacing: any): bigint;
/**
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function getMaxSqrtPrice(js_tick_spacing: any): bigint;
/**
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function getMinSqrtPrice(js_tick_spacing: any): bigint;
/**
* @returns {bigint}
*/
export function getTokenAmountScale(): bigint;
/**
* @returns {bigint}
*/
export function getTokenAmountDenominator(): bigint;
/**
* @param {any} js_val
* @param {any} js_scale
* @returns {bigint}
*/
export function toTokenAmount(js_val: any, js_scale: any): bigint;
/**
* @param {any} js_tickmap
* @param {any} js_fee_tier
* @param {any} js_pool
* @param {any} js_ticks
* @param {any} js_x_to_y
* @param {any} js_amount
* @param {any} js_by_amount_in
* @param {any} js_sqrt_price_limit
* @returns {any}
*/
export function simulateSwap(js_tickmap: any, js_fee_tier: any, js_pool: any, js_ticks: any, js_x_to_y: any, js_amount: any, js_by_amount_in: any, js_sqrt_price_limit: any): any;
/**
* @param {any} js_tick
* @param {any} js_tick_spacing
* @returns {any}
*/
export function tickIndexToPosition(js_tick: any, js_tick_spacing: any): any;
/**
* @param {any} js_chunk
* @param {any} js_bit
* @param {any} js_tick_spacing
* @returns {bigint}
*/
export function positionToTick(js_chunk: any, js_bit: any, js_tick_spacing: any): bigint;
/**
*/
export enum SwapError {
  NotAdmin = 0,
  NotFeeReceiver = 1,
  PoolAlreadyExist = 2,
  PoolNotFound = 3,
  TickAlreadyExist = 4,
  InvalidTickIndexOrTickSpacing = 5,
  PositionNotFound = 6,
  TickNotFound = 7,
  FeeTierNotFound = 8,
  PoolKeyNotFound = 9,
  AmountIsZero = 10,
  WrongLimit = 11,
  PriceLimitReached = 12,
  NoGainSwap = 13,
  InvalidTickSpacing = 14,
  FeeTierAlreadyExist = 15,
  PoolKeyAlreadyExist = 16,
  UnauthorizedFeeReceiver = 17,
  ZeroLiquidity = 18,
  TransferError = 19,
  TokensAreSame = 20,
  AmountUnderMinimumAmountOut = 21,
  InvalidFee = 22,
  NotEmptyTickDeinitialization = 23,
  InvalidInitTick = 24,
  InvalidInitSqrtPrice = 25,
  TickLimitReached = 26,
}
export interface AmountDeltaResult {
    x: TokenAmount;
    y: TokenAmount;
    update_liquidity: boolean;
}

export interface SwapResult {
    nextSqrtPrice: SqrtPrice;
    amountIn: TokenAmount;
    amountOut: TokenAmount;
    feeAmount: TokenAmount;
}

export type calculateAmountDeltaResult = [TokenAmount, TokenAmount, boolean];

export interface SwapHop {
    poolKey: PoolKey;
    xToY: boolean;
}

export interface QuoteResult {
    amountIn: TokenAmount;
    amountOut: TokenAmount;
    targetSqrtPrice: SqrtPrice;
    ticks: Tick[];
}

export interface TokenAmounts {
    x: TokenAmount;
    y: TokenAmount;
}

export type _calculateFeeResult = [TokenAmount, TokenAmount];

export interface SingleTokenLiquidity {
    l: Liquidity;
    amount: TokenAmount;
}

export interface Config {
    admin: string;
    protocolFee: Percentage;
}

export type SwapError = "NotAdmin" | "NotFeeReceiver" | "PoolAlreadyExist" | "PoolNotFound" | "TickAlreadyExist" | "InvalidTickIndexOrTickSpacing" | "PositionNotFound" | "TickNotFound" | "FeeTierNotFound" | "PoolKeyNotFound" | "AmountIsZero" | "WrongLimit" | "PriceLimitReached" | "NoGainSwap" | "InvalidTickSpacing" | "FeeTierAlreadyExist" | "PoolKeyAlreadyExist" | "UnauthorizedFeeReceiver" | "ZeroLiquidity" | "TransferError" | "TokensAreSame" | "AmountUnderMinimumAmountOut" | "InvalidFee" | "NotEmptyTickDeinitialization" | "InvalidInitTick" | "InvalidInitSqrtPrice" | "TickLimitReached";

export interface CreatePositionEvent {
    timestamp: bigint;
    address: string;
    pool: PoolKey;
    liquidity: Liquidity;
    lowerTick: bigint;
    upperTick: bigint;
    currentSqrtPrice: SqrtPrice;
}

export interface CrossTickEvent {
    timestamp: bigint;
    address: string;
    pool: PoolKey;
    indexes: bigint[];
}

export interface RemovePositionEvent {
    timestamp: bigint;
    address: string;
    pool: PoolKey;
    liquidity: Liquidity;
    lowerTick: bigint;
    upperTick: bigint;
    currentSqrtPrice: SqrtPrice;
}

export interface SwapEvent {
    timestamp: bigint;
    address: string;
    pool: PoolKey;
    amountIn: TokenAmount;
    amountOut: TokenAmount;
    fee: TokenAmount;
    startSqrtPrice: SqrtPrice;
    targetSqrtPrice: SqrtPrice;
    xToY: boolean;
}

export interface FeeTier {
    fee: Percentage;
    tickSpacing: bigint;
}

export interface Pool {
    liquidity: Liquidity;
    sqrtPrice: SqrtPrice;
    currentTickIndex: bigint;
    feeGrowthGlobalX: FeeGrowth;
    feeGrowthGlobalY: FeeGrowth;
    feeProtocolTokenX: TokenAmount;
    feeProtocolTokenY: TokenAmount;
    startTimestamp: bigint;
    lastTimestamp: bigint;
    feeReceiver: string;
}

export interface PoolKey {
    tokenX: string;
    tokenY: string;
    feeTier: FeeTier;
}

export interface Position {
    poolKey: PoolKey;
    liquidity: Liquidity;
    lowerTickIndex: bigint;
    upperTickIndex: bigint;
    feeGrowthInsideX: FeeGrowth;
    feeGrowthInsideY: FeeGrowth;
    lastBlockNumber: bigint;
    tokensOwedX: TokenAmount;
    tokensOwedY: TokenAmount;
}

export interface Tick {
    index: bigint;
    sign: boolean;
    liquidityChange: Liquidity;
    liquidityGross: Liquidity;
    sqrtPrice: SqrtPrice;
    feeGrowthOutsideX: FeeGrowth;
    feeGrowthOutsideY: FeeGrowth;
    secondsOutside: bigint;
}

export interface PositionTick {
    index: bigint;
    feeGrowthOutsideX: FeeGrowth;
    feeGrowthOutsideY: FeeGrowth;
    secondsOutside: bigint;
}

export interface LiquidityTick {
    index: bigint;
    liquidityChange: Liquidity;
    sign: boolean;
}

export type FeeGrowth = bigint;

export type FixedPoint = bigint;

export type Liquidity = bigint;

export type Percentage = bigint;

export type Price = bigint;

export type SecondsPerLiquidity = bigint;

export type SqrtPrice = bigint;

export type TokenAmount = bigint;

export interface Tickmap {
    bitmap: Map<bigint,bigint>;
}

export type tickIndexToPositionResult = [number, number];

export interface CalculateSwapResult {
    amountIn: TokenAmount;
    amountOut: TokenAmount;
    fee: TokenAmount;
    startSqrtPrice: SqrtPrice;
    targetSqrtPrice: SqrtPrice;
    crossedTicks: LiquidityTick[];
    globalInsufficientLiquidity: boolean;
    stateOutdated: boolean;
    maxTicksCrossed: boolean;
}


export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly computeSwapStep: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly getDeltaX: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly getDeltaY: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly getNextSqrtPriceFromInput: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly getNextSqrtPriceFromOutput: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly getNextSqrtPriceXUp: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly getNextSqrtPriceYDown: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly calculateAmountDelta: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly isEnoughAmountToChangePrice: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly calculateMaxLiquidityPerTick: (a: number, b: number) => void;
  readonly checkTicks: (a: number, b: number, c: number, d: number) => void;
  readonly checkTick: (a: number, b: number, c: number) => void;
  readonly calculateMinAmountOut: (a: number, b: number, c: number) => void;
  readonly getGlobalMaxSqrtPrice: (a: number) => void;
  readonly getGlobalMinSqrtPrice: (a: number) => void;
  readonly getTickSearchRange: (a: number) => void;
  readonly getMaxChunk: (a: number, b: number) => void;
  readonly getChunkSize: (a: number) => void;
  readonly getMaxTickCross: (a: number) => void;
  readonly getMaxTickmapQuerySize: (a: number) => void;
  readonly getLiquidityTicksLimit: (a: number) => void;
  readonly getMaxPoolKeysReturned: (a: number) => void;
  readonly getMaxPoolPairsReturned: (a: number) => void;
  readonly _calculateFee: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => void;
  readonly isTokenX: (a: number, b: number, c: number) => void;
  readonly isValidTick: (a: number, b: number, c: number, d: number) => void;
  readonly alignTickToSpacing: (a: number, b: number, c: number) => void;
  readonly calculateTick: (a: number, b: number, c: number) => void;
  readonly getLiquidityByX: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly getLiquidityByY: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly _newFeeTier: (a: number, b: number, c: number) => void;
  readonly _newPoolKey: (a: number, b: number, c: number, d: number) => void;
  readonly getFeeGrowthScale: () => number;
  readonly getFeeGrowthDenominator: () => number;
  readonly toFeeGrowth: (a: number, b: number) => number;
  readonly getFixedPointScale: () => number;
  readonly getFixedPointDenominator: () => number;
  readonly toFixedPoint: (a: number, b: number) => number;
  readonly getLiquidityScale: () => number;
  readonly getLiquidityDenominator: () => number;
  readonly toLiquidity: (a: number, b: number) => number;
  readonly getPercentageDenominator: () => number;
  readonly toPercentage: (a: number, b: number) => number;
  readonly getPriceScale: () => number;
  readonly getPriceDenominator: () => number;
  readonly toPrice: (a: number, b: number) => number;
  readonly toSecondsPerLiquidity: (a: number, b: number) => number;
  readonly toSqrtPrice: (a: number, b: number) => number;
  readonly calculateSqrtPrice: (a: number, b: number) => void;
  readonly getMaxTick: (a: number, b: number) => void;
  readonly getMinTick: (a: number, b: number) => void;
  readonly getMaxSqrtPrice: (a: number, b: number) => void;
  readonly getMinSqrtPrice: (a: number, b: number) => void;
  readonly getTokenAmountScale: () => number;
  readonly getTokenAmountDenominator: () => number;
  readonly toTokenAmount: (a: number, b: number) => number;
  readonly simulateSwap: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly tickIndexToPosition: (a: number, b: number, c: number) => void;
  readonly positionToTick: (a: number, b: number, c: number, d: number) => void;
  readonly getSecondsPerLiquidityDenominator: () => number;
  readonly getSqrtPriceDenominator: () => number;
  readonly getPercentageScale: () => number;
  readonly getSecondsPerLiquidityScale: () => number;
  readonly getSqrtPriceScale: () => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
