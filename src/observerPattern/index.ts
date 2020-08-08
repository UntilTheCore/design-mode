type classifyType = 'student' | 'teacher';
type fnType = (score: number) => void;
class Person {
    private readonly name!: string;
    private readonly classify: classifyType;
    private list: Array<fnType>;
    
    constructor(name: string, classify: classifyType) {
        this.name = name;
        this.classify = classify;
        this.list = [];
    }
    
    // 每个人发布消息时只需维护自己“被订阅”列表。
    publish(score: number) {
        console.log(this.classify + this.name + '发布了信息');
        console.log(this.classify + this.name + '有' + this.list.length + '人订阅他的消息!');
        this.list.forEach(function (item) {
            item(score);
        });
    }
    
    subscribe(target: Person, fn: fnType) {
        console.log(`${ this.classify }:${ this.name }订阅了${ target.classify }:${ target.name }的消息。`);
        target.list.push(fn);
    }
}

const p1 = new Person('李', 'teacher');
const p2 = new Person('张', 'student');
const p3 = new Person('王','student');
const p4 = new Person('古','student');

p2.subscribe(p1,(score) => {
    if(score > 60) {
        console.log('我是学生张，我对60分以上的内容敢兴趣!');
    }
})

p3.subscribe(p1,(score: number) => {
    if(score > 70) {
        console.log('我是学生王，我对70分以上的内容敢兴趣!');
    }
});

p4.subscribe( p1,(score: number) => {
    if(score > 80) {
        console.log('我是学生古，我对80分以上的内容敢兴趣!');
    }
})
p1.publish(62);
