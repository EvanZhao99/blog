namespace  a{
    enum EventType {
        test
    }
    function fn (event: EventType): void {
        console.log(EventType[event])
    }
    fn(EventType.test)
}