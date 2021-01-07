# gitignore
通过`.gitignore`避免文件将一些文件纳入`git`的管理

## rule
可以使用标准的`glob`模式匹配，就是`shell`所使用的简化的正则表达式。
```
# 以‘#’开头的会被忽略，可以用来当做注释
# react

# 以‘/’开头可以防止递归，只匹配当前目录,不会匹配'vue/node_modules'
/node_modules

# 所有以`.a`结尾的文件
*.a

# 忽略‘build/’下的所有的文件, 包括‘doc/build/’
build/

# 忽略‘doc/note.txt’, 但不会忽略‘doc/server/note.txt’
doc/*.txt

# 忽略‘doc/’下所有的‘.pdf’
doc/**/*.pdf


```