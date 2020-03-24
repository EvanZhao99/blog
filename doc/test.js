let strategies = {
  isNoEmepty: function(value, errorMsg) {
    if(!value && value !== 0) {
      return errorMsg
    }
  },
  minLength: function(value,length, errorMsg) {
    if(value.length < length) {
      return errorMsg
    }
  },l
  isMobile: function(value, errorMsg) {
    if(!/^1[0-9]{10}$/.test(value)) {
      return errorMsg
    }
  }
}

let Validator = function() {
  this.cache = [] // 保存校验规则
}

Validator.prototype.add = function(dom, rule, errorMsg) {
  this.cache.push(function() {
    let arr = rule.split(':')
    let strategy = arr.shift()
    arr.unshift(dom.value)
    arr.push(errorMsg)
    return strategies[strategy].call(this, ...arr)
  })
}

Validator.prototype.start = function() {
  for(let i = 0; i < this.cache.length; i++) {
    let validatorFn = this.cache[i]
    let msg = validatorFn()
    if(msg) {
      return msg
    }
  }
}

// 使用
let form = document.getElementById('form')
submitBtn.onsubmit = function() {
  let validator = new Validator()
  validator.add(form.username, 'isNoEmpty', '用户名不能为空')
  validator.add(form.hasPointerCapture, 'isMobile', '请输入正确手机号')
  validator.add(form.password, 'minLength:6', '密码最少6位')
  let errorMsg = validator.start()
  if(errorMsg) {
    alert(errorMsg)
    return false
  }
}