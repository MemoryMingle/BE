const { EventEmitter } = require('events');
const { Mutex } = require('async-mutex');

class ConfirmRequest extends EventEmitter {
    constructor() {
        super();
        this.currentRequests = 0;
        this.mutex = new Mutex();  // 뮤텍스 인스턴스 생성
    }

    async increment() {
        const release = await this.mutex.acquire(); // 뮤텍스 획득

        try {
            this.currentRequests++;
            this.emit('requestIncremented');
        } finally {
            release();  // 뮤텍스 반환
        }
    }

    async decrement() {
        const release = await this.mutex.acquire(); // 뮤텍스 획득

        try {
            this.currentRequests--;
            if (this.currentRequests === 0) {
                this.emit('requestCompleted');
            }
        } finally {
            release();  // 뮤텍스 반환
        }
    }

    getCurrentRequests() {
        return this.currentRequests;  // 이 메서드는 동기적이므로 뮤텍스가 필요하지 않습니다.
    }
}

const confirmRequestInstance = new ConfirmRequest();
module.exports = confirmRequestInstance;