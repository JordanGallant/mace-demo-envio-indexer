/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  IDexRouter,
  IDexRouter_SwapCompleted,
} from "generated";

IDexRouter.SwapCompleted.handler(async ({ event, context }) => {
  const entity: IDexRouter_SwapCompleted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    inputToken: event.params.inputToken,
    amountIn: event.params.amountIn,
    outputToken: event.params.outputToken,
    amountOutMin: event.params.amountOutMin,
    amountOut: event.params.amountOut,
  };

  context.IDexRouter_SwapCompleted.set(entity);
});

//Swaps