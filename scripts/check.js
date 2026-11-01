hexo.extend.filter.register('markdown-it:renderer', function(md) {
    // 强制输出所有已注册的插件名称
    console.log('=== Markdown-it 已注册插件 ===');
    console.log(md.options.plugins); 
    // 或者直接检查 footnote 插件是否存在
    if (md.renderer.rules.footnote_ref) {
      console.log('✅ footnote 插件已成功加载！');
    } else {
      console.log('❌ footnote 插件未加载！');
    }
  });