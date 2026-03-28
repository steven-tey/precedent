# 测试报告

## 测试环境
- **测试框架**: Vitest
- **测试环境**: jsdom
- **测试日期**: 2026-03-28
- **测试结果**: 15/15 测试通过

## 测试用例详情

| 模块 | 测试名称 | 输入 | 预期结果 |
|------|---------|------|---------|
| **lib/utils.ts** | | | |
| cn 函数 | 合并类名 | 'foo', 'bar' | 'foo bar' |
| cn 函数 | 条件类名 | 'foo', { bar: true } | 'foo bar' |
| cn 函数 | 条件类名（false） | 'foo', { bar: false } | 'foo' |
| cn 函数 | 重复类名 | 'foo', 'bar', 'foo' | 'foo bar foo' |
| timeAgo 函数 | 无效时间戳 | null | 'never' |
| timeAgo 函数 | 1分钟前 | 60秒前的时间 | 包含 '1m' |
| timeAgo 函数 | 仅时间 | 60秒前的时间, true | '1m' |
| fetcher 函数 | 成功请求 | /api/test | 返回 { message: 'success' } |
| fetcher 函数 | 失败请求（带错误信息） | /api/test（返回 404） | 抛出 'Not found' 错误 |
| fetcher 函数 | 失败请求（无错误信息） | /api/test（返回 500） | 抛出 'An unexpected error occurred' 错误 |
| nFormatter 函数 | 0 | 0 | '0' |
| nFormatter 函数 | 123 | 123 | '123' |
| nFormatter 函数 | 1000 | 1000 | '1K' |
| nFormatter 函数 | 1234 | 1234 | '1.2K' |
| nFormatter 函数 | 1234567 | 1234567 | '1.2M' |
| nFormatter 函数 | 1234567890 | 1234567890 | '1.2G' |
| nFormatter 函数 | 自定义小数位 | 1234, 2 | '1.23K' |
| capitalize 函数 | 正常字符串 | 'hello' | 'Hello' |
| capitalize 函数 | 空字符串 | '' | '' |
| capitalize 函数 | null | null | null |
| capitalize 函数 | 非字符串 | 123 | 123 |
| truncate 函数 | 需要截断 | 'hello world', 5 | 'hello...' |
| truncate 函数 | 无需截断 | 'hello', 10 | 'hello' |
| truncate 函数 | 空字符串 | '', 5 | '' |
| **components/layout/navbar.tsx** | | | |
| Navbar 组件 | 渲染 Logo 和标题 | - | 显示 'Precedent' 文本 |
| Navbar 组件 | 渲染登录按钮（未登录状态） | - | 显示 sign-in-button 元素 |
| Navbar 组件 | 渲染用户按钮（已登录状态） | - | 显示 user-button 元素 |
| **components/layout/footer.tsx** | | | |
| Footer 组件 | 渲染作者信息 | - | 显示 'A project by' 和 'Steven Tey' |
| Footer 组件 | 渲染 Buy Me a Coffee 链接 | - | 显示 'Buy me a coffee' 文本 |

## 测试覆盖率
使用 `npm run test:coverage` 可以查看详细的测试覆盖率报告。