export interface BaseAction {
    type: string;
}

export interface VoidAction extends BaseAction {
    type: 'This is not used';
}

/**
 * Return type for actions
 * For handlers that dispatch single action, use as ActionHandler<LoadAction>
 * 
 * For handlers that dispatch multiple actions, use as ActionHandler<LoadAction1|LoadAction2>
 */
export type ActionHandler<T extends BaseAction> = (dispatch: (action: T) => void) => Promise<any>;