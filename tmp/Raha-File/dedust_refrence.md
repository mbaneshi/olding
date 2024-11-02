
# TL-B schemes

### Message "create_vault"

```cpp

 create_vault#21cfe02b query_id:uint64 asset:Asset = InMsgBody;

```
### Message "create_volatile_pool"

```cpp
 create_volatile_pool#97d51f2f query_id:uint64 asset0:Asset asset1:Asset = InMsgBody;

```

asset0 : The asset for which a Pool will be created. required
asset1 : The asset for which a Poo will be created. required

Assets can be reordered.

Assets can be switched (asset0 becomes asset1 and vice versa).

This ensures a consistent address for a Pool regardless of asset order (e.g. A / B or B / A).

## Common Types

### Asset 

```cpp
 native$0000 = Asset;
 jetton$0001 workchain_id:int8 address:uint256 = Asset;
 extra_currency$0010 currency_id:int32 = Asset;
```
### Timestamp

```cpp
timestamp#_ _:uint32 = Timestamp;
```

### SwapKind

```cpp
given_in$0 = SwapKind;
given_out$1 = SwapKind; // Not implemented.
```

### SwapParams

Set of parameters relevant for the entire swap.

```cpp
 swap_params#_ deadline:Timestamp recipient_addr:MsgAddressInt referral_addr:MsgAddress
              fulfill_payload:(Maybe ^Cell) reject_payload:(Maybe ^Cell) = SwapParams;
```
deadline : Specifies a deadline for the swap. If the swap reaches the Pool after this time, it will be rejected. Default: 0 (disabled).

fulfill_payload : recipient_addr : Specifies an address where funds will be sent after the swap. Default: sender's address.

reject_payload : Custom payload that will be attached to the fund transfer upon a rejected swap.



### SwapStep 

Set of parameters relevant for the specific step.

```cpp
 step#_ pool_addr:MsgAddressInt params:SwapStepParams = SwapStep;

```

### SwapStepParams

Set of extra parameters relevant for a specific step.

```cpp
 step_params#_ kind:SwapKind limit:Coins next:(Maybe ^SwapStep) = SwapStepParams;
```
limit : Minimum output of the swap. If the actual value is less than specified, the swap will be rejected.

next : Reference to the next step. Can be used for multi-hop swaps.

### PoolType

```cpp
volatile$0 = PoolType;
stable$1 = PoolType;
```
### PoolParams

```cpp
 pool_params#_ pool_type:PoolType asset0:Asset asset1:Asset = PoolParams;
```

## Native Vault  

###  Message "swap"

```cpp
 swap#ea06185d query_id:uint64 amount:Coins _:SwapStep swap_params:^SwapParams = InMsgBody;
```

amount : TON amount for the swap



 ### Message "deposit_liquidity"

```cpp
 deposit_liquidity#d55e4686 query_id:uint64 amount:Coins pool_params:PoolParams
                           min_lp_amount:Coins
                           asset0_target_balance:Coins asset1_target_balance:Coins
                           fulfill_payload:(Maybe ^Cell)
                           reject_payload:(Maybe ^Cell) = InMsgBody;
```


 ### Message "payout"

```cpp
 payout#474f86cf query_id:uint64 payload:(Maybe ^Cell) = InMsgBody;
```
 ## Jetton Vault

 ### Message "swap"
```cpp
 swap#e3a0d482 _:SwapStep swap_params:^SwapParams = ForwardPayload;
```

 ### Message "deposit_liquidity"

```cpp
 deposit_liquidity#40e108d6 pool_params:PoolParams min_lp_amount:Coins
                           asset0_target_balance:Coins asset1_target_balance:Coins
                           fulfill_payload:(Maybe ^Cell)
                           reject_payload:(Maybe ^Cell) = ForwardPayload;
```

## Pool Events
To simplify the process of indexing, DeDust Procotol uses mechanism of events.
For that purpose we use "external messages" proposed by TON Blockchain.

### Event "swap"

```cpp
 swap#9c610de3 asset_in:Asset asset_out:Asset amount_in:Coins amount_out:Coins
              ^[ sender_addr:MsgAddressInt referral_addr:MsgAddress
              reserve0:Coins reserve1:Coins ] = ExtOutMsgBody;
```

The asset provided by the user.
The asset received by the user.
Amount of asset_out received by the user.
Amount of asset_in supplied by the user.
Address of the contract that initiated the swap.
Referral address. Required for the Referral Program.
Amount of asset0 remaining in reserve after the swap.
Amount of asset1 remaining in reserve after the swap.


 ### Event "deposit"

```cpp
 deposit#b544f4a4 sender_addr:MsgAddressInt amount0:Coins amount1:Coins
                 reserve0:Coins reserve1:Coins liquidity:Coins = ExtOutMsgBody;
```

### Event "withdrawal"

```cpp
 withdrawal#3aa870a6 sender_addr:MsgAddressInt liquidity:Coins
                    amount0:Coins amount1:Coins
                    reserve0:Coins reserve1:Coins = ExtOutMsgBody;
```

Amount of LP tokens burned by the sender.

## Liquidity Deposit

### Message "cancel_deposit"
```cpp
 cancel_deposit#166cedee query_id:uint64 payload:(Maybe ^Cell) = InMsgBody;
```
Custom payload that will be attached to the funds transfer to the user.
