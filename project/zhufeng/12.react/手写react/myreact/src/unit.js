 class Unit {
     constructor(element) {
         this._currentElement = element
     }
     getMarkUp() {
         throw Error('此方法不能被调用')
     }
 }

 class TextUnit extends Unit {
    getMarkUp(reactid) {
        this._reactid = reactid
        return `<span data-reactId="${reactid}">${this._currentElement}</span>`
    }
 }
 function createUnit(element) {
     if(typeof element === 'string' || typeof element === 'number') {
         return new TextUnit(element)
     }
 }

 export {
     createUnit
 }