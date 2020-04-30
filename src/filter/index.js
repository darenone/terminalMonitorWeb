import { toFixed2, handleEmpty } from './../lib/util.js'

const filters = {
    numFilter (value) {
        return toFixed2(value)
    },
    emptyFilter (value) {
        return handleEmpty(value)
    }
}

export default filters