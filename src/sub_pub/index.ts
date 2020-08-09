type classifyType = 'student' | 'teacher';
type fnType = (score: number) => void;
type topicType = { [key: string]: Array<fnType> }
const dispatchCenter = {
    // 使用 hash table 的方式存储不同的主题内容
    topics: {} as topicType,
    subscribe(topic: string, fn: fnType) {
        if ( !this.topics[topic] ) {
            this.topics[topic] = [];
        }
        this.topics[topic].push(fn);
    },
    publish(topic: string, score: number): boolean {
        if ( !this.topics[topic] ) {
            return false;
        }
        for (let fn of this.topics[topic]) {
            fn(score);
        }
        return true;
    }
};

class Person {
    private readonly name!: string;
    private readonly classify: classifyType;
    
    constructor(name: string, classify: classifyType) {
        this.name = name;
        this.classify = classify;
    }
    
    publish(topic: string, score: number) {
        console.log(this.classify + this.name + `发布了${ topic }成绩的信息`);
        if ( !dispatchCenter.topics[topic] ) {
            console.log('这个消息无人订阅!');
        } else {
            console.log(`当前有${ dispatchCenter.topics[topic].length }人关注了${ topic }成绩的信息！`);
        }
        
        dispatchCenter.publish(topic, score);
    }
    
    subscribe(topic: string, fn: fnType) {
        console.log(`${ this.classify }:${ this.name }订阅了${ topic }成绩的消息。`);
        dispatchCenter.subscribe(topic, fn);
    }
}

const p1 = new Person('李', 'teacher');
const p2 = new Person('张', 'student');
const p3 = new Person('王', 'student');
const p4 = new Person('古', 'student');

p2.subscribe('数学', (score) => {
    if ( score >= 60 ) {
        console.log('我是学生张，我关注60分以上的数学成绩!');
    }
});

p3.subscribe('语文', (score: number) => {
    if ( score >= 70 ) {
        console.log('我是学生王，我关注70分以上的语文成绩!');
    }
});

p4.subscribe('数学', (score: number) => {
    if ( score >= 80 ) {
        console.log('我是学生古，我关注80分以上的数学成绩!');
    }
});

p1.publish('数学', 66);
