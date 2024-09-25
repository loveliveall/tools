import { MULTIPLIER } from "./simulator.const";
import { getItemId } from "./simulator.service";
import { MessageFromWorker, MessageToWorker } from "./simulator.type";

const updateCurrentTrialMsg = (
  itemGroupIndex: number,
  itemEntityIndex: number,
  pickCount: number
): MessageFromWorker => {
  return {
    type: "update-current-trial",
    detail: {
      itemGroupIndex,
      itemEntityIndex,
      pickCount,
    },
  };
};
const endCurrentTrialMsg = (): MessageFromWorker => {
  return { type: "end-current-trial" };
};
const doneMsg = (): MessageFromWorker => {
  return { type: "done" };
};

let abortRequested = false;

function main(
  simulationCount: number,
  itemGroupList: { normalizedProb: number; quantity: number }[]
) {
  const totalProbSpace = 100 * MULTIPLIER;
  // Lower bound is inclusive, upper bound is exclusive.
  const itemProbSpace = itemGroupList.reduce((acc, itemGroup, groupIdx) => {
    const lastUpperBound = acc.at(-1)?.upperBound ?? 0;
    return [
      ...acc,
      ...Array.from({ length: itemGroup.quantity }, (_, entityIdx) => {
        return {
          itemGroupIndex: groupIdx,
          itemEntityIndex: entityIdx,
          lowerBound: lastUpperBound + itemGroup.normalizedProb * entityIdx,
          upperBound:
            lastUpperBound + itemGroup.normalizedProb * (entityIdx + 1),
        };
      }),
    ];
  }, [] as { itemGroupIndex: number; itemEntityIndex: number; lowerBound: number; upperBound: number }[]);

  function singleSimulation(trialCount: number) {
    if (trialCount > simulationCount) {
      // Desired simulation count reached. Terminate the simulation.
      postMessage(doneMsg());
      return;
    }

    function singlePick(pickCount: number, completed: Set<string>) {
      if (completed.size >= itemProbSpace.length) {
        postMessage(endCurrentTrialMsg());
        // Target item all completed. Execute next loop.
        setTimeout(() => singleSimulation(trialCount + 1), 0);
        return;
      }

      if (abortRequested) {
        // Abort signal received. Stop picking and send done message.
        abortRequested = false;
        postMessage(doneMsg());
        return;
      }

      const pick = Math.random() * totalProbSpace;
      const pickedItem = itemProbSpace.find(
        (item) => item.lowerBound <= pick && pick < item.upperBound
      );
      if (
        pickedItem !== undefined &&
        !completed.has(
          getItemId(pickedItem.itemGroupIndex, pickedItem.itemEntityIndex)
        )
      ) {
        // A new item picked! Add it to the completed set.
        completed.add(
          getItemId(pickedItem.itemGroupIndex, pickedItem.itemEntityIndex)
        );
        postMessage(
          updateCurrentTrialMsg(
            pickedItem.itemGroupIndex,
            pickedItem.itemEntityIndex,
            pickCount
          )
        );
      }
      // Execute next pick
      setTimeout(() => singlePick(pickCount + 1, completed), 0);
    }

    singlePick(1, new Set());
  }
  // Start the first loop
  singleSimulation(1);
}

addEventListener("message", ({ data }: MessageEvent<MessageToWorker>) => {
  if (data.type === "start-simulation") {
    main(data.simulationCount, data.itemGroupList);
  } else if (data.type === "abort-simulation") {
    abortRequested = true;
  }
});
