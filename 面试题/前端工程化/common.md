- [1. npm、pnpm、yarn等等这些包管理器特性对比？](#1-npmpnpmyarn等等这些包管理器特性对比)
- [2. 什么是幽灵依赖问题？Pnpm是如何解决这个问题的？](#2-什么是幽灵依赖问题pnpm是如何解决这个问题的)
- [3. 软链接(符号链接)、硬链接分别是什么？](#3-软链接符号链接硬链接分别是什么)
- [4. 什么是`Monorepo`架构，有哪些实现方案？相对于`Mutilrepo`有哪些优点和缺点？](#4-什么是monorepo架构有哪些实现方案相对于mutilrepo有哪些优点和缺点)
- [5. Babel转译原理(AST操作)？](#5-babel转译原理ast操作)

## 1. npm、pnpm、yarn等等这些包管理器特性对比？
博客：[现代包管理工具总结](https://blog.oceanh.top/posts/frontend/%E7%8E%B0%E4%BB%A3%E5%8C%85%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7/)

![现代包管理器](https://fastly.jsdelivr.net/gh/Ocean-H1/blog_image_bed/%E7%8E%B0%E4%BB%A3%E5%8C%85%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7.png)

## 2. 什么是幽灵依赖问题？Pnpm是如何解决这个问题的？

## 3. 软链接(符号链接)、硬链接分别是什么？

| **特性**         | **硬链接**                   | **符号链接（软链接）**         |
| ---------------- | ---------------------------- | ------------------------------ |
| **存储方式**     | 共享同一 inode               | 独立文件，存储目标路径         |
| **磁盘占用**     | 不额外占用空间（仅目录条目） | 少量空间（路径信息）           |
| **跨文件系统**   | ❌ 不支持                     | ✅ 支持                         |
| **指向目录**     | ❌ 多数系统禁止               | ✅ 支持                         |
| **目标删除后**   | 仍可访问（数据未删）         | 链接失效（悬空链接）           |
| **修改影响**     | 所有硬链接同步更新           | 仅修改符号链接本身（路径指向） |
| **系统权限**     | 继承目标权限                 | 自身有独立权限（但通常忽略）   |
| **典型应用场景** | 文件备份、节省空间           | 路径重定向、依赖管理           |

## 4. 什么是`Monorepo`架构，有哪些实现方案？相对于`Mutilrepo`有哪些优点和缺点？

## 5. Babel转译原理(AST操作)？