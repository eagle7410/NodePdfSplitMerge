const ENV         = require('./lib/ENV');
const ActionSplit = require('./lib/SplitAction')
const ActionMerge = require('./lib/MergeAction')
const {ACTIONS}   = require('./lib/constant');

(async () => {
    try {
        console.log('Run ...')

        const env = new ENV;
        env.init()
        env.WorkDir = __dirname

        console.log('--- DOIT ', env.params.Action);

        switch(env.params.Action) {
            case ACTIONS.SPLIT:
                const split = new ActionSplit(env)
                await split.doit()
                break;
            case ACTIONS.MERGE:
                const merge = new ActionMerge(env)
                await merge.doit()
                break;
        }

        console.log('Happy end ;) !!!')

    } catch (e) {
        console.error(e)
    }
})()