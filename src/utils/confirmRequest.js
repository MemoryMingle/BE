const EventEmitter = require('events');

class ConfirmRequest extends EventEmitter {
    constructor() {
        super();
        this.currentRequests = 0;
    }

    increment() {
        this.currentRequests++;
        this.emit('requestIncremented');
    }

    decrement() {
        this.currentRequests--;
        if (this.currentRequests === 0) {
            this.emit('requestCompleted');
        }
    }

    getCurrentRequests() {
        return this.currentRequests;
    }
}

module.exports = ConfirmRequest;