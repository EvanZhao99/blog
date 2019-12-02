# html
## 一、link
### 1. 预加载 preload
当link的rel属性被设为preload时，在页面加载完成之后立即加载该资源。会将link塞入一个预加载器，这个预加载器可以加载任意类型的资源
### 2 属性
- rel: preload
- href: 地址
- as:type,

### 3 实例
```html
<link rel="preload" href="xxx/style.css" as="style"></link>
<link rel="preload" href="xxx/main.js" as="scripe"></link>

```
### 4 优先级
加载的属性与as属性的值对应的标签同一个优先级，不设定as属性是，与异步类似