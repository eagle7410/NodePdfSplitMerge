const ENV         = require('./lib/ENV');
const ActionSplit = require('./lib/SplitAction')
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
                split = new ActionSplit(env)
                await split.doit()
                break;
            case ACTIONS.MERGE:
                // TODO
                break;
        }

        console.log('Happy end ;) !!!')

    } catch (e) {
        console.error(e)
    }
})()