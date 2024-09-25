export type MessageToWorker =
  | {
      type: "start-simulation";
      simulationCount: number;
      itemGroupList: { normalizedProb: number; quantity: number }[];
    }
  | {
      type: "abort-simulation";
    };

export type MessageFromWorker =
  | {
      type: "update-current-trial";
      detail: {
        itemGroupIndex: number;
        itemEntityIndex: number;
        pickCount: number;
      };
    }
  | {
      type: "end-current-trial";
    }
  | {
      type: "done";
    };
