---
layout: post
title: React学习 之 Dangerously Set innerHTML
description: Dangerously Set innerHTML
categories: ["技术"]
tags: [React]
date: 2016-03-02
---

在学习React的过程中看到 `dangerouslySetInnerHTML` 这样奇怪的prop命名。

React特意设计这样的，以此提醒开发者，它的prop值应该是净化后的安全数据。

官网给出的原因是：

> 不合时宜的使用 innerHTML 可能会导致 cross-site scripting (XSS) 攻击。 
> 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是导致网页攻击 的原因之一。

在彻底的理解安全问题后果并正确地净化数据之后，生成只包含唯一 key `__html` 的对象，并且对象的值是净化后的数据。

使用dangerouslySetInnerHTML：

	function createMarkup() { return {__html: 'First &middot; Second'}; };
	<div dangerouslySetInnerHTML={createMarkup()} />

这么做的意义在于，当你不是有意地使用 `<div dangerouslySetInnerHTML={getUsername()} />`时候，它并不会被渲染，因为 `getUsername()` 返回的格式是 字符串 而不是一个 `{__html: ''}` 对象。

`{__html:...}` 背后的目的是表明它会被当成 `"type/taint"` 类型处理。 这种包裹对象，可以通过方法调用返回净化后的数据，随后这种标记过的数据可以被传递给 dangerouslySetInnerHTML。 基于这种原因，我们不推荐写这种形式的代码：`<div dangerouslySetInnerHTML={{__html: getMarkup()}} />`.

这个功能主要被用来与 DOM 字符串操作类库一起使用，所以提供的 HTML 必须要格式清晰（例如：传递 XML 校验 ）