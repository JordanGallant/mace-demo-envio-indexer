/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  IDexRouter,
  IDexRouter_SwapCompleted,
} from "generated";

IDexRouter.SwapCompleted.handler(async ({ event, context }) => {

  let {inputToken, amountIn, outputToken, amountOut} = event.params;

  const entity: IDexRouter_SwapCompleted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    inputToken: event.params.inputToken,
    amountIn: event.params.amountIn,
    outputToken: event.params.outputToken,
    amountOutMin: event.params.amountOutMin,
    amountOut: event.params.amountOut,
  };
  let tokenIn = await context.Token.get(inputToken);
  if (tokenIn) {
    tokenIn = {
      ...tokenIn,
      tradeInAmount: tokenIn.tradeInAmount + amountIn,
      totalAmount: tokenIn.totalAmount + amountIn,
    };
  } else {
    tokenIn = {
      id: inputToken,
      tradeInAmount: amountIn,
      tradeOutAmount: BigInt(0),
      totalAmount: amountIn,
    };
  }

  let tokenOut = await context.Token.get(outputToken);
  if (tokenOut) {
    tokenOut = {
      ...tokenOut,
      tradeOutAmount: tokenOut.tradeOutAmount + amountOut,
      totalAmount: tokenOut.totalAmount + amountOut,
    };
  } else {
    tokenOut = {
      id: outputToken,
      tradeInAmount: BigInt(0),
      tradeOutAmount: amountOut,
      totalAmount: amountOut,
    };
  }

    context.Token.set(tokenIn);
    context.Token.set(tokenOut);


  context.IDexRouter_SwapCompleted.set(entity);
});

//Swaps