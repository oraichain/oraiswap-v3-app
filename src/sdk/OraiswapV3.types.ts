export type Percentage = number
export interface InstantiateMsg {
  protocol_fee: Percentage
}
export type ExecuteMsg =
  | {
      withdraw_protocol_fee: {
        pool_key: PoolKey
      }
    }
  | {
      change_protocol_fee: {
        protocol_fee: Percentage
      }
    }
  | {
      change_fee_receiver: {
        fee_receiver: Addr
        pool_key: PoolKey
      }
    }
  | {
      create_position: {
        liquidity_delta: Liquidity
        lower_tick: number
        pool_key: PoolKey
        slippage_limit_lower: SqrtPrice
        slippage_limit_upper: SqrtPrice
        upper_tick: number
      }
    }
  | {
      swap: {
        amount: TokenAmount
        by_amount_in: boolean
        pool_key: PoolKey
        sqrt_price_limit: SqrtPrice
        x_to_y: boolean
      }
    }
  | {
      swap_route: {
        amount_in: TokenAmount
        expected_amount_out: TokenAmount
        slippage: Percentage
        swaps: SwapHop[]
      }
    }
  | {
      quote_route: {
        amount_in: TokenAmount
        swaps: SwapHop[]
      }
    }
  | {
      transfer_position: {
        index: number
        receiver: string
      }
    }
  | {
      claim_fee: {
        index: number
      }
    }
  | {
      remove_position: {
        index: number
      }
    }
  | {
      create_pool: {
        fee_tier: FeeTier
        init_sqrt_price: SqrtPrice
        init_tick: number
        token_0: Addr
        token_1: Addr
      }
    }
  | {
      add_fee_tier: {
        fee_tier: FeeTier
      }
    }
  | {
      remove_fee_tier: {
        fee_tier: FeeTier
      }
    }
export type Addr = string
export type Liquidity = string
export type SqrtPrice = string
export type TokenAmount = string
export interface PoolKey {
  fee_tier: FeeTier
  token_x: Addr
  token_y: Addr
}
export interface FeeTier {
  fee: Percentage
  tick_spacing: number
}
export interface SwapHop {
  pool_key: PoolKey
  x_to_y: boolean
}
export type QueryMsg =
  | {
      protocol_fee: {}
    }
  | {
      position: {
        index: number
        owner_id: Addr
      }
    }
  | {
      positions: {
        limit?: number | null
        offset?: number | null
        owner_id: Addr
      }
    }
  | {
      fee_tier_exist: {
        fee_tier: FeeTier
      }
    }
  | {
      pool: {
        fee_tier: FeeTier
        token_0: Addr
        token_1: Addr
      }
    }
  | {
      pools: {
        limit?: number | null
        start_after?: PoolKey | null
      }
    }
  | {
      tick: {
        index: number
        key: PoolKey
      }
    }
  | {
      is_tick_initialized: {
        index: number
        key: PoolKey
      }
    }
  | {
      fee_tiers: {}
    }
  | {
      position_ticks: {
        offset: number
        owner: Addr
      }
    }
  | {
      user_position_amount: {
        owner: Addr
      }
    }
  | {
      tick_map: {
        lower_tick_index: number
        pool_key: PoolKey
        upper_tick_index: number
        x_to_y: boolean
      }
    }
  | {
      liquidity_ticks: {
        pool_key: PoolKey
        tick_indexes: number[]
      }
    }
  | {
      liquidity_ticks_amount: {
        lower_tick: number
        pool_key: PoolKey
        upper_tick: number
      }
    }
  | {
      pools_for_pair: {
        token0: Addr
        token1: Addr
      }
    }
  | {
      quote: {
        amount: TokenAmount
        by_amount_in: boolean
        pool_key: PoolKey
        sqrt_price_limit: SqrtPrice
        x_to_y: boolean
      }
    }
export interface MigrateMsg {}
export type Boolean = boolean
export type ArrayOfFeeTier = FeeTier[]
export type ArrayOfLiquidityTick = LiquidityTick[]
export interface LiquidityTick {
  index: number
  liquidity_change: Liquidity
  sign: boolean
}
export type Uint32 = number
export type FeeGrowth = string
export interface Pool {
  current_tick_index: number
  fee_growth_global_x: FeeGrowth
  fee_growth_global_y: FeeGrowth
  fee_protocol_token_x: TokenAmount
  fee_protocol_token_y: TokenAmount
  fee_receiver: Addr
  last_timestamp: number
  liquidity: Liquidity
  sqrt_price: SqrtPrice
  start_timestamp: number
}
export type ArrayOfPoolWithPoolKey = PoolWithPoolKey[]
export interface PoolWithPoolKey {
  pool: Pool
  pool_key: PoolKey
}

export type ArrayOfPool = Pool[]
export interface Position {
  fee_growth_inside_x: FeeGrowth
  fee_growth_inside_y: FeeGrowth
  last_block_number: number
  liquidity: Liquidity
  lower_tick_index: number
  pool_key: PoolKey
  tokens_owed_x: TokenAmount
  tokens_owed_y: TokenAmount
  upper_tick_index: number
}
export type ArrayOfPositionTick = PositionTick[]
export interface PositionTick {
  fee_growth_outside_x: FeeGrowth
  fee_growth_outside_y: FeeGrowth
  index: number
  seconds_outside: number
}
export type ArrayOfPosition = Position[]
export interface QuoteResult {
  amount_in: TokenAmount
  amount_out: TokenAmount
  target_sqrt_price: SqrtPrice
  ticks: Tick[]
}
export interface Tick {
  fee_growth_outside_x: FeeGrowth
  fee_growth_outside_y: FeeGrowth
  index: number
  liquidity_change: Liquidity
  liquidity_gross: Liquidity
  seconds_outside: number
  sign: boolean
  sqrt_price: SqrtPrice
}
export type ArrayOfTupleOfUint16AndUint64 = [number, number][]
