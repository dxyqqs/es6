//剔除不需要编译的文件
var ignore = fis.get('project.ignore');

[].push.apply(ignore,["dist/**","node_modules/**",".gitignore","LICENSE","package.json","README.md","npm.debug.log"])

fis.set('project.ignore',ignore);

//设定文件发布时路径

fis.hook('commonjs');

fis.match("/comp/**",{
    release:false
})

fis.match("/comp/(**.map)",{
    release:"/component/$1"
})

fis.match("/comp/(**.{js,jsx,es6})",{
    isMod:true,
    parser:fis.plugin('babel-5.x',{
        sourceMap:true
    }),
    rExt:'js',
    release:"/component/$1"
})

fis.match("::package",{
    postpackager:fis.plugin('loader',{
        resourceType:'commonjs',
        useInlineMap:true
    })
})